import React, {JSX} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import {MainScreen, DetailsScreen} from './screens';
import {RootStackParams, routeNames} from './navigator/routs';

const RootStack = createNativeStackNavigator<RootStackParams>();

const queryClient = new QueryClient();

export const App = (): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <RootStack.Navigator initialRouteName={routeNames.HOME}>
            <RootStack.Screen name={routeNames.HOME} component={MainScreen} />
            <RootStack.Screen
              name={routeNames.DETAILS}
              component={DetailsScreen}
            />
          </RootStack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
