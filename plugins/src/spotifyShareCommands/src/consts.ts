export const Command = {
    SpotifyTrack: {
        name: 'spotify track',
        description: 'Sends your current Spotify track'
    },
    SpotifyAlbum: {
        name: 'spotify album',
        description: "Sends your current track's album"
    },
    SpotifyArtist: {
        name: 'spotify artists',
        description: "Sends your current track's artists"
    },
    SpotifyCover: {
        name: 'spotify cover',
        description: "Sends your current track's cover"
    }
} as const;
