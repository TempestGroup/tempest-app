import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import authService from "../../../../core/services/auth.service.ts";
import blockUiUtil from "../../../../core/utils/block-ui.util.ts";
import StringUtil from "../../../../core/utils/string.util.ts";
import Person from "../../dtos/person.dto.ts";
import LanguageUtil from "../../../../core/utils/language.util.ts";
import Card from "../../../../core/shared/components/card.component.tsx";
import { SizedBox } from "../../../../core/shared/shared.styles.tsx";

const ProfileComponent = ({ navigation }: any) => {
  const [person, setPerson] = useState(new Person());

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
      <Card>
        <Text style={ styles.label }>{ LanguageUtil.getMessage('app.label.email') }</Text>
        <Text style={ styles.data }>{ person.email }</Text>
      </Card>
      <Card>
        <Text style={ styles.label }>{ LanguageUtil.getMessage('app.label.roles') }</Text>
        <Text style={ styles.data }>{ StringUtil.join(person.roles, ', ') }</Text>
      </Card>
      <SizedBox line={2}/>
      <TouchableOpacity onPress={ () => navigation.navigate('settings') }>
        <Card>
          <Text style={ styles.section }>{ LanguageUtil.getMessage('app.section.settings') }</Text>
        </Card>
      </TouchableOpacity>
      <SizedBox line={2}/>
      <TouchableOpacity onPress={ () => navigation.navigate('settings') }>
        <Card style={{backgroundColor: 'red', alignItems: 'center'}}>
          <Text style={ styles.logout }>{ LanguageUtil.getMessage('app.section.logout') }</Text>
        </Card>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 8
  },
  data: {
    fontSize: 16,
    color: '#333'
  },
  section: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold'
  },
  logout: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  }
});

export default ProfileComponent;
