import React, {FC} from 'react';
import {View, TextInput, FlatList} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParams} from '../../navigator';
import {styles} from './styles';
import {useMainScreen} from './useMainScreen';

type MainScreenProps = NativeStackScreenProps<RootStackParams, 'Home'>;

export const MainScreen: FC<MainScreenProps> = ({}) => {
  const {
    items,
    searchTerm,
    setSearchTerm,
    onEndReached,
    footerItem,
    renderItem,
  } = useMainScreen();

  const changeTextHandler = async (newValue: string) => {
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
      <FlashList
        data={items}
        renderItem={renderItem}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.2}
        ListFooterComponent={footerItem}
        estimatedItemSize={300}
      />
    </View>
  );
};
