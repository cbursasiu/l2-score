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

function App(): JSX.Element {
  const colorScheme = useColorScheme();

  const paperTheme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;

  return (
    <PaperProvider theme={MD3DarkTheme}>
      <GestureHandlerRootView style={styles.mainContainer}>
        <KeyboardProvider>
          <NavigationContainerWrapper />
        </KeyboardProvider>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
});

export default App;
