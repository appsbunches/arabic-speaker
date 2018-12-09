import React from 'react';
import {Platform, StyleSheet, StatusBar, View, ActivityIndicator} from 'react-native';
import { createDrawerNavigator} from 'react-navigation'

import AppNavigator from './src/navigation/AppNavigator';
import Colors from './src/constants/Colors';
import SettingsComponent from './src/components/SettingsComponent'
import { I18nManager } from 'react-native';
I18nManager.forceRTL(true) // for testing RTL

const SettingsDrawer = createDrawerNavigator({
  AppNavigator: {
    screen: AppNavigator
  },
},
  {
    drawerWidth: 310,
    drawerPosition: 'left',
    contentComponent: SettingsComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    // navigationOptions: {
    //   header: 'none'
    // }
  });


export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
  //  if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) { 
    // return (
      // <AppLoading
      //   startAsync={this._loadResourcesAsync}
      //   onError={this._handleLoadingError}
      //   onFinish={this._handleFinishLoading}
      // />
      // <ActivityIndicator size="small" color="#00ff00" />
      // https://facebook.github.io/react-native/docs/activityindicator
    // );
  // } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
      <SettingsDrawer/>
        {/* <AppNavigator /> */}
      </View>
    );
  // }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in CategoriesScreen.js. Feel free
        // to remove this if you are not using it in your app
        'tajawal': require('./assets/fonts/Tajawal-Regular.ttf'),
        'tajawal-bold': require('./assets/fonts/Tajawal-Bold.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appBackground,
  },
  header: {
    backgroundColor: '#1c1',
  }
});
