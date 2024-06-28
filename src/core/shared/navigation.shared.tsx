import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { enableScreens } from 'react-native-screens';
import LoginComponent from '../../modules/auth/components/login.component';
import RegisterComponent from '../../modules/auth/components/register.component';
import Toast from "react-native-toast-message";
import ILoader from "./components/loader.component.tsx";
import IToast from "./components/toast.component.tsx";
import MainComponent from "../../modules/main/components/main.component.tsx";

enableScreens();

const Stack = createNativeStackNavigator();

const toastConfig = {
  SUCCESS: (props: any) => <IToast type={'SUCCESS'} {...props} />,
  WARNING: (props: any) => <IToast type={'WARNING'} {...props} />,
  ERROR: (props: any) => <IToast type={'ERROR'} {...props} />,
};

const AppNavigator = function () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          name="login"
          component={LoginComponent}
          options={{ headerShown: false, title: 'Login' }}
        />
        <Stack.Screen
          name="register"
          component={RegisterComponent}
          options={{ headerShown: false, title: 'Register' }}
        />
        <Stack.Screen
          name="main"
          component={MainComponent}
          options={{ headerShown: false, title: 'TempestApp' }}
        />
      </Stack.Navigator>
      <Toast config={toastConfig} />
      <ILoader />
    </NavigationContainer>
  );
}

export default AppNavigator;
