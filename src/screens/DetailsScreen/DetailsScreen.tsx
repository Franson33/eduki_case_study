import React, {FC} from 'react';
import {View, Image, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParams} from '../../navigator';
import {styles} from './styles';
import {removeHtml} from '../../helpers';

type DetailsScreenProps = NativeStackScreenProps<RootStackParams, 'Details'>;

export const DetailsScreen: FC<DetailsScreenProps> = ({route}) => {
  const item = route?.params?.item;

  return (
    <View style={styles.container}>
      <Image
        style={styles.itemImage}
        source={{uri: item?.firstPreviewImage?.watermarked}}
      />
      <Text style={styles.itemText}>{removeHtml(item?.title ?? '')}</Text>
      <Text style={styles.itemText}>{item?.author?.details?.publicName}</Text>
      <Text style={styles.itemText}>{item?.price}</Text>
    </View>
  );
};
