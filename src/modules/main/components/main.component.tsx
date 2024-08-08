import React from 'react';
import HomeComponent from "./tabs/home.component.tsx";
import MenuComponent from "./tabs/menu.component.tsx";
import ProfileComponent from "./tabs/profile.component.tsx";
import ChatComponent from "./tabs/chat.component.tsx";
import QRComponent from "./tabs/qr.component.tsx";
import TabNavigatorComponent from "../../../core/shared/components/tab-natigator.component.tsx";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IPicker from "../../../core/shared/components/picker.component.tsx";
import LanguageUtil from "../../../core/utils/language.util.ts";
import ISelect from "../../../core/shared/components/select.component.tsx";

const Tab = createBottomTabNavigator();

const MainComponent = () => {
  return (
    <Tab.Navigator initialRouteName="home" tabBar={(props: any) => <TabNavigatorComponent {...props} />}>
      <Tab.Screen
        name={ 'home' }
        options={{
          title: LanguageUtil.getMessage('app.nav.home'),
          headerShown: false
        }}
        component={ HomeComponent }
      />
      <Tab.Screen
        name={ 'menu' }
        options={{
          title: LanguageUtil.getMessage('app.nav.menu'),
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
          title: LanguageUtil.getMessage('app.nav.chats'),
          headerShown: true
        }}
        component={ ChatComponent }
      />
      <Tab.Screen
        name={ 'person' }
        options={{
          title: LanguageUtil.getMessage('app.nav.profile'),
          headerShown: false
        }}
        component={ ProfileComponent }
      />
    </Tab.Navigator>
  );
}

export default MainComponent;
