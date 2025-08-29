import ThemedSwitch from '@components/input/ThemedSwitch'
import SectionTitle from '@components/text/SectionTitle'
import { AppSettings } from '@lib/constants/GlobalValues'
import React from 'react'
import { View, Text, Alert } from 'react-native'
import { useMMKVBoolean } from 'react-native-mmkv'
import { Theme } from '@lib/theme/ThemeManager'

const SecuritySettings = () => {
    const { color, spacing } = Theme.useTheme()
    const [authLocal, setAuthLocal] = useMMKVBoolean(AppSettings.LocallyAuthenticateUser)
    const [requireDeviceAuthForAPI, setRequireDeviceAuthForAPI] = useMMKVBoolean(AppSettings.RequireDeviceAuthForAPI)
    const [enableAPIErrorCorrection, setEnableAPIErrorCorrection] = useMMKVBoolean(AppSettings.EnableAPIErrorCorrection)
    const [enableAPIUserOverride, setEnableAPIUserOverride] = useMMKVBoolean(AppSettings.EnableAPIUserOverride)

    const handleDeviceAuthToggle = (value: boolean) => {
        if (value) {
            Alert.alert(
                'Device Authentication Required',
                'This will require device lock (PIN, pattern, or biometric) to access API keys and sensitive settings.',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Enable', onPress: () => setRequireDeviceAuthForAPI(true) }
                ]
            )
        } else {
            setRequireDeviceAuthForAPI(false)
        }
    }

    return (
        <View style={{ rowGap: 8 }}>
            <SectionTitle>App Security</SectionTitle>
            <ThemedSwitch
                label="Lock App"
                value={authLocal}
                onChangeValue={setAuthLocal}
                description="Requires user authentication to open the app. This will not work if you have no device locks enabled."
            />
            
            <SectionTitle>API Security</SectionTitle>
            <ThemedSwitch
                label="Require Device Auth for API Keys"
                value={requireDeviceAuthForAPI}
                onChangeValue={handleDeviceAuthToggle}
                description="Requires device lock to view or edit API keys and sensitive connection settings"
            />
            
            <SectionTitle>API Error Handling</SectionTitle>
            <ThemedSwitch
                label="Enable Automatic Error Correction"
                value={enableAPIErrorCorrection}
                onChangeValue={setEnableAPIErrorCorrection}
                description="Automatically handle common API errors like 'too many arguments' or 'too many blocks'"
            />
            
            <ThemedSwitch
                label="Allow User Parameter Override"
                value={enableAPIUserOverride}
                onChangeValue={setEnableAPIUserOverride}
                description="Allow users to manually correct API parameters and JSON formatting"
            />
        </View>
    )
}

export default SecuritySettings
