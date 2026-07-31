import { useUser } from "@clerk/clerk-react";
import { ArrowRightIcon, SparklesIcon, ZapIcon } from "lucide-react";

function WelcomeSection({ onCreateSession }) {
  const { user } = useUser();

  return (
    <div className="relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="size-10 sm:w-12 sm:h-12 shrink-0 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <SparklesIcon className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black break-words bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Welcome back, {user?.firstName || "there"}!
              </h1>
            </div>
            <p className="text-base sm:text-xl text-base-content/60 sm:ml-16">
              Ready to level up your coding skills?
            </p>
          </div>
          <button
            onClick={onCreateSession}
            className="group w-full sm:w-auto px-5 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-secondary rounded-2xl transition-all duration-200 hover:opacity-90"
          >
            <div className="flex items-center justify-center gap-3 text-white font-bold sm:text-lg">
              <ZapIcon className="w-6 h-6" />
              <span>Create Session</span>
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeSection;
