/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {MD3DarkTheme, MD3LightTheme, PaperProvider} from 'react-native-paper';
import NavigationContainerWrapper from './components/navigation/NavigationContainerWrapper';
import {StyleSheet, useColorScheme} from 'react-native';
import {
  GameModel,
  PlayerModel,
  RoundDataModel,
  UserModel,
} from './realmOM/realmModels';
import {RealmProvider, createRealmContext} from '@realm/react';

function App(): JSX.Element {
  const colorScheme = useColorScheme();

  // const realmConfig: Realm.Configuration = {
  //   schema: [UserModel],
  // };

  // // Create a realm context
  // const {RealmProvider, useRealm, useObject, useQuery} =
  //   createRealmContext(realmConfig);

  return (
    <RealmProvider schema={[UserModel, GameModel, PlayerModel, RoundDataModel]}>
      <PaperProvider theme={MD3DarkTheme}>
        <GestureHandlerRootView style={styles.mainContainer}>
          <KeyboardProvider>
            <NavigationContainerWrapper />
          </KeyboardProvider>
        </GestureHandlerRootView>
      </PaperProvider>
    </RealmProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
});

export default App;
