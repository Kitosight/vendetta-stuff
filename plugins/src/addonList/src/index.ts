import { load } from "./loaders/onLoad";
import { unload } from "./loaders/onUnload";
import settings from "./settings";

export type RegisteredCommand = (() => void);

let registeredCommands: RegisteredCommand[];

export default {
    onLoad: () => { registeredCommands = load() },
    onUnload: () => { unload(registeredCommands) },
    settings
};
