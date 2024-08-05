import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import IIcon from 'react-native-vector-icons/Ionicons';

const TabNavigatorComponent = ({ state, descriptors, navigation }: any) => {
  return (
    <View style={{ flexDirection: 'row', height: 70, borderTopWidth: 1, borderTopColor: 'lightgray' }}>
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused: any = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const iconName = route.name === 'qr-code' ? 'qr-code' : route.name;
        const iconColor = isFocused ? 'blue' : 'gray';
        const iconSize = route.name === 'qr-code' ? 30 : 24;
        const tabStyle: any = route.name === 'qr-code'
          ? { flex: 2, alignItems: 'center', justifyContent: 'center', position: 'relative', bottom: 25 }
          : { flex: 2, alignItems: 'center', justifyContent: 'center' , bottom: 10};

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={{ selected: isFocused }}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={tabStyle}
          >
            {route.name !== 'qr-code' && (
              <>
                <IIcon name={iconName} size={iconSize} color={iconColor} />
                <Text style={{ color: iconColor, fontSize: route.name === 'qr-code' ? 14 : 12 }}>
                  {label}
                </Text>
              </>
            )}
            {route.name === 'qr-code' && (
              <>
                <View style={{
                  position: 'absolute',
                  bottom: -10,
                  backgroundColor: isFocused ? 'lightblue' : '#F5F5F5',
                  borderStyle: 'solid',
                  borderColor: isFocused ? 'lightblue' :'gray',
                  borderStartWidth: 1,
                  borderEndWidth: 1,
                  width: 80,
                  height: 80,
                  borderRadius: 50,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <IIcon name={iconName} size={iconSize} color={isFocused ? 'blue' : 'black'} />
                </View>
              </>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabNavigatorComponent;
