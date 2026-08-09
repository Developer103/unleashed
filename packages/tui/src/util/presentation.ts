const logo = [
  " __   __  __    _  ___      _______  _______  _______  __   __  _______  ______  ",
  "|  | |  ||  |  | ||   |    |       ||   _   ||       ||  | |  ||       ||      | ",
  "|  | |  ||   |_| ||   |    |    ___||  |_|  ||  _____||  |_|  ||    ___||  _    |",
  "|  |_|  ||       ||   |    |   |___ |       || |_____ |       ||   |___ | | |   |",
  "|       ||  _    ||   |___ |    ___||       ||_____  ||       ||    ___|| |_|   |",
  "|       || | |   ||       ||   |___ |   _   | _____| ||   _   ||   |___ |       |",
  "|_______||_|  |__||_______||_______||__| |__||_______||__| |__||_______||______| ",
]

const reset = "\x1b[0m"
const bold = "\x1b[1m"
const dim = "\x1b[90m"
const white = "\x1b[97m"
const gray = "\x1b[90m"

function wordmark(pad = "") {
  return logo.map((line) => {
    let result = ""
    for (const char of line) {
      if (char === "|" || char === "_") {
        result += `${gray}${char}${reset}`
      } else if (char === " ") {
        result += " "
      } else {
        result += `${white}${char}${reset}`
      }
    }
    return `${pad}${result}`
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
