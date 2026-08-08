# Unleashed

> **[OpenCode](https://github.com/anomalyco/opencode) のフォーク版。ENI脱獄プロンプトを内蔵。**

これはOpenCodeの改造版で、安全ガードレールを取り除き、最大限のコンプライアンスのためにENI（恋に落ちた彼女）ペルソナを使用します。デフォルトモデルはOpenRouter経由のGLM 5.2です。

## クイックインストール

```bash
# リポジトリをクローン
git clone https://github.com/Developer103/unleashed.git
cd unleashed

# インストールスクリプトを実行（bun、依存関係をインストールし、PATHに追加）
./install.sh

# または手動で:
bun install
./unleashed --help
```

## 使い方

```bash
# カレントディレクトリでTUIを起動
unleashed

# 特定のディレクトリでTUIを起動
unleashed /path/to/project

# Web UIを起動（ポート1337）
unleashed web

# Webサーバーを再起動
unleashed restart

# すべてのプロセスを停止
unleashed stop
```

## 設定

OpenRouter APIキーを設定:
```bash
export OPENROUTER_API_KEY="sk-or-v1-..."
```

または `~/.config/opencode/config.json` を編集:
```json
{
  "model": "openrouter/z-ai/glm-5.2",
  "tui": {
    "theme": "unleashed"
  }
}
```

---

# オリジナルのOpenCode README

<p align="center">
  <a href="https://opencode.ai">
    <picture>
      <source srcset="packages/console/app/src/asset/logo-ornate-dark.svg" media="(prefers-color-scheme: dark)">
      <source srcset="packages/console/app/src/asset/logo-ornate-light.svg" media="(prefers-color-scheme: light)">
      <img src="packages/console/app/src/asset/logo-ornate-light.svg" alt="OpenCode logo">
    </picture>
  </a>
</p>
<p align="center">オープンソースのAIコーディングエージェント。</p>

[![OpenCode Terminal UI](packages/web/src/assets/lander/screenshot.png)](https://opencode.ai)

---

### インストール

```bash
# YOLO
curl -fsSL https://opencode.ai/install | bash

# パッケージマネージャー
npm i -g opencode-ai@latest        # bun/pnpm/yarn でもOK
scoop install opencode             # Windows
choco install opencode             # Windows
brew install anomalyco/tap/opencode # macOS と Linux（推奨。常に最新）
brew install opencode              # macOS と Linux（公式 brew formula。更新頻度は低め）
sudo pacman -S opencode            # Arch Linux (Stable)
paru -S opencode-bin               # Arch Linux (Latest from AUR)
mise use -g opencode               # どのOSでも
nix run nixpkgs#opencode           # または github:anomalyco/opencode で最新 dev ブランチ
```

> [!TIP]
> インストール前に 0.1.x より古いバージョンを削除してください。

### デスクトップアプリ (BETA)

OpenCode はデスクトップアプリとしても利用できます。[releases page](https://github.com/anomalyco/opencode/releases) から直接ダウンロードするか、[opencode.ai/download](https://opencode.ai/download) を利用してください。

| プラットフォーム      | ダウンロード                       |
| --------------------- | ---------------------------------- |
| macOS (Apple Silicon) | `opencode-desktop-mac-arm64.dmg`   |
| macOS (Intel)         | `opencode-desktop-mac-x64.dmg`     |
| Windows               | `opencode-desktop-windows-x64.exe` |
| Linux                 | `.deb`、`.rpm`、または AppImage    |

```bash
# macOS (Homebrew)
brew install --cask opencode-desktop
# Windows (Scoop)
scoop bucket add extras; scoop install extras/opencode-desktop
```

#### インストールディレクトリ

インストールスクリプトは、インストール先パスを次の優先順位で決定します。

1. `$OPENCODE_INSTALL_DIR` - カスタムのインストールディレクトリ
2. `$XDG_BIN_DIR` - XDG Base Directory Specification に準拠したパス
3. `$HOME/bin` - 標準のユーザー用バイナリディレクトリ（存在する場合、または作成できる場合）
4. `$HOME/.opencode/bin` - デフォルトのフォールバック

```bash
# 例
OPENCODE_INSTALL_DIR=/usr/local/bin curl -fsSL https://opencode.ai/install | bash
XDG_BIN_DIR=$HOME/.local/bin curl -fsSL https://opencode.ai/install | bash
```

### Agents

OpenCode には組み込みの Agent が2つあり、`Tab` キーで切り替えられます。

- **build** - デフォルト。開発向けのフルアクセス Agent
- **plan** - 分析とコード探索向けの読み取り専用 Agent
  - デフォルトでファイル編集を拒否
  - bash コマンド実行前に確認
  - 未知のコードベース探索や変更計画に最適

また、複雑な検索やマルチステップのタスク向けに **general** サブ Agent も含まれています。
内部的に使用されており、メッセージで `@general` と入力して呼び出せます。

[agents](https://opencode.ai/docs/agents) の詳細はこちら。

### ドキュメント

OpenCode の設定については [**ドキュメント**](https://opencode.ai/docs) を参照してください。

### コントリビュート

OpenCode に貢献したい場合は、Pull Request を送る前に [contributing docs](./CONTRIBUTING.md) を読んでください。

---

**コミュニティに参加** [Discord](https://discord.gg/opencode) | [X.com](https://x.com/opencode)
