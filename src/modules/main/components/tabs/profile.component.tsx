import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import authService from "../../../../core/services/auth.service.ts";
import blockUiUtil from "../../../../core/utils/block-ui.util.ts";
import StringUtil from "../../../../core/utils/string.util.ts";
import Person from "../../dtos/person.dto.ts";
import Card from "../../../../core/shared/components/card.component.tsx";
import { SizedBox } from "../../../../core/shared/shared.styles.tsx";
import { CommonActions, useFocusEffect } from "@react-navigation/native";
import { IProfileImage } from "../../../../core/shared/components/image.component.tsx";
import storageUtil from "../../../../core/utils/storage.util.ts";
import { useTranslation } from "react-i18next";
import LoadingBar from "../../../../core/shared/components/loading.component.tsx";


const ProfileComponent = ({ navigation }: any) => {
  const [person, setPerson] = useState(new Person());
  const { t } = useTranslation();

  const fetchPerson = () => {
    blockUiUtil.show();
    authService.info().then(response => {
      setPerson(response.person);
      blockUiUtil.hide();
    });
  }

  useFocusEffect(
    useCallback(() => {
      fetchPerson();
    }, [])
  );

  const handleLogout = () => {
    storageUtil.clear();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'login' },
        ],
      })
    );
  }

  return (
    <SafeAreaView>
      <View style={ styles.profileImage }>
        {
          (person.id == undefined || person.id == null || person.id == 0) ?
            <LoadingBar /> :
            <IProfileImage personID={person.id} width={200} height={200} radius={200} />
        }
      </View>
      <View style={ styles.name }>
        <Text style={ styles.nameText }>{ person.name }</Text>
      </View>
      <Card>
        <Text style={ styles.label }>{ t('app.label.email') }</Text>
        <Text style={ styles.data }>{ person.email }</Text>
        <SizedBox/>
        <Text style={ styles.label }>{ t('app.label.roles') }</Text>
        <Text style={ styles.data }>{ StringUtil.join(person.roles, ', ') }</Text>
      </Card>
      <TouchableOpacity onPress={ () => {navigation.navigate('personInformation'); storageUtil.save('test', true) }}>
        <Card>
          <Text style={ styles.section }>{ t('app.section.person_information') }</Text>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity onPress={ () => navigation.navigate('settings') }>
        <Card>
          <Text style={ styles.section }>{ t('app.section.settings') }</Text>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout}>
        <Card style={{backgroundColor: 'red', alignItems: 'center'}}>
          <Text style={ styles.logout }>{ t('app.section.logout') }</Text>
        </Card>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  name: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: 20,
    marginEnd: 20,
    marginBottom: 20
  },
  nameText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333'
  },
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
