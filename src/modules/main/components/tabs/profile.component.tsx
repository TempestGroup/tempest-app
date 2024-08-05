import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import authService from "../../../../core/services/auth.service.ts";
import blockUiUtil from "../../../../core/utils/block-ui.util.ts";
import StringUtil from "../../../../core/utils/string.util.ts";
import PersonDto from "../../dtos/person.dto.ts";

const ProfileComponent = () => {
  const [person, setPerson] = useState(new PersonDto());

  useEffect(() => {
    const fetchPerson = async () => {
      blockUiUtil.show();
      authService.info().then(response => {
        setPerson(response.person);
        blockUiUtil.hide();
      });
    }
    fetchPerson();
  }, []);

  return (
    <View>
      <Text>{ 'Email: ' + person.email }</Text>
      <Text>{ 'Roles: ' + StringUtil.join(person.roles, ', ') }</Text>
    </View>
  );
}

export default ProfileComponent;
