import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import IIcon from "./icon.component.tsx";

const ITextField = ({ placeholder, value = '', onChangeText, secureTextEntry = false, keyboardType, width = '150%', maxLength, ...rest }: any) => {
  const [showPassword, setShowPassword] = useState(false);
  return(
    <View style={styles.container}>
      <TextInput style={{...styles.input, width: width}} onChangeText={onChangeText}
                      value={value}
                      placeholder={placeholder}
                      secureTextEntry={ secureTextEntry || (rest.textContentType == 'password' && !showPassword) }
                      keyboardType={keyboardType}
                      maxLength={maxLength} {...rest} />
      {
        rest.textContentType == 'password'
        ? (<TouchableOpacity style={styles.iconContainer} onPress={() => setShowPassword(!showPassword)}>
            <IIcon name={showPassword ? 'eye-off' : 'eye'} size={24}/>
          </TouchableOpacity>)
        : (<></>)
      }
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    margin: 5,
    fontSize: 18
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
  },
});

export default ITextField;
