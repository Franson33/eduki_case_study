import React, {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParams, routeNames} from '../../navigator';
import {theme} from '../../theme/theme';

type IMainScreenProps = NativeStackScreenProps<RootStackParams, 'Home'>;

export const MainScreen: FC<IMainScreenProps> = ({route, navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Put your code here...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: theme.small,
  },
});
