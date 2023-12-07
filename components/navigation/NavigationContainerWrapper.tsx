import {adaptNavigationTheme, useTheme} from 'react-native-paper';
import {CommonActions, NavigationContainer} from '@react-navigation/native';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import {navigationRef} from '../../services/navigationServices';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {useStore} from '../../stores/store';
import NavigationBackButton from './NavigationBackButton';
import HomeScreen from '../../screens/HomeScreen';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomNavigation} from 'react-native-paper';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CurrentGameScreen from '../../screens/CurrentGameScreen';
import WelcomeAnimationScreen from '../../screens/WelcomeAnimationScreen';
import GamesScreen from '../../screens/GamesScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import {FontAwesomeIcon} from '../../node_modules/@fortawesome/react-native-fontawesome';
import {
  faGamepad,
  faHouse,
  faScrewdriverWrench,
} from '../../node_modules/@fortawesome/free-solid-svg-icons';
import {Colors} from '../../styles/colors';
import L2Text from '../L2Text';
import {View} from '../../node_modules/react-native';
import {IconProp} from '../../node_modules/@fortawesome/fontawesome-svg-core';
import {Easing} from 'react-native-reanimated';

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

export type AppNavigatorParamsList = {
  WelcomeScreen: undefined;
};

export enum Routes {
  WelcomeAnimationScreen = 'WelcomeAnimationScreen',
  HomeScreen = 'HomeScreen',
  GamesScreen = 'GamesScreen',
  SettingsScreen = 'SettingsScreen',
  CurrentGameScreen = 'CurrentGameScreen',
  TabNavigationContainerWrapper = 'TabNavigationContainerWrapper',
}

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const TabNavigationContainerWrapper: React.FC = () => {
  const tabIcon = (focused: boolean, icon: IconProp) => {
    return (
      <View
        style={
          focused && {
            backgroundColor: Colors.secondaryContainerColor,
            // paddingHorizontal: 20,
            // paddingVertical: 5,
            // borderRadius: 100,
          }
        }>
        <FontAwesomeIcon
          icon={icon}
          color={focused ? Colors.primaryColor : Colors.primaryTextColor}
          size={20}
        />
      </View>
    );
  };

  // const tabLabel = (label: string) => {
  //   return (
  //     <L2Text variant="bodySmall" style={{color: Colors.textColor}}>
  //       {label}
  //     </L2Text>
  //   );
  // };

  const tabOptions = (label: string, icon: IconProp) => {
    return {
      title: label,
      header: () => <></>,
      tabBarLabel: () => label,
      tabBarIcon: (params: {focused: boolean; color: string; size: number}) => {
        return tabIcon(params.focused, icon);
      },
    };
  };

  return (
    <Tab.Navigator
      initialRouteName={Routes.HomeScreen}
      // screenOptions={{
      //   tabBarStyle: {
      //     backgroundColor: Colors.containerColor,
      //     paddingTop: 5,
      //   },
      // }}
      // screenOptions={{
      //   headerShown: false,
      // }}
      tabBar={({navigation, state, descriptors, insets}) => (
        <BottomNavigation.Bar
          shifting={false}
          navigationState={state}
          safeAreaInsets={insets}
          animationEasing={Easing.out(Easing.exp)}
          onTabPress={({route, preventDefault}) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({route, focused, color}) => {
            const {options} = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({focused, color, size: 24});
            }

            return null;
          }}
          getLabelText={({route}) => {
            const {options} = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined &&
              typeof options.tabBarLabel === 'string'
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            return label;
          }}
        />
      )}>
      <Tab.Screen
        name={Routes.HomeScreen}
        component={HomeScreen}
        options={tabOptions('Home', faHouse)}
      />
      <Tab.Screen
        name={Routes.GamesScreen}
        component={GamesScreen}
        options={tabOptions('Games', faGamepad)}
      />
      <Tab.Screen
        name={Routes.SettingsScreen}
        component={SettingsScreen}
        options={tabOptions('Settings', faScrewdriverWrench)}
      />
    </Tab.Navigator>
  );
};

const NavigationContainerWrapper: React.FC = () => {
  const theme = useTheme();
  const state = useStore();

  const screenOptions: StackNavigationOptions = {
    headerBackTitleVisible: false,
    headerShadowVisible: false,
    headerTintColor: 'red',
    headerShown: true,
    headerTitleAlign: 'center',
    headerTitleContainerStyle: {
      maxWidth: '80%',
    },
    headerLeft: () => <NavigationBackButton />,
    headerStyle: {
      backgroundColor: theme.colors.background,
    },
    headerTitleStyle: {
      color: theme.colors.primary,
      fontWeight: 'bold',
      textAlignVertical: 'center',
      fontSize: theme.fonts.headlineMedium.fontSize,
    },
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={theme.dark ? DarkTheme : LightTheme}>
      <Stack.Navigator
        initialRouteName={Routes.WelcomeAnimationScreen}
        screenOptions={{
          ...screenOptions,
        }}>
        <Stack.Screen
          name={Routes.WelcomeAnimationScreen}
          component={WelcomeAnimationScreen}
          options={{
            title: undefined,
            header: () => <></>,
          }}
        />
        <Stack.Screen
          name={Routes.TabNavigationContainerWrapper}
          component={TabNavigationContainerWrapper}
          options={{
            title: undefined,
            header: () => <></>,
          }}
        />
        <Stack.Screen
          name={Routes.CurrentGameScreen}
          component={CurrentGameScreen}
          options={{
            title: 'Streak Guardian',
            header: () => <></>,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationContainerWrapper;
