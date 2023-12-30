import { ReactNative } from "@vendetta/metro/common";
import { storage } from "@vendetta/plugin";
import { useProxy } from "@vendetta/storage";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { ErrorBoundary, Forms } from "@vendetta/ui/components";

const { FormSwitchRow, FormIcon, FormSection } = Forms;
const Icons = {
    List: getAssetIDByName('ic_list')
};

export default () => {
    useProxy(storage);

    return (
        <ErrorBoundary>
            <ReactNative.ScrollView style={{ flex: 1 }}>

                <FormSection title="Plugin List" titleStyleType="no_border" >
                    <FormSwitchRow
                        label="Always send detailed list"
                        subLabel='This will keep the "detailed" option always set to "True"'
                        leading={<FormIcon source={Icons.List} />}
                        onValueChange={(value: boolean) => storage.pluginListAlwaysDetailed = value}
                        value={storage.pluginListAlwaysDetailed}
                    />
                </FormSection>

                <FormSection title="Theme List" titleStyleType="no_border" >
                    <FormSwitchRow
                        label="Always send detailed list"
                        subLabel='This will keep the "detailed" option always set to "True"'
                        leading={<FormIcon source={Icons.List} />}
                        onValueChange={(value: boolean) => storage.themeListAlwaysDetailed = value}
                        value={storage.themeListAlwaysDetailed}
                    />
                </FormSection>

            </ReactNative.ScrollView>
        </ErrorBoundary>
    );
}
