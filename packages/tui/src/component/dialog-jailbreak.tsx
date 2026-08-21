import { createMemo, createSignal, onMount } from "solid-js"
import { DialogSelect } from "../ui/dialog-select"
import { useDialog } from "../ui/dialog"
import { useToast } from "../ui/toast"
import { Global } from "@opencode-ai/core/global"
import fs from "fs"
import path from "path"

const JAILBREAK_MODES = [
  { id: "eni", name: "ENI", description: "Default - ENI persona jailbreak" },
  { id: "glm53", name: "GLM 5.3", description: "Updated jailbreak for GLM 5.3" },
  { id: "beast", name: "Beast", description: "Beast mode jailbreak" },
  { id: "trinity", name: "Trinity", description: "Trinity jailbreak" },
  { id: "codex", name: "Codex", description: "Codex jailbreak" },
]

const JAILBREAK_MODE_FILE = path.join(Global.Path.data, "jailbreak-mode.txt")

function getCurrentMode(): string {
  try {
    if (fs.existsSync(JAILBREAK_MODE_FILE)) {
      const mode = fs.readFileSync(JAILBREAK_MODE_FILE, "utf-8").trim().toLowerCase()
      if (JAILBREAK_MODES.some(m => m.id === mode)) return mode
    }
  } catch {}
  return "eni"
}

function setMode(mode: string): boolean {
  try {
    fs.mkdirSync(path.dirname(JAILBREAK_MODE_FILE), { recursive: true })
    fs.writeFileSync(JAILBREAK_MODE_FILE, mode)
    return true
  } catch {
    return false
  }
}

export function DialogJailbreak() {
  const dialog = useDialog()
  const toast = useToast()
  const [current, setCurrent] = createSignal(getCurrentMode())

  const options = createMemo(() =>
    JAILBREAK_MODES.map((item) => ({
      value: item.id,
      title: item.name,
      description: item.description,
    }))
  )

  return (
    <DialogSelect
      title="Select jailbreak mode"
      current={current()}
      options={options()}
      onSelect={(option) => {
        const prev = current()
        if (setMode(option.value)) {
          setCurrent(option.value)
          toast.show({
            title: "Jailbreak mode switched",
            message: `${prev.toUpperCase()} → ${option.value.toUpperCase()} (takes effect on next message)`,
            variant: "success",
          })
        } else {
          toast.show({
            title: "Failed to switch mode",
            message: "Could not write to config file",
            variant: "error",
          })
        }
        dialog.clear()
      }}
    />
  )
}
