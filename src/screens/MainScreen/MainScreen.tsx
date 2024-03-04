import React, {FC, useCallback, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParams} from '../../navigator';
import {theme} from '../../theme/theme';
import {getItems} from '../../api';
import {removeHtml} from '../../helpers';
import {useInfiniteQuery} from '@tanstack/react-query';

type MainScreenProps = NativeStackScreenProps<RootStackParams, 'Home'>;

export const MainScreen: FC<MainScreenProps> = ({}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const {data, isLoading, isFetching, isError, fetchNextPage} =
    useInfiniteQuery({
      queryKey: ['items', searchTerm],
      queryFn: ({pageParam}) => getItems(searchTerm, pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return allPages?.length + 1;
      },
    });

  const isPagesNotEmpty = data?.pages?.length > 0;

  const onEndReached = () => {
    const isLastPage = data?.pages?.[data?.pages?.length - 1]?.length === 0;
    if (!isFetching && !isLastPage) {
      fetchNextPage();
    }
  };

  const footerItem = useCallback(
    () => (
      <>
        {isPagesNotEmpty && isFetching ? (
          <ActivityIndicator size="small" />
        ) : null}
      </>
    ),
    [isFetching, isPagesNotEmpty],
  );

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
      <FlatList
        data={data?.pages?.flatMap(page => page?.items?.materials || [])}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={{marginVertical: theme.small}}
              onPress={() => alert('Yo')}>
              <Image
                style={{height: 250, marginVertical: theme.miniscule}}
                source={{uri: item?.firstPreviewImage?.watermarked}}
              />
              <Text style={{marginVertical: theme.miniscule}}>
                {removeHtml(item?.title ?? '')}
              </Text>
              <Text style={{marginVertical: theme.miniscule}}>
                {item?.author?.details?.publicName}
              </Text>
              <Text style={{marginVertical: theme.miniscule}}>
                {item?.price}
              </Text>
            </TouchableOpacity>
          );
        }}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.2}
        ListFooterComponent={footerItem}
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
