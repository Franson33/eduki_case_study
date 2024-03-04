import React, {FC, useState} from 'react';
import {View, StyleSheet, TextInput, FlatList, Text, Image} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParams} from '../../navigator';
import {theme} from '../../theme/theme';
import {getItems} from '../../api';
import {removeHtml} from '../../helpers';

type MainScreenProps = NativeStackScreenProps<RootStackParams, 'Home'>;

export const MainScreen: FC<MainScreenProps> = ({}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [list, setList] = useState();

  const changeTextHandler = async (newValue: string) => {
    setSearchTerm(newValue);

    const res = await getItems(searchTerm, 1);
    setList(res.items.materials);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search items..."
        value={searchTerm}
        onChangeText={changeTextHandler}
        style={styles.input}
      />
      <FlatList
        data={list}
        renderItem={({item}) => {
          return (
            <View style={{marginVertical: 10}}>
              <Image
                style={{height: 250}}
                source={{uri: item.firstPreviewImage.watermarked}}
              />
              <Text>{removeHtml(item?.title)}</Text>
              <Text>{item?.author?.details?.publicName}</Text>
              <Text>{item?.price}</Text>
            </View>
          );
        }}
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
