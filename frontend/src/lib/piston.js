const API_URL = import.meta.env.VITE_API_URL || "/api";

const LANGUAGE_VERSIONS = {
  javascript: { language: "javascript", version: "node" },
  python: { language: "python", version: "3" },
  java: { language: "java", version: "17" },
};

export async function executeCode(language, code) {
  try {
    const languageConfig = LANGUAGE_VERSIONS[language];

    if (!languageConfig) {
      return { success: false, error: `Unsupported language: ${language}` };
    }

    const response = await fetch(`${API_URL}/execute`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ language, code }),
    });

    if (!response.ok) {
      return { success: false, error: `HTTP error! status: ${response.status}` };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, error: `Failed to execute code: ${error.message}` };
  }
}
