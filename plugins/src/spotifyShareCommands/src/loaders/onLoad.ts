import { registerCommand } from "@vendetta/commands";

import { type RegisteredCommand } from "..";
import { Command } from "../consts";
import { type CommandName, execute } from "../commands";

export function load(): RegisteredCommand[] {
    const registeredCommands: RegisteredCommand[] = [];

    const commonProperties = <ApplicationCommand> {
        inputType: 1,
        type: 1,
        applicationId: '-1'
    };

    function shortCommandData(name: CommandName, description: string) {
        return <ApplicationCommand> {
            name,
            displayName: name,
            description,
            displayDescription: description,
            execute: async (_args, ctx) => execute(name, ctx) 
        };
    }

    const { SpotifyArtist, SpotifyAlbum, SpotifyTrack, SpotifyCover } = Command;

    registeredCommands.push(
        registerCommand({
            ...shortCommandData(SpotifyArtist.name, SpotifyArtist.description),
            ...commonProperties
        }),
        registerCommand({
            ...shortCommandData(SpotifyAlbum.name, SpotifyAlbum.description),
            ...commonProperties
        }),
        registerCommand({
            ...shortCommandData(SpotifyTrack.name, SpotifyTrack.description),
            ...commonProperties
        }),
        registerCommand({
            ...shortCommandData(SpotifyCover.name, SpotifyCover.description),
            ...commonProperties
        })
    );

    return registeredCommands;
}
