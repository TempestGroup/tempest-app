import React from 'react';
import HomeComponent from "./tabs/home.component.tsx";
import MenuComponent from "./tabs/menu.component.tsx";
import ProfileComponent from "./tabs/profile.component.tsx";
import ChatComponent from "./tabs/chat.component.tsx";
import QRComponent from "./tabs/qr.component.tsx";
import TabNavigatorComponent from "../../../core/shared/components/tab-natigator.component.tsx";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const MainComponent = () => {
  return (
    <Tab.Navigator initialRouteName="Home" tabBar={(props: any) => <TabNavigatorComponent {...props} />}>
      <Tab.Screen
        name={ 'home' }
        options={{ title: 'Home' }}
        component={ HomeComponent }
      />
      <Tab.Screen
        name={ 'menu' }
        options={{ title: 'Menu' }}
        component={ MenuComponent }
      />
      <Tab.Screen
        name={ 'qr-code' }
        options={{ title: 'QR' }}
        component={ QRComponent }
      />
      <Tab.Screen
        name={ 'chatbubbles' }
        options={{ title: 'Chat' }}
        component={ ChatComponent }
      />
      <Tab.Screen
        name={ 'person' }
        options={{ title: 'Profile' }}
        component={ ProfileComponent }
      />
    </Tab.Navigator>
  );
}

export default MainComponent;
