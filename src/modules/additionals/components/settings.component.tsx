import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Card from "../../../core/shared/components/card.component.tsx";
import LanguageUtil from "../../../core/utils/language.util.ts";
import ISelect from "../../../core/shared/components/select.component.tsx";
import { useTranslation } from "react-i18next";

const SettingsComponent = () => {
  const { t, i18n } = useTranslation();
  const changeCurrentLanguage = (language: string) => {
    i18n.changeLanguage(language);
    LanguageUtil.setCurrentLanguage(language);
  }

  return (
    <View>
      <Card style={ styles.card }>
        <Text style={styles.label}>{ t('app.label.language') }</Text>
        <ISelect translate={true}
          selectedValue={ LanguageUtil.getCurrentLanguage() }
          list={ LanguageUtil.getLanguages() } bindID={'value'} bindLabel={'label'}
          onValueChange={ (language: string) => changeCurrentLanguage(language) }/>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  label: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold'
  },
  select: {
    borderWidth: 1,
    borderStyle: 'solid'
  },
  data: {
    fontSize: 16,
    color: '#333'
  },
});

export default SettingsComponent;
