import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlexView, HeaderText, SizedBox } from "../../../core/shared/shared.styles.tsx";
import RegisterRequest from "../dtos/register-request.dto.ts";
import ITextField from "../../../core/shared/components/text-field.component.tsx";
import IButton from "../../../core/shared/components/button.component.tsx";
import blockUiUtil from "../../../core/utils/block-ui.util.ts";
import authService from "../../../core/services/auth.service.ts";
import enums from "../../../core/enums/enums.ts";
import toastUtil from "../../../core/utils/toast.util.ts";
import RestUtil from "../../../core/utils/rest.util.ts";
import FileUtil from "../../../core/utils/file.util.ts";
import * as ImagePicker from "react-native-image-picker";

const RegisterComponent = ({ navigation }: any) => {

  const [request, setRequest] = useState(new RegisterRequest());

  const handleImagePicker = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, async (response: any) => {
      if (response.didCancel) {
        return null;
      } else if (response.error) {
        return null;
      } else if (response.customButton) {
        return null;
      } else {
        if (response.assets && response.assets.length > 0) {
          const source =  {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName
          };
          setRequest({ ...request, image: source });
        }
      }
    });
  };

  const handleSubmit = async () => {
    blockUiUtil.show();
    authService.register(RestUtil.getFormData(request)).then(response => {
      if (response.message.status == enums.MessageStatus.ERROR) {
        toastUtil.showToast(response.message);
      } else {
        toastUtil.showToast(response.message);
        navigation.navigate('login');
      }
      blockUiUtil.hide();
    });
  }

  return (
    <SafeAreaView>
     <View>
      <FlexView>
        <HeaderText>Register page</HeaderText>
        <SizedBox line={4}/>
        <ITextField placeholder={'Email'} textContentType={'email'} value={request.email}
                    onChangeText={(email: string) => setRequest({ ...request, email })}/>
        <ITextField placeholder={'Password'} textContentType={'password'} value={request.password}
                    onChangeText={(password: string) => setRequest({ ...request, password })} />
        <IButton title="Select Image" onPress={handleImagePicker} />
        <SizedBox line={1}/>
        <IButton title="Sign up" onPress={handleSubmit}/>
        <SizedBox line={2}/>
        <TouchableOpacity onPress={() => navigation.navigate('login')}><Text>Already have an account?</Text></TouchableOpacity>
      </FlexView>
     </View>
    </SafeAreaView>
  );
}

export default RegisterComponent;
