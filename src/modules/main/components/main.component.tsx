import React from "react";
import HomeComponent from "./tabs/home.component.tsx";
import MenuComponent from "./tabs/menu.component.tsx";
import ProfileComponent from "./tabs/profile.component.tsx";
import ChatComponent from "./tabs/chat.component.tsx";
import QRComponent from "./tabs/qr.component.tsx";
import TabNavigatorComponent from "../../../core/shared/components/tab-natigator.component.tsx";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";

const Tab = createBottomTabNavigator();

const MainComponent = () => {
  const { t } = useTranslation();
  return (
    <Tab.Navigator initialRouteName="home" tabBar={(props: any) => <TabNavigatorComponent {...props} />}>
      <Tab.Screen
        name={ 'home' }
        options={{
          title: t('app.nav.home'),
          headerShown: false
        }}
        component={ HomeComponent }
      />
      <Tab.Screen
        name={ 'menu' }
        options={{
          title: t('app.nav.menu'),
          headerShown: true
        }}
        component={ MenuComponent }
      />
      <Tab.Screen
        name={ 'qr-code' }
        options={{
          headerShown: false
        }}
        component={ QRComponent }
      />
      <Tab.Screen
        name={ 'chatbubbles' }
        options={{
          title: t('app.nav.chats'),
          headerShown: true
        }}
        component={ ChatComponent }
      />
      <Tab.Screen
        name={ 'person' }
        options={{
          title: t('app.nav.profile'),
          headerShown: false
        }}
        component={ ProfileComponent }
      />
    </Tab.Navigator>
  );
}

export default MainComponent;
