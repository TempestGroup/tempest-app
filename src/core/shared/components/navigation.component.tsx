import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { enableScreens } from 'react-native-screens';
import LoginComponent from '../../../modules/auth/components/login.component.tsx';
import RegisterComponent from '../../../modules/auth/components/register.component.tsx';
import Toast from "react-native-toast-message";
import ILoader from "./loader.component.tsx";
import IToast from "./toast.component.tsx";
import MainComponent from "../../../modules/main/components/main.component.tsx";
import SplashScreen from "./splash-screen.component.tsx";
import { I18nextProvider } from "react-i18next";
import i18n from "../../configs/i18n.config.ts";
import { createStackNavigator } from "@react-navigation/stack";
import IPicker from "./picker.component.tsx";
import LanguageUtil from "../../utils/language.util.ts";
import SettingsComponent from "../../../modules/additionals/components/settings.component.tsx";
import IIconButton from "./icon-button.component.tsx";
import PersonInformationComponent from "../../../modules/additionals/components/person-information.component.tsx";
import storageUtil from "../../utils/storage.util.ts";

enableScreens();

const Stack = createStackNavigator();

const toastConfig = {
  SUCCESS: (props: any) => <IToast type={'SUCCESS'} {...props} />,
  WARNING: (props: any) => <IToast type={'WARNING'} {...props} />,
  ERROR: (props: any) => <IToast type={'ERROR'} {...props} />,
};

const AppNavigator = function () {
  return (
    <I18nextProvider i18n={i18n}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="splash">
          <Stack.Screen
            name="splash"
            component={ SplashScreen }
            options={{ headerShown: false, title: 'SplashScreen' }}
          />
          <Stack.Screen
            name="login"
            component={ LoginComponent }
            options={{ headerShown: false, title: 'Login' }}
          />
          <Stack.Screen
            name="register"
            component={ RegisterComponent }
            options={{ headerShown: false, title: 'Register' }}
          />
          <Stack.Screen
            name="main"
            component={ MainComponent }
            options={{ headerShown: false, title: 'Main' }}
          />
          <Stack.Screen
            name="settings"
            component={ SettingsComponent }
            options={({navigation}) => ({
              headerShown: true,
              title: LanguageUtil.getMessage('app.section.settings'),
              headerLeft: () => (
                <IIconButton
                  onPress={() => navigation.goBack()}
                  color={'black'}
                  size={25}
                  icon={"arrow-back-outline"}
                />
              ), })}
          />
          <Stack.Screen
            name="personInformation"
            component={ PersonInformationComponent }
            options={({navigation, route}) => ({
              headerShown: true,
              title: LanguageUtil.getMessage('app.section.person_information'),
              headerLeft: () => (
                <IIconButton
                  onPress={() => {
                    storageUtil.save(storageUtil.IS_EDITING_MODE_PERSON_INFO, false);
                    navigation.goBack();
                  }}
                  color={'black'}
                  size={25}
                  icon={"arrow-back-outline"}
                />
              )
            })}
          />
        </Stack.Navigator>
        <Toast config={toastConfig} />
        <ILoader />
      </NavigationContainer>
    </I18nextProvider>
  );
}

export default AppNavigator;
