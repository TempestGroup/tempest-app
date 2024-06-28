import React, { useState } from "react";
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlexView, HeaderText } from "../../../core/shared/shared.styles.tsx";
import RegisterRequest from "../dtos/register-request.dto.ts";


const RegisterComponent = () => {

  const [request, setRequest] = useState(new RegisterRequest());

  return (
    <SafeAreaView>
     <View>
      <FlexView>
        <HeaderText>Login page</HeaderText>
      </FlexView>
      <FlexView>

      </FlexView>
     </View>
    </SafeAreaView>
  );
}

export default RegisterComponent;
