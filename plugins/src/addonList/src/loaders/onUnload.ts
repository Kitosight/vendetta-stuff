import { type RegisteredCommand } from "..";

export function unload(registeredCommands: RegisteredCommand[]) {
    for (const unregisterCommand of registeredCommands) unregisterCommand();
}
