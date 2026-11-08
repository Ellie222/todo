// PostToolUse hook: stdin의 JSON에서 파일 경로를 읽어 Prettier로 포맷한다.
let s = "";
process.stdin.on("data", (d) => (s += d)).on("end", () => {
  try {
    const j = JSON.parse(s.replace(/^﻿/, ""));
    const f = (j.tool_response && j.tool_response.filePath) || (j.tool_input && j.tool_input.file_path);
    if (!f) return;
    const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
    require("child_process").spawnSync(
      process.execPath,
      [require("path").join(root, "node_modules", "prettier", "bin", "prettier.cjs"), "--write", "--ignore-unknown", f],
      { stdio: "inherit", cwd: root },
    );
  } catch {}
});
