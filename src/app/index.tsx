import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AnimationsDemoPage from '../screens/AllDemos/AnimationsDemoPage';
import BackgroundScreen from '../screens/AllDemos/BackgroundScreen';
import BeautifulHomeScreen from '../screens/AllDemos/BeautifulHomeScreen';
import DemoHomePage from '../screens/AllDemos/DemoHomePage';
import MainDemo from '../screens/AllDemos/MainDemo';
import SegmentControls from '../screens/AllDemos/SegmentControls';
import TabsDemo from '../screens/AllDemos/TabsDemo';
import UserProfile from '../screens/AllDemos/UserProfile';
import BlurEffectsScreen from '../screens/Effects/BlurEffectsScreen';
import DepthEffectsScreen from '../screens/Effects/DepthEffectsScreen';
import GlassMorphismScreen from '../screens/Effects/GlassMorphismScreen';
import GlowEffectsScreen from '../screens/Effects/GlowEffectsScreen';
import MagneticHoverScreen from '../screens/Effects/MagneticHoverScreen';
import TabsLayout from './tabs/_layout';








import AboutScreen from '../screens/MobileApp/AboutScreen';
import AIChartScreen from '../screens/MobileApp/AIChartScreen';
import HelpSupportScreen from '../screens/MobileApp/HelpSupportScreen';
import LiveSupportScreen from '../screens/MobileApp/LiveSupportScreen';
import MenuScreen from '../screens/MobileApp/MenuScreen';
import NotificationsScreen from '../screens/MobileApp/NotificationsScreen';
import OnboardingScreen from '../screens/MobileApp/OnboardingScreen';
import PaymentScreen from '../screens/MobileApp/PaymentScreen';
import PrivacyPolicyScreen from '../screens/MobileApp/PrivacyPolicyScreen';
import ProfileScreen from '../screens/MobileApp/ProfileScreen';
import ReportsScreen from '../screens/MobileApp/ReportsScreen';
import SettingsScreen from '../screens/MobileApp/SettingsScreen';
import ShareUsScreen from '../screens/MobileApp/ShareUsScreen';
import SubscriptionScreen from '../screens/MobileApp/SubscriptionScreen';
import ThemeScreen from '../screens/MobileApp/ThemeScreen';




import ButtonBaseScreen from '../screens/Buttons/ButtonBaseScreen';
import ButtonFloatingScreen from '../screens/Buttons/ButtonFloatingScreen';
import ButtonGhostScreen from '../screens/Buttons/ButtonGhostScreen';
import ButtonGroupScreen from '../screens/Buttons/ButtonGroupScreen';
import ButtonIconScreen from '../screens/Buttons/ButtonIconScreen';
import ButtonLinkScreen from '../screens/Buttons/ButtonLinkScreen';
import ButtonPrimaryScreen from '../screens/Buttons/ButtonPrimaryScreen';
import ButtonSecondaryScreen from '../screens/Buttons/ButtonSecondaryScreen';
import ButtonToggleScreen from '../screens/Buttons/ButtonToggleScreen';






import CodeInputScreen from '../screens/Inputs/CodeInputScreen';
import PhoneInputScreen from '../screens/Inputs/PhoneInputScreen';



import LoginScreen from '../screens/AllDemos/LoginScreen';
import NorthIndianChartScreen from '../screens/AllDemos/NorthIndianChartScreen';
import OtpScreen from '../screens/AllDemos/OtpScreen';





const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainDemo" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={TabsLayout} />
        
        <Stack.Screen name="DemoHomePage" component={DemoHomePage} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="BeautifulHomeScreen" component={BeautifulHomeScreen} />
        <Stack.Screen name="AnimationsDemoPage" component={AnimationsDemoPage} />
        <Stack.Screen name="BackgroundScreen" component={BackgroundScreen} />
        <Stack.Screen name="SegmentControls" component={SegmentControls} />
        <Stack.Screen name="TabsDemo" component={TabsDemo} />        
        <Stack.Screen name="MainDemo" component={MainDemo} />
        <Stack.Screen name="BlurEffectsScreen" component={BlurEffectsScreen} />
        <Stack.Screen name="DepthEffectsScreen" component={DepthEffectsScreen} />
        <Stack.Screen name="GlassMorphismScreen" component={GlassMorphismScreen} />
        <Stack.Screen name="GlowEffectsScreen" component={GlowEffectsScreen} />
        <Stack.Screen name="MagneticHoverScreen" component={MagneticHoverScreen} />




        <Stack.Screen name="NorthIndianChartScreen" component={NorthIndianChartScreen} />






        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        <Stack.Screen name="MenuScreen" component={MenuScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="AIChartScreen" component={AIChartScreen} />
        <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
        <Stack.Screen name="ThemeScreen" component={ThemeScreen} />
        <Stack.Screen name="LiveSupportScreen" component={LiveSupportScreen} />     
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />   
        <Stack.Screen name="ReportsScreen" component={ReportsScreen} />
        <Stack.Screen name="SubscriptionScreen" component={SubscriptionScreen} />
        <Stack.Screen name="AboutScreen" component={AboutScreen} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen name="HelpSupportScreen" component={HelpSupportScreen} />
        <Stack.Screen name="ShareUsScreen" component={ShareUsScreen} />
        <Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} />



{/* Buttons */}
        <Stack.Screen name="ButtonBaseScreen" component={ButtonBaseScreen} />
        <Stack.Screen name="ButtonFloatingScreen" component={ButtonFloatingScreen} />
        <Stack.Screen name="ButtonGhostScreen" component={ButtonGhostScreen} />
        <Stack.Screen name="ButtonGroupScreen" component={ButtonGroupScreen} />
        <Stack.Screen name="ButtonIconScreen" component={ButtonIconScreen} />
        <Stack.Screen name="ButtonLinkScreen" component={ButtonLinkScreen} />
        <Stack.Screen name="ButtonPrimaryScreen" component={ButtonPrimaryScreen} />
        <Stack.Screen name="ButtonSecondaryScreen" component={ButtonSecondaryScreen} />
        <Stack.Screen name="ButtonToggleScreen" component={ButtonToggleScreen} />





{/* Inputs */}
        <Stack.Screen name="PhoneInputScreen" component={PhoneInputScreen} />
        <Stack.Screen name="CodeInputScreen" component={CodeInputScreen} />







        {/* Final Screens */}
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
