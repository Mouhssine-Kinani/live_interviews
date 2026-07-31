import { useUser } from "@clerk/clerk-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useEndSession, useJoinSession, useSessionById } from "../hooks/useSessions";
import { LANGUAGE_CONFIG, PROBLEMS } from "../data/problems";
import { executeCode } from "../lib/piston";
import Navbar from "../components/NavBar";
import { Group, Panel, Separator } from "react-resizable-panels";
import { getDifficultyBadgeClass } from "../lib/utils";
import { Loader2Icon, LogOutIcon, PhoneOffIcon } from "lucide-react";
import CodeEditorPanel from "../components/CodeEditorPanel";
import OutputPanel from "../components/OutputPanel";

import useStreamClient from "../hooks/useStreamClient";
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import VideoCallUI from "../components/VideoCallUI";

// Below this viewport width the split-pane layout collapses into a single
// resizable column: Question -> Call -> Code Editor -> Output.
const DESKTOP_BREAKPOINT = 1024;

// Bigger drag target for touch ("coarse") pointers so handles are easy to
// grab on phones/tablets, while staying thin/precise for mouse ("fine") input.
const RESIZE_HIT_AREA = { coarse: 24, fine: 8 };

function useIsDesktop(breakpoint = DESKTOP_BREAKPOINT) {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= breakpoint
  );

  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${breakpoint}px)`);
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [breakpoint]);

  return isDesktop;
}

// A single handle whose look/cursor adapts to the group it's resizing.
// Reusing one component (instead of swapping between two) means React never
// unmounts the editor/call when the layout flips between row and column.
function ResizeHandle({ orientation }) {
  const stacked = orientation === "vertical";
  return (
    <Separator
      className={`group shrink-0 bg-base-300 hover:bg-primary active:bg-primary transition-colors flex items-center justify-center ${
        stacked ? "h-2 w-full cursor-row-resize" : "w-2 h-full cursor-col-resize"
      }`}
    >
      <span
        className={`pointer-events-none rounded-full bg-base-content/20 group-hover:bg-primary-content/70 ${
          stacked ? "w-8 h-1" : "h-8 w-1"
        }`}
      />
    </Separator>
  );
}

function SessionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const { data: sessionData, isLoading: loadingSession, refetch } = useSessionById(id);

  const joinSessionMutation = useJoinSession();
  const endSessionMutation = useEndSession();

  const session = sessionData?.session;
  const isHost = session?.host?.clerkId === user?.id;
  const isParticipant = session?.participant?.clerkId === user?.id;

  const { call, channel, chatClient, isInitializingCall, streamClient } = useStreamClient(
    session,
    loadingSession,
    isHost,
    isParticipant
  );

  // find the problem data based on session problem title
  const problemData = session?.problem
    ? Object.values(PROBLEMS).find((p) => p.title === session.problem)
    : null;

  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const codeRef = useRef(code);
  const languageRef = useRef(selectedLanguage);
  const skipStarterCodeRef = useRef(false);
  const syncTimeoutRef = useRef(null);

  const updateEditor = useCallback((nextCode, nextLanguage = languageRef.current) => {
    codeRef.current = nextCode;
    languageRef.current = nextLanguage;
    setCode(nextCode);
    setSelectedLanguage(nextLanguage);
  }, []);

  const sendEditorUpdate = useCallback(
    (nextCode = codeRef.current, nextLanguage = languageRef.current, immediately = false) => {
      if (!channel) return;

      const send = () => {
        channel
          .sendEvent({
            type: "code_editor.update",
            editor: { code: nextCode, language: nextLanguage },
          })
          .catch((error) => console.error("Unable to sync code editor", error));
      };

      window.clearTimeout(syncTimeoutRef.current);
      if (immediately) {
        send();
      } else {
        // Batch keystrokes so the shared channel is not flooded with events.
        syncTimeoutRef.current = window.setTimeout(send, 150);
      }
    },
    [channel]
  );

  useEffect(() => {
    if (!channel) return;

    const updateSubscription = channel.on("code_editor.update", (event) => {
      // Stream also delivers the sender's event locally; it has already been applied.
      if (event.user?.id === user?.id) return;

      const { code: remoteCode, language: remoteLanguage } = event.editor || {};
      if (typeof remoteCode !== "string" || !LANGUAGE_CONFIG[remoteLanguage]) return;

      window.clearTimeout(syncTimeoutRef.current);
      // Do not replace a remote language switch with this problem's starter code.
      skipStarterCodeRef.current = remoteLanguage !== languageRef.current;
      updateEditor(remoteCode, remoteLanguage);
      setOutput(null);
    });

    const requestSubscription = channel.on("code_editor.sync_request", (event) => {
      if (event.user?.id === user?.id) return;
      sendEditorUpdate(codeRef.current, languageRef.current, true);
    });

    // A participant who joins after editing has started asks the other caller
    // for the current document, since custom events are not stored as messages.
    channel
      .sendEvent({ type: "code_editor.sync_request" })
      .catch((error) => console.error("Unable to request code editor state", error));

    return () => {
      updateSubscription.unsubscribe();
      requestSubscription.unsubscribe();
      window.clearTimeout(syncTimeoutRef.current);
    };
  }, [channel, sendEditorUpdate, updateEditor, user?.id]);

  useEffect(() => {
    if (skipStarterCodeRef.current) {
      skipStarterCodeRef.current = false;
      return;
    }

    if (problemData?.starterCode?.[selectedLanguage]) {
      codeRef.current = problemData.starterCode[selectedLanguage];
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCode(problemData.starterCode[selectedLanguage]);
    }
  }, [problemData, selectedLanguage]);

  // auto-join session if user is not already a participant and not the host
  useEffect(() => {
    if (!session || !user || loadingSession) return;
    if (isHost || isParticipant) return;

    joinSessionMutation.mutate(id, { onSuccess: refetch });

    // remove the joinSessionMutation, refetch from dependencies to avoid infinite loop
  }, [session, user, loadingSession, isHost, isParticipant, id]);

  // redirect the "participant" when session ends
  useEffect(() => {
    if (!session || loadingSession) return;

    if (session.status === "completed") navigate("/dashboard");
  }, [session, loadingSession, navigate]);

  const isDesktop = useIsDesktop();

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    // use problem-specific starter code
    const starterCode = problemData?.starterCode?.[newLang] || "";
    updateEditor(starterCode, newLang);
    sendEditorUpdate(starterCode, newLang, true);
    setOutput(null);
  };

  const handleCodeChange = (value) => {
    const nextCode = value ?? "";
    updateEditor(nextCode);
    sendEditorUpdate(nextCode);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);

    const result = await executeCode(selectedLanguage, code);
    setOutput(result);
    setIsRunning(false);
  };

  const handleEndSession = () => {
    if (confirm("Are you sure you want to end this session? All participants will be notified.")) {
      // this will navigate the HOST to dashboard
      endSessionMutation.mutate(id, { onSuccess: () => navigate("/dashboard") });
    }
  };

  // ---- Section content, shared between the desktop split view and the ----
  // ---- mobile stacked view so nothing has to be written out twice.    ----

  const questionContent = (
    <div className="h-full overflow-y-auto bg-base-200">
      {/* HEADER SECTION */}
      <div className="p-4 sm:p-6 bg-base-100 border-b border-base-300">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-0 mb-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-base-content">
              {session?.problem || "Loading..."}
            </h1>
            {problemData?.category && (
              <p className="text-base-content/60 mt-1">{problemData.category}</p>
            )}
            <p className="text-base-content/60 mt-2">
              Host: {session?.host?.name || "Loading..."} •{" "}
              {session?.participant ? 2 : 1}/2 participants
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`badge badge-lg ${getDifficultyBadgeClass(
                session?.difficulty
              )}`}
            >
              {session?.difficulty.slice(0, 1).toUpperCase() +
                session?.difficulty.slice(1) || "Easy"}
            </span>
            {isHost && session?.status === "active" && (
              <button
                onClick={handleEndSession}
                disabled={endSessionMutation.isPending}
                className="btn btn-error btn-sm gap-2"
              >
                {endSessionMutation.isPending ? (
                  <Loader2Icon className="w-4 h-4 animate-spin" />
                ) : (
                  <LogOutIcon className="w-4 h-4" />
                )}
                End Session
              </button>
            )}
            {session?.status === "completed" && (
              <span className="badge badge-ghost badge-lg">Completed</span>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {problemData?.description && (
          <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
            <h2 className="text-xl font-bold mb-4 text-base-content">Description</h2>
            <div className="space-y-3 text-base leading-relaxed">
              <p className="text-base-content/90">{problemData.description.text}</p>
              {problemData.description.notes?.map((note, idx) => (
                <p key={idx} className="text-base-content/90">
                  {note}
                </p>
              ))}
            </div>
          </div>
        )}

        {problemData?.examples && problemData.examples.length > 0 && (
          <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
            <h2 className="text-xl font-bold mb-4 text-base-content">Examples</h2>
            <div className="space-y-4">
              {problemData.examples.map((example, idx) => (
                <div key={idx}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="badge badge-sm">{idx + 1}</span>
                    <p className="font-semibold text-base-content">Example {idx + 1}</p>
                  </div>
                  <div className="bg-base-200 rounded-lg p-4 font-mono text-sm space-y-1.5 overflow-x-auto">
                    <div className="flex gap-2">
                      <span className="text-primary font-bold min-w-[70px] shrink-0">
                        Input:
                      </span>
                      <span className="break-words">{example.input}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-secondary font-bold min-w-[70px] shrink-0">
                        Output:
                      </span>
                      <span className="break-words">{example.output}</span>
                    </div>
                    {example.explanation && (
                      <div className="pt-2 border-t border-base-300 mt-2">
                        <span className="text-base-content/60 font-sans text-xs">
                          <span className="font-semibold">Explanation:</span>{" "}
                          {example.explanation}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {problemData?.constraints && problemData.constraints.length > 0 && (
          <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
            <h2 className="text-xl font-bold mb-4 text-base-content">Constraints</h2>
            <ul className="space-y-2 text-base-content/90">
              {problemData.constraints.map((constraint, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-primary">•</span>
                  <code className="text-sm break-words">{constraint}</code>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );

  const codeEditorContent = (
    <CodeEditorPanel
      selectedLanguage={selectedLanguage}
      code={code}
      isRunning={isRunning}
      onLanguageChange={handleLanguageChange}
      onCodeChange={handleCodeChange}
      onRunCode={handleRunCode}
    />
  );

  const outputContent = <OutputPanel output={output} />;

  const callContent = (
    <div className="h-full bg-base-200 p-2 sm:p-4 overflow-auto">
      {isInitializingCall ? (
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <Loader2Icon className="w-12 h-12 mx-auto animate-spin text-primary mb-4" />
            <p className="text-lg">Connecting to video call...</p>
          </div>
        </div>
      ) : !streamClient || !call ? (
        <div className="h-full flex items-center justify-center">
          <div className="card bg-base-100 shadow-xl max-w-md">
            <div className="card-body items-center text-center">
              <div className="w-24 h-24 bg-error/10 rounded-full flex items-center justify-center mb-4">
                <PhoneOffIcon className="w-12 h-12 text-error" />
              </div>
              <h2 className="card-title text-2xl">Connection Failed</h2>
              <p className="text-base-content/70">Unable to connect to the video call</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full">
          <StreamVideo client={streamClient}>
            <StreamCall call={call}>
              <VideoCallUI chatClient={chatClient} channel={channel} />
            </StreamCall>
          </StreamVideo>
        </div>
      )}
    </div>
  );

  return (
    <div className="h-dvh bg-base-100 flex flex-col">
      <Navbar />

      <div className="flex-1 min-h-0">
        {/*
          One Group tree for every screen size - only `orientation` changes.
          Desktop (row):    [ Question / Editor / Output ] | [ Call ]
          Mobile  (column): Question -> Editor -> Output -> Call, stacked
          Keeping the same tree shape means the code editor and the live
          call never get unmounted just because the window was resized.
        */}
        <Group
          orientation={isDesktop ? "horizontal" : "vertical"}
          className="h-full"
          resizeTargetMinimumSize={RESIZE_HIT_AREA}
        >
          {/* QUESTION + CODE + OUTPUT - left column on desktop, top block on mobile */}
          <Panel
            defaultSize={isDesktop ? "60" : "68"}
            minSize={isDesktop ? "35" : "25"}
          >
            <Group
              orientation="vertical"
              className="h-full"
              resizeTargetMinimumSize={RESIZE_HIT_AREA}
            >
              <Panel defaultSize="35" minSize="15">
                {questionContent}
              </Panel>

              <ResizeHandle orientation="vertical" />

              <Panel defaultSize="45" minSize="20">
                {codeEditorContent}
              </Panel>

              <ResizeHandle orientation="vertical" />

              <Panel defaultSize="20" minSize="10">
                {outputContent}
              </Panel>
            </Group>
          </Panel>

          <ResizeHandle orientation={isDesktop ? "horizontal" : "vertical"} />

          {/* VIDEO CALL - right column on desktop, bottom block on mobile */}
          <Panel
            defaultSize={isDesktop ? "40" : "32"}
            minSize={isDesktop ? "25" : "18"}
          >
            {callContent}
          </Panel>
        </Group>
      </div>
    </div>
  );
}

export default SessionPage;
