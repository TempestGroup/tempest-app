import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ITextField from "../../../core/shared/components/text-field.component.tsx";
import Card from "../../../core/shared/components/card.component.tsx";
import LanguageUtil from "../../../core/utils/language.util.ts";
import { PersonInfo } from "../dtos/person-info.dto.ts";
import FloatButton from "../../../core/shared/components/float-button.component.tsx";
import { SizedBox } from "../../../core/shared/shared.styles.tsx";

const PersonInformationComponent = () => {
  const [isEditing, setEditing] = useState(false);
  const [request, setRequest] = useState(new PersonInfo());
  const handleSubmit = () => {

  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Card>
          {/* IIN */}
          <Text style={ styles.label }>{ LanguageUtil.getMessage('app.label.email') }</Text>

          <Text style={ styles.label }>{ LanguageUtil.getMessage('app.label.email') }</Text>
          <ITextField editable={isEditing}  width={'98%'} placeholder={'IIN'}
                      textContentType={'text'} value={request.name}
                      onChangeText={(name: string) => setRequest({...request, name: name})}/>
          {/* Name */}
          <Text style={ styles.label }>{ LanguageUtil.getMessage('app.label.email') }</Text>
          <ITextField editable={isEditing}  width={'98%'} placeholder={'Name'}
                      textContentType={'text'} value={request.name}
                      onChangeText={(name: string) => setRequest({...request, name: name})}/>
          <Text style={ styles.label }>{ LanguageUtil.getMessage('app.label.email') }</Text>
          <ITextField editable={isEditing}  width={'98%'} placeholder={'Name (latin)'}
                      textContentType={'text'} value={request.name}
                      onChangeText={(name: string) => setRequest({...request, name: name})}/>
          {/* Lastname */}
          <Text style={ styles.label }>{ LanguageUtil.getMessage('app.label.email') }</Text>
          <ITextField editable={isEditing}  width={'98%'} placeholder={'Name'}
                      textContentType={'text'} value={request.name}
                      onChangeText={(name: string) => setRequest({...request, name: name})}/>
          <Text style={ styles.label }>{ LanguageUtil.getMessage('app.label.email') }</Text>
          <ITextField editable={isEditing}  width={'98%'} placeholder={'Name (latin)'}
                      textContentType={'text'} value={request.name}
                      onChangeText={(name: string) => setRequest({...request, name: name})}/>
          {/* Surname */}
          <Text style={ styles.label }>{ LanguageUtil.getMessage('app.label.email') }</Text>
          <ITextField editable={isEditing}  width={'98%'} placeholder={'Name'}
                      textContentType={'text'} value={request.name}
                      onChangeText={(name: string) => setRequest({...request, name: name})}/>
          <Text style={ styles.label }>{ LanguageUtil.getMessage('app.label.email') }</Text>
          <ITextField editable={isEditing}  width={'98%'} placeholder={'Name (latin)'}
                      textContentType={'text'} value={request.name}
                      onChangeText={(name: string) => setRequest({...request, name: name})}/>

          {/* Surname */}

          <Text style={ styles.label }>{ LanguageUtil.getMessage('app.label.email') }</Text>
          <ITextField editable={isEditing}  width={'98%'} placeholder={'Name'}
                      textContentType={'text'} value={request.name}
                      onChangeText={(name: string) => setRequest({...request, name: name})}/>
          <Text style={ styles.label }>{ LanguageUtil.getMessage('app.label.email') }</Text>
          <ITextField editable={isEditing}  width={'98%'} placeholder={'Name (latin)'}
                      textContentType={'text'} value={request.name}
                      onChangeText={(name: string) => setRequest({...request, name: name})}/>
        </Card>
        <SizedBox line={2}/>
      </ScrollView>
      <FloatButton icon={isEditing ? 'checkmark' : 'pencil'} color={'white'}
       onPress={() => {
        if (isEditing) {}
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
