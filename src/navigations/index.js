import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { TabBarCustom } from '../components';
import {
    ChangeAvatarScreen,
    ChangeLanguageScreen,
    ChangeNotificationScreen,
    ChangePasswordScreen,
    ChangeValueFieldScreen,
    ChangeValueScheduleScreen,
    ChatScreen,
    ChooseLanguageScreen,
    ChooseRegionScreen,
    ForgotCodeScreen,
    ForgotScreen,
    HistoryDetailScreen,
    HistoryScreen,
    HomeScreen,
    LoginScreen,
    NotificationScreen,
    OrderScreen,
    PartnerDetailScreen,
    PartnerScheduleScreen,
    PartnerScreen, ProfileEditScreen, ProfileScreen,
    RegistrationScreen,
    ResetPasswordScreen,
    SearchScreen,
    SetScehduleScreen,
    SplashScreen
} from '../screens';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabsNavigation = () => {
    return (
        <Tab.Navigator initialRouteName={'Home'} tabBar={props => <TabBarCustom {...props} />}>
            <Tab.Screen name="Home" component={HomeNavigation} />
            <Tab.Screen name="Search" component={SearchNavigation} />
            <Tab.Screen name="History" component={HistoryNavigation} />
            <Tab.Screen name="Profile" component={ProfileNavigation} />
        </Tab.Navigator>
    )
}

const RootNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'Splash'}>
                <Stack.Screen name="Splash" component={SplashNavigation} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const SplashNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={'Splash'}>
            <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ChooseLangue" component={ChooseLangueNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={HomeNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginNavigation} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const ChooseLangueNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={'ChooseLangue'}>
            <Stack.Screen name="Login" component={LoginNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="ChooseLangue" component={ChooseLanguageScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Tabs" component={TabsNavigation} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const LoginNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={'Login'}>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Forgot" component={ForgotNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="Registration" component={RegistrationNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="Tabs" component={TabsNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="Partner" component={PartnerNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="PartnerDetail" component={PartnerDetailNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="PartnerSchedule" component={PartnerScheduleNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="Notification" component={NotificationNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={ProfileNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="HistoryDetail" component={HistoryDetailNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="ProfileEdit" component={ProfileEditNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="ChangePassword" component={ChangePasswordNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="ChangeNotification" component={ChangeNotificationNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="ChangeLanguage" component={ChangeLanguageNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="ChangeValueField" component={ChangeValueFieldNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="ChangeAvatar" component={ChangeAvatarNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="Order" component={OrderNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="ChooseRegion" component={ChooseRegionNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="SetSchedule" component={SetScheduleNavigation} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const ForgotNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={'Forgot'}>
            <Stack.Screen name="Login" component={LoginNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="Forgot" component={ForgotScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ForgotCode" component={ForgotCodeNavigation} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const ForgotCodeNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={'ForgotCode'}>
            <Stack.Screen name="Login" component={LoginNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="ForgotCode" component={ForgotCodeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordNavigation} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const ResetPasswordNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={'ResetPassword'}>
            <Stack.Screen name="Login" component={LoginNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const RegistrationNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={'Registration'}>
            <Stack.Screen name="Login" component={LoginNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}


const HomeNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={'Home'}>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginNavigation} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const PartnerNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={'Partner'}>
            <Stack.Screen name="Partner" component={PartnerScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={TabsNavigation} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const ChooseRegionNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={'ChooseRegion'}>
            <Stack.Screen name="ChooseRegion" component={ChooseRegionScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const PartnerDetailNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={'PartnerDetail'}>
            <Stack.Screen name="PartnerDetail" component={PartnerDetailScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const PartnerScheduleNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={'PartnerSchedule'}>
            <Stack.Screen name="PartnerSchedule" component={PartnerScheduleScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const SearchNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={'Search'}>
            <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={HomeNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="Notification" component={NotificationNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={ProfileNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="History" component={HistoryNavigation} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const HistoryNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={'History'}>
            <Stack.Screen name="History" component={HistoryScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const HistoryDetailNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={'HistoryDetail'}>
            <Stack.Screen name="HistoryDetail" component={HistoryDetailScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const ProfileNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={'Profile'}>
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={HomeNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="Notification" component={NotificationNavigation} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const ProfileEditNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={'ProfileEdit'}>
            <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={ProfileNavigation} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const ChangePasswordNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={'ChangePassword'}>
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const ChangeNotificationNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={'ChangeNotification'}>
            <Stack.Screen name="ChangeNotification" component={ChangeNotificationScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const ChangeLanguageNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={'ChangeLanguage'}>
            <Stack.Screen name="ChangeLanguage" component={ChangeLanguageScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const ChangeValueFieldNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={'ChangeValueField'}>
            <Stack.Screen name="ChangeValueField" component={ChangeValueFieldScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const SetScheduleNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={'SetSchedule'}>
            <Stack.Screen name="SetSchedule" component={SetScehduleScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ChangeValueSchedule" component={ChangeValueScheduleNavigation} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const ChangeValueScheduleNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={'ChangeValueSchedule'}>
            <Stack.Screen name="ChangeValueSchedule" component={ChangeValueScheduleScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const ChangeAvatarNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={'ChangeAvatar'}>
            <Stack.Screen name="ChangeAvatar" component={ChangeAvatarScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const ChatNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={'Chat'}>
            <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={TabsNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="Notification" component={NotificationNavigation} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const NotificationNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={'Notification'}>
            <Stack.Screen name="Chat" component={ChatNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={TabsNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="Notification" component={NotificationScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const OrderNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={'Order'}>
            <Stack.Screen name="Order" component={OrderScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default RootNavigation
