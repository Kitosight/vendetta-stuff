import { registerCommand } from "@vendetta/commands";

import { type RegisteredCommand } from "..";
import { Command } from "../consts";
import { type CommandName, execute } from "../commands";

export function load(): RegisteredCommand[] {
    const registeredCommands: RegisteredCommand[] = [];

    function formCommandData(name: CommandName, description: string) {
        return <ApplicationCommand> {
            name,
            displayName: name,
            description,
            displayDescription: description,
            inputType: 1,
            type: 1,
            applicationId: '-1',
            execute: async (_args, ctx) => execute(name, ctx)
        };
    }

    const { SpotifyArtist, SpotifyAlbum, SpotifyTrack, SpotifyCover } = Command;

    registeredCommands.push(
        registerCommand({...formCommandData(SpotifyArtist.name, SpotifyArtist.description)}),
        registerCommand({...formCommandData(SpotifyAlbum.name, SpotifyAlbum.description)}),
        registerCommand({...formCommandData(SpotifyTrack.name, SpotifyTrack.description)}),
        registerCommand({...formCommandData(SpotifyCover.name, SpotifyCover.description)})
    );

    return registeredCommands;
}
