import React, {useEffect} from 'react';
import {adaptNavigationTheme, useTheme} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
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
import L2ProfileHeaderMenu from '../L2ProfileHeaderMenu';
import HomeScreen from '../../screens/HomeScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CurrentGameScreen from '../../screens/CurrentGameScreen';
import WelcomeAnimationScreen from '../../screens/WelcomeAnimationScreen';
import GamesScreen from '../../screens/GamesScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import L2IconButton from '../L2IconButton';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faDice,
  faGamepad,
  faHouse,
  faScrewdriverWrench,
} from '@fortawesome/free-solid-svg-icons';
import {Colors} from '../../styles/colors';
import L2Text from '../L2Text';
import {View} from 'react-native';
import {IconProp} from '@fortawesome/fontawesome-svg-core';

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
            paddingHorizontal: 20,
            paddingVertical: 5,
            borderRadius: 100,
          }
        }>
        <FontAwesomeIcon
          icon={icon}
          color={focused ? Colors.primaryColor : Colors.textColor}
          size={20}
        />
      </View>
    );
  };

  const tabLabel = (label: string) => {
    return (
      <L2Text variant="bodySmall" style={{color: Colors.textColor}}>
        {label}
      </L2Text>
    );
  };

  const tabOptions = (label: string, icon: IconProp) => {
    return {
      title: undefined,
      header: () => <></>,
      tabBarLabel: () => {
        return tabLabel(label);
      },
      tabBarIcon: (params: {focused: boolean; color: string; size: number}) => {
        return tabIcon(params.focused, icon);
      },
    };
  };

  return (
    <Tab.Navigator
      initialRouteName={Routes.HomeScreen}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.containerColor,
          paddingTop: 5,
        },
      }}>
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
