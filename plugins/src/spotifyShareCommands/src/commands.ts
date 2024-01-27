import { findByProps, findByStoreName } from "@vendetta/metro";
import { Command } from "./consts";

const MessageActions = findByProps('sendMessage', 'receiveMessage');
const Clyde = findByProps('sendBotMessage');
const SpotifyStore: ISpotifyStore = findByStoreName('SpotifyStore');

interface ISpotifyStore {
    getTrack(): TrackData | void;
}

interface TrackData {
    id: string;
    name: string;
    /**
     * Track duration in ms
     */
    duration: number;
    album: TrackAlbum;
    artists: TrackArtist[];
    isLocal: boolean;
}

interface TrackAlbum {
    id: string;
    name: string;
    image: TrackCover;
}

interface TrackCover {
    height: number;
    url: string;
    width: string;
}

interface TrackArtist {
    external_urls: {
        spotify: string;
    };
    /**
     * Spotify endpoint
     */
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

export type CommandName =  typeof Command[keyof typeof Command]['name'];

export async function execute(commandName: CommandName, ctx: CommandContext) {
    const channelId = ctx.channel.id;
    const track = SpotifyStore.getTrack();

    if (!track)
        return Clyde.sendBotMessage(channelId, 'You are not listening to any track.');

    let content: string;
    switch (commandName) {
        case "spotify track":
            content = `https://open.spotify.com/track/${track.id}`;
            break;
        case "spotify album":
            content = `https://open.spotify.com/album/${track.album.id}`;
            break;
        case "spotify artists":
            content = track.artists.map((artist) => {
                return `[${artist.name}](${artist.external_urls.spotify})`
            }).join('\n');
            break;
        case "spotify cover":
            content = track.album.image.url;
            break;
    }

    await MessageActions.sendMessage(channelId, { content });
}
