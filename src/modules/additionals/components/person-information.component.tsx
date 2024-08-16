import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ITextField from "../../../core/shared/components/text-field.component.tsx";
import Card from "../../../core/shared/components/card.component.tsx";
import { PersonInfo } from "../dtos/person-info.dto.ts";
import FloatButton from "../../../core/shared/components/float-button.component.tsx";
import { SizedBox } from "../../../core/shared/shared.styles.tsx";
import blockUiUtil from "../../../core/utils/block-ui.util.ts";
import personService from "../../../core/services/person.service.ts";
import toastUtil from "../../../core/utils/toast.util.ts";
import { useTranslation } from "react-i18next";

const PersonInformationComponent = () => {
  const [isEditing, setEditing] = useState(false);
  const [request, setRequest] = useState(new PersonInfo());
  const { t } = useTranslation();

  useEffect(() => {
    const getPersonInfo = () => {
      blockUiUtil.show();
      personService.getPersonInformation().then(response => {
        setRequest(response.information);
        blockUiUtil.hide();
      });
    }
    getPersonInfo();
  }, []);

  const handleSubmit = () => {
    blockUiUtil.show();
    personService.savePersonInformation(request).then(response => {
      toastUtil.showToast(response.message);
      blockUiUtil.hide();
    });
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Card>

          <Text style={ styles.label }>{ t('app.label.name.cyrillic') }</Text>
          <ITextField editable={isEditing}  width={'98%'} textContentType={'text'} value={ request.nameCyrillic }
                      onChangeText={(nameCyrillic: string) => setRequest({ ...request, nameCyrillic })}/>

          <Text style={ styles.label }>{ t('app.label.name.latin') }</Text>
          <ITextField editable={isEditing}  width={'98%'} textContentType={'text'} value={ request.nameLatin }
                      onChangeText={(nameLatin: string) => setRequest({ ...request, nameLatin })}/>

          <Text style={ styles.label }>{ t('app.label.lastname.cyrillic') }</Text>
          <ITextField editable={isEditing}  width={'98%'} textContentType={'text'} value={ request.lastnameCyrillic }
                      onChangeText={(lastnameCyrillic: string) => setRequest({ ...request, lastnameCyrillic })}/>

          <Text style={ styles.label }>{ t('app.label.lastname.latin') }</Text>
          <ITextField editable={isEditing}  width={'98%'} textContentType={'text'} value={ request.lastnameLatin }
                      onChangeText={(lastnameLatin: string) => setRequest({ ...request, lastnameLatin })}/>

          <Text style={ styles.label }>{ t('app.label.phone') }</Text>
          <ITextField editable={isEditing}  width={'98%'} textContentType={'text'} value={ request.phoneNumber }
                      onChangeText={(phoneNumber: string) => setRequest({...request, phoneNumber })}/>

          {/*<Text style={ styles.label }>{ t('app.label.nationality') }</Text>*/}
          {/*<ISelect selectedValue={request.nationalityID}/>*/}

          {/*<Text style={ styles.label }>{ t('app.label.city') }</Text>*/}
          {/*<ISelect selectedValue={request.nationalityID}/>*/}
        </Card>
        <SizedBox line={2}/>
      </ScrollView>
      <FloatButton icon={isEditing ? 'checkmark' : 'pencil'} color={'white'}
       onPress={() => {
        if (isEditing) {
          handleSubmit();
        }
        setEditing(!isEditing);
       }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default PersonInformationComponent;
