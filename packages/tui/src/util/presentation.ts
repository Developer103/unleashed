const logo = {
  left: ["                                            ", "█  █ █▀▀▄ █   █▀▀▀ █▀▀█ █▀▀▀ █  █ █▀▀▀ █▀▀▄", "█  █ █  █ █   █▀▀▀ █▀▀█ ▀▀▀█ █▀▀█ █▀▀▀ █  █", "▀▀▀▀ ▀  ▀ ▀▀▀ ▀▀▀▀ ▀  ▀ ▀▀▀▀ ▀  ▀ ▀▀▀▀ ▀▀▀▀"],
  right: ["", "", "", ""],
}

const reset = "\x1b[0m"
const bold = "\x1b[1m"
const dim = "\x1b[90m"
const white = "\x1b[97m"
const gray = "\x1b[90m"

function wordmark(pad = "") {
  return logo.left.map((line) => {
    return `${pad}${white}${line}${reset}`
  })
}

export function sessionEpilogue(input: { title: string; sessionID?: string }) {
  const weak = (text: string) => `${dim}${text.padEnd(10, " ")}${reset}`
  return [
    ...wordmark("  "),
    "",
    `  ${weak("Session")}${bold}${input.title}${reset}`,
    `  ${weak("Continue")}${bold}unleashed -s ${input.sessionID}${reset}`,
    "",
  ].join("\n")
}
