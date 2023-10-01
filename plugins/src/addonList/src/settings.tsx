import { ReactNative } from "@vendetta/metro/common";
import { storage } from "@vendetta/plugin";
import { useProxy } from "@vendetta/storage";
import { ErrorBoundary, Forms } from "@vendetta/ui/components";

export default () => {
    useProxy(storage);

    return (
        <ErrorBoundary>
            <ReactNative.ScrollView>
                <Forms.FormSwitchRow
                    label="Plugin List: Always send detailed list"
                    onValueChange={(value: boolean) => storage.pluginListAlwaysDetailed = value}
                    value={storage.pluginListAlwaysDetailed}
                />
                <Forms.FormSwitchRow
                    label="Theme List: Always send detailed list"
                    onValueChange={(value: boolean) => storage.themeListAlwaysDetailed = value}
                    value={storage.themeListAlwaysDetailed}
                />
            </ReactNative.ScrollView>
        </ErrorBoundary>
    );
}
