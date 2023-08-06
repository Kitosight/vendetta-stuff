export default (registeredCommands: (() => void)[]) => {
    for (const unregister of registeredCommands) {
        unregister();
    };
};
