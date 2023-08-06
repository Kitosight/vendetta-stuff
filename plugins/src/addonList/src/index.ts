import onLoad from "./loaders/onLoad";
import onUnload from "./loaders/onUnload";
import settings from "./settings";

let registeredCommands: (() => void)[];

export default {
    onLoad: () => { registeredCommands = onLoad() },
    onUnload: () => { onUnload(registeredCommands) },
    settings
};
