import React, {useCallback, useState} from 'react';
import {ActivityIndicator, Image, Text, TouchableOpacity} from 'react-native';
import {useInfiniteQuery} from '@tanstack/react-query';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {routeNames, RootStackParams} from '../../navigator';
import {getItems} from '../../api';
import {removeHtml} from '../../helpers';
import {styles} from './styles';

export const useMainScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const {data, isFetching, fetchNextPage} = useInfiniteQuery({
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

  const pressHandler = item => {
    navigation.navigate(routeNames.DETAILS, {item});
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

  const renderItem = useCallback(({item}) => {
    return (
      <TouchableOpacity
        style={styles.renderItemContainer}
        onPress={() => pressHandler(item)}>
        <Image
          style={styles.renderItemImage}
          source={{uri: item?.firstPreviewImage?.watermarked}}
        />
        <Text style={styles.renderItemText}>
          {removeHtml(item?.title ?? '')}
        </Text>
        <Text style={styles.renderItemText}>
          {item?.author?.details?.publicName}
        </Text>
        <Text style={styles.renderItemText}>{item?.price}</Text>
      </TouchableOpacity>
    );
  }, []);

  return {
    items: data?.pages?.flatMap(page => page?.items?.materials || []),
    searchTerm,
    setSearchTerm,
    onEndReached,
    footerItem,
    renderItem,
  };
};