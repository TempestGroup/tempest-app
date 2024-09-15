import React from 'react';
import { Image } from 'react-native';
// @ts-ignore
import { APIURL } from '@env';

export const IProfileImage = ({ personID = 0, height = 50, width = 50, radius = 0 }: any) => {
  const imageSource = personID === 0
    ? require('../../../../assets/logo/userDefLogo.png')
    : { uri: `${APIURL}/api/v1/auth/images/${personID}` };
  return (
    <Image
      source={ imageSource }
      style={{ width: width, height: height, borderRadius: radius }}
    />
  );
}

export const IUriImage = ({ uri = undefined, height = 50, width = 50, radius = 0 }: any) => {
  return (
    <Image
      source={{ uri: uri }}
      style={{ width: width, height: height, borderRadius: radius }}
    />
  );
}

export const ISrcImage = ({ src, height = 50, width = 50, radius = 0 }: any) => {
  return (
    <Image
      source={src}
      style={{ width: width, height: height, borderRadius: radius }}
    />
  );
}
