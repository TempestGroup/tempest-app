import React from 'react';
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import HomeComponent from "./tabs/home.component.tsx";
import IIcon from "../../../core/shared/components/icon.component.tsx";

const tabs = new Map<string, string>([
  ['home', 'home'],
  ['chat', 'chat'],
  ['profile', 'profile']
]);

const Tab = createMaterialBottomTabNavigator();

const MainComponent = () => {
  return (
    <Tab.Navigator initialRouteName="Home" activeColor="blue" inactiveColor="gray" barStyle={{ backgroundColor: 'white' }}
     screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color }) => {
        return <IIcon name={`${tabs.get(route.name)}`} size={24} color={color} />;
      },
    })}>
      <Tab.Screen name={ 'home' } options={{ title: 'Home' }} component={ HomeComponent }/>
    </Tab.Navigator>
  );
}

export default MainComponent;
