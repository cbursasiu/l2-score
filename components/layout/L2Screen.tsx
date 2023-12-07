import * as React from 'react';
import {ReactNode} from 'react';
import {
  SafeAreaView,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from '../../node_modules/react-native';
import {useTheme} from 'react-native-paper';
import {Colors} from '../../styles/colors';

interface ScreenProps {
  style?: StyleProp<ViewStyle>;
  noHorizontalMargin?: boolean;
  children: ReactNode;
}

const L2Screen: React.FC<ScreenProps> = ScreenProps => {
  const {style, children, noHorizontalMargin: noMargin = false} = ScreenProps;
  console.log('render L2Screen 2 noMargin:', noMargin);
  return (
    <SafeAreaView
      style={[
        styles.container,
        style,
        {
          backgroundColor: Colors.screenBackground,
        },
      ]}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    paddingTop: 0,
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
});

export default L2Screen;
