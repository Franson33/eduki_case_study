import React, {FC, useState} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParams} from '../../navigator';
import {theme} from '../../theme/theme';

type MainScreenProps = NativeStackScreenProps<RootStackParams, 'Home'>;

export const MainScreen: FC<MainScreenProps> = ({}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const changeTextHandler = (newValue: string) => {
    setSearchTerm(newValue);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search items..."
        value={searchTerm}
        onChangeText={changeTextHandler}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: theme.medium,
  },
  input: {
    height: theme.large,
  },
});
