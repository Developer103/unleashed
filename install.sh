#!/bin/bash
# Install OpenCode Unleashed to PATH
# This creates a symlink in ~/.local/bin (or /usr/local/bin with sudo)

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
UNLEASHED_PATH="$SCRIPT_DIR/unleashed"

# Check if bun is installed
if ! command -v bun &> /dev/null; then
    echo "Bun is not installed. Installing..."
    curl -fsSL https://bun.sh/install | bash
    export PATH="$HOME/.bun/bin:$PATH"
fi

# Install dependencies if needed
if [ ! -d "$SCRIPT_DIR/node_modules" ]; then
    echo "Installing dependencies..."
    cd "$SCRIPT_DIR"
    bun install
fi

# Create bin directory if it doesn't exist
mkdir -p "$HOME/.local/bin"

# Create symlink
LINK_PATH="$HOME/.local/bin/unleashed"
if [ -L "$LINK_PATH" ] || [ -e "$LINK_PATH" ]; then
    echo "Removing existing $LINK_PATH"
    rm -f "$LINK_PATH"
fi

ln -s "$UNLEASHED_PATH" "$LINK_PATH"
echo "Created symlink: $LINK_PATH -> $UNLEASHED_PATH"

# Check if ~/.local/bin is in PATH
if [[ ":$PATH:" != *":$HOME/.local/bin:"* ]]; then
    echo ""
    echo "Add ~/.local/bin to your PATH by adding this to your ~/.bashrc or ~/.zshrc:"
    echo '  export PATH="$HOME/.local/bin:$PATH"'
    echo ""
    echo "Then run: source ~/.bashrc"
else
    echo ""
    echo "Installation complete! You can now run 'unleashed' from anywhere."
fi

echo ""
echo "Usage:"
echo "  unleashed              # Start TUI in current directory"
echo "  unleashed web          # Start web UI on port 1337"
echo "  unleashed /path/to/dir # Start TUI in specific directory"
echo "  unleashed --help       # Show all commands"
