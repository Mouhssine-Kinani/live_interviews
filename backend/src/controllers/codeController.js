import vm from "vm";
import { execFile } from "child_process";
import { writeFileSync, mkdtempSync, rmSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";

const TIMEOUT_MS = 10000;
const MAX_BUFFER = 1 * 1024 * 1024;

function formatArg(arg) {
  if (typeof arg === "string") return arg;
  if (arg === null) return "null";
  if (arg === undefined) return "undefined";
  return JSON.stringify(arg);
}

function executeJavaScript(code) {
  const logs = [];

  const pushLog = (...args) => {
    logs.push([...args].map(formatArg).join(" "));
  };

  const sandbox = {
    console: {
      log: pushLog,
      error: pushLog,
      warn: pushLog,
      info: pushLog,
    },
    Math, JSON, parseInt, parseFloat,
    isNaN, isFinite, encodeURI, decodeURI, encodeURIComponent, decodeURIComponent,
    Array, Object, String, Number, Boolean,
    Date, RegExp, Map, Set, Promise, Symbol,
    Error, TypeError, RangeError, ReferenceError, SyntaxError, EvalError,
    setTimeout: (fn) => { if (typeof fn === "function") return fn(); },
    clearTimeout: () => {},
    setInterval: () => { throw new Error("setInterval is not allowed"); },
    clearInterval: () => {},
  };

  try {
    vm.runInNewContext(code, sandbox, { timeout: TIMEOUT_MS });
    return { output: logs.join("\n"), error: "" };
  } catch (err) {
    return { output: logs.join("\n"), error: err.message };
  }
}

function executePython(code) {
  return new Promise((resolve) => {
    const tmpDir = mkdtempSync(join(tmpdir(), "py-"));
    const filePath = join(tmpDir, "main.py");

    try {
      writeFileSync(filePath, code);
    } catch (err) {
      return resolve({ output: "", error: `Failed to write temp file: ${err.message}` });
    }

    execFile("python3", [filePath], { timeout: TIMEOUT_MS, maxBuffer: MAX_BUFFER }, (error, stdout, stderr) => {
      try { rmSync(tmpDir, { recursive: true, force: true }); } catch {}

      if (error) {
        resolve({ output: stdout, error: error.killed ? "Execution timed out" : (stderr || error.message) });
      } else {
        resolve({ output: stdout, error: stderr });
      }
    });
  });
}

function executeJava(code) {
  return new Promise((resolve) => {
    const tmpDir = mkdtempSync(join(tmpdir(), "java-"));
    const filePath = join(tmpDir, "Main.java");

    try {
      writeFileSync(filePath, code);
    } catch (err) {
      return resolve({ output: "", error: `Failed to write temp file: ${err.message}` });
    }

    execFile("javac", [filePath], { timeout: TIMEOUT_MS }, (compileError, _, compileStderr) => {
      if (compileError) {
        try { rmSync(tmpDir, { recursive: true, force: true }); } catch {}
        return resolve({ output: "", error: compileStderr || compileError.message });
      }

      execFile("java", ["-cp", tmpDir, "Main"], { timeout: TIMEOUT_MS, maxBuffer: MAX_BUFFER }, (runError, stdout, stderr) => {
        try { rmSync(tmpDir, { recursive: true, force: true }); } catch {}

        if (runError) {
          resolve({ output: stdout, error: stderr || runError.message });
        } else {
          resolve({ output: stdout, error: stderr });
        }
      });
    });
  });
}

export async function executeCode(req, res) {
  try {
    const { language, code } = req.body;

    if (!language || typeof code !== "string") {
      return res.status(400).json({ success: false, error: "Missing required fields: language, code" });
    }

    let result;
    switch (language) {
      case "javascript":
        result = executeJavaScript(code);
        break;
      case "python":
        result = await executePython(code);
        break;
      case "java":
        result = await executeJava(code);
        break;
      default:
        return res.status(400).json({ success: false, error: `Unsupported language: ${language}` });
    }

    if (result.error) {
      return res.json({ success: false, output: result.output, error: result.error });
    }

    return res.json({ success: true, output: result.output || "No output" });
  } catch (error) {
    console.error("Code execution error:", error);
    return res.status(500).json({ success: false, error: `Failed to execute code: ${error.message}` });
  }
}
