export const EMPTY = '';

export const ARGS = {
    DETAILED: 'detailed'
} as const;

export const JOINERS = {
    SEMICOL: ', ',
    NEW_LINE: '\n'
} as const;


export const STATUS = {
    ENABLED: '🟢',
    DISABLED: '🔴',
    SELECTED: '🔶',
    NOT_SELECTED: '🔷'
} as const;

export const NOTHING_TO_SEE = 'Nothing to see here, huh...';

export const COMMAND_OPTIONS = {
    NAME: 'detailed',
    DESCRIPTION: 'Whether to send a list with detailed information.'
} as const;

export const PLUGIN_LIST_COMMAND = {
    NAME: 'plugin-list',
    DISPLAY_NAME: 'plugin list',
    DESCRIPTION: 'Send your plugin list to the current channel'
} as const;

export const THEME_LIST_COMMAND = {
    NAME: 'theme-list',
    DISPLAY_NAME: 'theme list',
    DESCRIPTION: 'Send your theme list to the current channel'
} as const;

export const SPLIT_LARGE_MESSAGES_PLUGIN = 'https://vd-plugins.github.io/proxy/actuallythesun.github.io/vendetta-plugins/SplitLargeMessages/';

export const FAILED_TO_SEND_LIST = {
    SLM_NOT_INSTALLED: `Your list is too long to send it! Please install the [Split Large Messages](${SPLIT_LARGE_MESSAGES_PLUGIN}) plugin.`,
    SLM_NOT_ENABLED: "Your list is too long to send it! You have the Split Large Messages plugin installed, but it's not enabled!\n> Please enable it in order to send the list."
} as const;

export const ALERT = {
    CONTENT: 'Your list is over than 2000 characters. Are you sure?',
    CONFIRM: 'Yes',
    CANCEL: 'No'
} as const;
