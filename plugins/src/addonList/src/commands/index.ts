import { findByProps, findByStoreName } from "@vendetta/metro";
import { themes } from "@vendetta/themes";
import { plugins } from "@vendetta/plugins";
import { storage } from "@vendetta/plugin";
import { alerts } from "@vendetta/ui";

import {
    ALERT,
    ARGS,
    EMPTY,
    FAILED_TO_SEND_LIST,
    JOINERS,
    NOTHING_TO_SEE,
    SPLIT_LARGE_MESSAGES_PLUGIN,
    STATUS
} from "../consts";

const MessageActions = findByProps('sendMessage', 'receiveMessage');
const Clyde = findByProps('sendBotMessage');

const maxMessageLength = findByStoreName('UserStore')
    .getCurrentUser()
    ?.premiumType === 2
        ? 4000
        : 2000;

const isSLMPluginInstalled = (installedPlugins: typeof plugins) =>
    Object.keys(installedPlugins)
        .includes(SPLIT_LARGE_MESSAGES_PLUGIN);
const isSLMPluginEnabled = (installedPlugins: typeof plugins) =>
    Object.values(installedPlugins)
        .find((plugin) => plugin.id == SPLIT_LARGE_MESSAGES_PLUGIN)
        .enabled;

const getArgumentValue = (args: any[]): any | false =>
    args
        .find((arg) => arg.name === ARGS.DETAILED)
        ?.value ?? false;

const addonAuthors = (authors: Author[]) =>
    authors
        .map(author => author.name)
        .join(JOINERS.SEMICOL);

const formatList = (list: string[]) =>
    list
        .join(JOINERS.NEW_LINE)
        .trimEnd();

const getListLength = (list: string[]) => formatList(list).length;

const sendList = async (channelID: string, list: string[]) =>
    await MessageActions.sendMessage(channelID, {
        content: formatList(list)
    });

const baseListHeader = (type: 'Plugin' | 'Theme', length: number) => [
    `**My ${type} List | ${length} ${type}s**`,
    EMPTY
];

export async function themeList(args: any[], ctx: CommandContext) {
    const detailed = getArgumentValue(args);
    const alwaysDetailed = storage.themeListAlwaysDetailed ?? false;

    const objectValues = Object.values(themes);
    
    const channelID: string = ctx.channel.id;

    const themeList = baseListHeader('Theme', Object.keys(themes).length);

    if (objectValues.length) {
        for (const theme of objectValues) {
            const { selected, data, id } = theme;
            const { name, description, authors } = data;
    
            if (detailed || alwaysDetailed)
                themeList.push(
                    `> **Name**: ${name}`,
                    `> **Selected**: ${selected ? STATUS.SELECTED : STATUS.NOT_SELECTED}`,
                    `> **Description**: ${description}`,
                    `> **Authors**: ${addonAuthors(authors)}`,
                    `> **[Install!](${id})**`,
                    EMPTY
                );
            else
                themeList.push(`> ${selected ? STATUS.SELECTED : STATUS.NOT_SELECTED} **${name}** by ${addonAuthors(authors)}`);
        }
    } else
        themeList.push(NOTHING_TO_SEE);

    const isListTooLong = getListLength(themeList) > maxMessageLength;

    if (isListTooLong && !isSLMPluginInstalled(plugins))
        Clyde.sendBotMessage(channelID, FAILED_TO_SEND_LIST.SLM_NOT_INSTALLED);
    else if (isListTooLong && !isSLMPluginEnabled(plugins))
        Clyde.sendBotMessage(channelID, FAILED_TO_SEND_LIST.SLM_NOT_ENABLED);
    else {
        if (getListLength(themeList) > 2000)
            return alerts.showConfirmationAlert({
                content: ALERT.CONTENT,
                confirmText: ALERT.CONFIRM,
                cancelText: ALERT.CANCEL,
                onConfirm: async () => await sendList(channelID, themeList)
            });
        
        await sendList(channelID, themeList);
    }
}

export async function pluginList(args: any[], ctx: CommandContext) {    
    const detailed = getArgumentValue(args);
    const alwaysDetailed = storage.pluginListAlwaysDetailed ?? false;

    const channelID: string = ctx.channel.id;

    const pluginList = baseListHeader('Plugin', Object.keys(plugins).length);

    for (const plugin of Object.values(plugins)) {
        const { enabled, manifest, id } = plugin;
        const { name, description, authors } = manifest;

        if (detailed || alwaysDetailed)
            pluginList.push(
                `> **Name**: ${name}`,
                `> **Status**: ${enabled ? STATUS.ENABLED : STATUS.DISABLED}`,
                `> **Description**: ${description}`,
                `> **Authors**: ${addonAuthors(authors)}`,
                `> **[Install!](${id})**`,
                EMPTY
            );
        else
            pluginList.push(`> ${enabled ? STATUS.ENABLED : STATUS.DISABLED} **${name}** by ${addonAuthors(authors)}`);
    }

    const isListTooLong = getListLength(pluginList) > maxMessageLength;

    if (isListTooLong && !isSLMPluginInstalled(plugins))
        Clyde.sendBotMessage(channelID, FAILED_TO_SEND_LIST.SLM_NOT_INSTALLED);
    else if (isListTooLong && !isSLMPluginEnabled(plugins))
        Clyde.sendBotMessage(channelID, FAILED_TO_SEND_LIST.SLM_NOT_ENABLED);
    else {
        if (getListLength(pluginList) > 2000)
            return alerts.showConfirmationAlert({
                content: ALERT.CONTENT,
                confirmText: ALERT.CONFIRM,
                cancelText: ALERT.CANCEL,
                onConfirm: async () => await sendList(channelID, pluginList)
            });

        await sendList(channelID, pluginList);
    }
}
