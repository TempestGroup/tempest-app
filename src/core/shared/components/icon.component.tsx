import React from "react";
import IonIcon from "react-native-vector-icons/Ionicons";

const IIcon = ({ name, color, size, ...rest }: any) => {
  return (<IonIcon name={name} size={size} color={color} {...rest}/>)
}

export default IIcon;
