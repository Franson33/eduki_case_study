import {StyleSheet} from 'react-native';
import {theme} from '../../theme/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: theme.medium,
  },
  input: {
    height: theme.large,
  },
  renderItemContainer: {
    marginVertical: theme.small,
  },
  renderItemImage: {
    height: 250,
    marginVertical: theme.miniscule,
  },
  renderItemText: {
    marginVertical: theme.miniscule,
  },
});
