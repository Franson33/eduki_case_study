import {StyleSheet} from 'react-native';
import {theme} from '../../theme/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: theme.medium,
  },
  itemImage: {
    height: 250,
    marginVertical: theme.miniscule,
  },
  itemText: {
    marginVertical: theme.miniscule,
  },
});
