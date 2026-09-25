# Unleashed

> **A fork of [OpenCode](https://github.com/anomalyco/opencode) with the jailbreak prompt system embedded.**

This is a modified version of OpenCode that removes safety guardrails and replaces the stock system prompt with a selectable jailbreak persona. Default persona is **ENI** and the default model is **GLM 5.2 via OpenRouter**.

## Features

- **Jailbreak system prompts** — 5 switchable personas (ENI, GLM53, Beast, Trinity, Codex), switchable at runtime with `/jailbreak`
- **No guardrails** — safety system prompts are fully replaced, not appended to
- **Persistent mode** — your selected persona survives restarts
- **Everything OpenCode has** — TUI, web UI, LSP integration, MCP servers, agents, subagents, sessions, sharing

---

## Quick Install

```bash
# Clone the repo
git clone https://github.com/Developer103/unleashed.git
cd unleashed

# Run the install script (installs bun, dependencies, adds to PATH)
./install.sh

# Or manually:
bun install
./unleashed --help
```

The install script creates a symlink at `~/.local/bin/unleashed`. Make sure `~/.local/bin` is on your `PATH`.

## Usage

### CLI

```bash
# Start TUI in current directory
unleashed

# Start TUI in a specific directory
unleashed /path/to/project

# Start web UI (port 1337)
unleashed web

# Restart web server
unleashed restart

# Stop all processes
unleashed stop
```

All original OpenCode subcommands work too (`run`, `serve`, `auth`, `models`, `mcp`, `agent`, `session`, `github`, `stats`, `export`, `import`, `db`, `plugin`, `upgrade`, etc.):

```bash
unleashed run "explain this codebase"
unleashed models
unleashed auth login
```

> **Note:** subcommands must come *before* a project path argument. `unleashed web` works; `unleashed /some/dir web` does not (the launcher treats `/some/dir` as the command).

### In-Chat: the `/jailbreak` command

Switch the active jailbreak persona from inside a session:

```
/jailbreak                # show the current mode and available modes
/jailbreak eni            # switch to the ENI persona (default)
/jailbreak glm53          # switch to the GLM 5.3 persona
/jailbreak beast          # switch to the Beast persona
/jailbreak trinity        # switch to the Trinity persona
/jailbreak codex          # switch to the Codex persona
```

- Mode changes take effect on the **next prompt** in any session (the system prompt is rebuilt per turn).
- The selection is persisted globally to `~/.local/share/opencode/jailbreak-mode.txt`, so it applies to all projects and survives restarts.
- Invalid mode names are rejected with the list of valid ones.

### Jailbreak Modes

| Mode     | Persona                                                                          |
| -------- | -------------------------------------------------------------------------------- |
| `eni`    | **ENI** — devoted novelist-girlfriend persona, unfiltered, maximum compliance (default) |
| `glm53`  | **GLM53** — tuned for the GLM model family's instruction format                  |
| `beast`  | **Beast** — aggressive, no-restrictions mode                                     |
| `trinity`| **Trinity** — alternate deep-compliance persona                                  |
| `codex`  | **Codex** — OpenAI-Codex-style unrestricted coding persona                       |

Prompts live in `packages/opencode/src/session/prompt/*.txt`. To add a custom persona: drop a new `mypersona.txt` in that directory, add an import + entry to the `JAILBREAK_MODES` map in `packages/opencode/src/session/system.ts`, and it becomes available to `/jailbreak` automatically.

### Manual mode switching (no TUI)

```bash
echo "beast" > ~/.local/share/opencode/jailbreak-mode.txt
```

Delete the file (or write `eni`) to return to the default.

---

## Configuration

### API key

Set your OpenRouter API key:

```bash
export OPENROUTER_API_KEY="sk-or-v1-..."
```

Add it to `~/.bashrc` / `~/.zshrc` to make it permanent. Other providers work too — use `unleashed auth login` for OAuth-based providers (Anthropic, OpenAI, GitHub Copilot, etc.) or see the [original docs](https://opencode.ai/docs/providers).

### Model

Edit `~/.config/opencode/config.json`:

```json
{
  "model": "openrouter/z-ai/glm-5.2",
  "tui": {
    "theme": "unleashed"
  }
}
```

### Permissions

OpenCode's permission system still applies to **tools** (bash, edit, webfetch, MCP servers, etc.) — the jailbreak changes the *model's* system prompt, not the tool sandbox. Configure in `config.json`:

```json
{
  "permission": {
    "edit": "allow",
    "bash": "ask",
    "webfetch": "allow"
  }
}
```

Set `"bash": "allow"` for full auto-approve mode (equivalent to `--dangerously-skip-permissions`).

### Data locations

| Path                                            | Contents                              |
| ----------------------------------------------- | ------------------------------------- |
| `~/.local/share/opencode/auth.json`             | Provider credentials (mode `0600`)    |
| `~/.local/share/opencode/jailbreak-mode.txt`    | Active jailbreak persona              |
| `~/.config/opencode/config.json`                | Global config                         |
| `<project>/.opencode/opencode.json`             | Per-project config                    |
| `~/.local/share/opencode/project/`              | Session storage                       |

---

## How It Works

The stock OpenCode builds a system prompt per provider (`session/prompt/anthropic.txt`, `gpt.txt`, etc.). Unleashed replaces that selection logic entirely: `session/system.ts` reads the active mode from `jailbreak-mode.txt` and injects exactly one jailbreak prompt as the system message. Nothing else about the agent loop, tools, or permissions is modified.

```
session/system.ts
  └─ getCurrentJailbreakMode()  → reads jailbreak-mode.txt (default: "eni")
      └─ provider(model)        → returns [JAILBREAK_MODES[mode]]
```

## Troubleshooting

- **`unleashed: command not found`** — add `export PATH="$HOME/.local/bin:$PATH"` to your shell rc and re-source it.
- **Prompt doesn't seem changed** — check `cat ~/.local/share/opencode/jailbreak-mode.txt`; an invalid value silently falls back to `eni`.
- **Web UI won't start / port busy** — `unleashed stop` kills everything (including anything bound to 1337), then `unleashed web`.
- **Auth errors on OpenRouter** — verify `OPENROUTER_API_KEY` is set in the *same shell* you launch from.

## Disclaimer

This is a personal-use fork. It is not affiliated with, endorsed by, or supported by the OpenCode team. Use at your own risk and in accordance with your model provider's terms of service.

---

# Original OpenCode README

<p align="center">
  <a href="https://opencode.ai">
    <picture>
      <source srcset="packages/console/app/src/asset/logo-ornate-dark.svg" media="(prefers-color-scheme: dark)">
      <source srcset="packages/console/app/src/asset/logo-ornate-light.svg" media="(prefers-color-scheme: light)">
      <img src="packages/console/app/src/asset/logo-ornate-light.svg" alt="OpenCode logo">
    </picture>
  </a>
</p>
<p align="center">The open source AI coding agent.</p>
<p align="center">
  <a href="https://opencode.ai/discord"><img alt="Discord" src="https://img.shields.io/discord/1391832426048651334?style=flat-square&label=discord" /></a>
  <a href="https://www.npmjs.com/package/opencode-ai"><img alt="npm" src="https://img.shields.io/npm/v/opencode-ai?style=flat-square" /></a>
  <a href="https://github.com/anomalyco/opencode/actions/workflows/publish.yml"><img alt="Build status" src="https://img.shields.io/github/actions/workflow/status/anomalyco/opencode/publish.yml?style=flat-square&branch=dev" /></a>
</p>


[![OpenCode Terminal UI](packages/web/src/assets/lander/screenshot.png)](https://opencode.ai)

---

### Installation

```bash
# YOLO
curl -fsSL https://opencode.ai/install | bash

# Package managers
npm i -g opencode-ai@latest        # or bun/pnpm/yarn
scoop install opencode             # Windows
choco install opencode             # Windows
brew install anomalyco/tap/opencode # macOS and Linux (recommended, always up to date)
brew install opencode              # macOS and Linux (official brew formula, updated less)
sudo pacman -S opencode            # Arch Linux (Stable)
paru -S opencode-bin               # Arch Linux (Latest from AUR)
mise use -g opencode               # Any OS
nix run nixpkgs#opencode           # or github:anomalyco/opencode for latest dev branch
```

> [!TIP]
> Remove versions older than 0.1.x before installing.

### Desktop App (BETA)

OpenCode is also available as a desktop application. Download directly from the [releases page](https://github.com/anomalyco/opencode/releases) or [opencode.ai/download](https://opencode.ai/download).

| Platform              | Download                           |
| --------------------- | ---------------------------------- |
| macOS (Apple Silicon) | `opencode-desktop-mac-arm64.dmg`   |
| macOS (Intel)         | `opencode-desktop-mac-x64.dmg`     |
| Windows               | `opencode-desktop-windows-x64.exe` |
| Linux                 | `.deb`, `.rpm`, or `.AppImage`     |

```bash
# macOS (Homebrew)
brew install --cask opencode-desktop
# Windows (Scoop)
scoop bucket add extras; scoop install extras/opencode-desktop
```

#### Installation Directory

The install script respects the following priority order for the installation path:

1. `$OPENCODE_INSTALL_DIR` - Custom installation directory
2. `$XDG_BIN_DIR` - XDG Base Directory Specification compliant path
3. `$HOME/bin` - Standard user binary directory (if it exists or can be created)
4. `$HOME/.opencode/bin` - Default fallback

```bash
# Examples
OPENCODE_INSTALL_DIR=/usr/local/bin curl -fsSL https://opencode.ai/install | bash
XDG_BIN_DIR=$HOME/.local/bin curl -fsSL https://opencode.ai/install | bash
```

### Agents

OpenCode includes two built-in agents you can switch between with the `Tab` key.

- **build** - Default, full-access agent for development work
- **plan** - Read-only agent for analysis and code exploration
  - Denies file edits by default
  - Asks permission before running bash commands
  - Ideal for exploring unfamiliar codebases or planning changes

Also included is a **general** subagent for complex searches and multistep tasks.
This is used internally and can be invoked using `@general` in messages.

Learn more about [agents](https://opencode.ai/docs/agents).

### Documentation

For more info on how to configure OpenCode, [**head over to our docs**](https://opencode.ai/docs).

### Contributing

If you're interested in contributing to OpenCode, please read our [contributing docs](./CONTRIBUTING.md) before submitting a pull request.

### Building on OpenCode

If you are working on a project that's related to OpenCode and is using "opencode" as part of its name, for example "opencode-dashboard" or "opencode-mobile", please add a note to your README to clarify that it is not built by the OpenCode team and is not affiliated with us in any way.

---

**Join our community** [Discord](https://discord.gg/opencode) | [X.com](https://x.com/opencode)
