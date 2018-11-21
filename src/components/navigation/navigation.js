import * as React from 'react';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import Home from '../screens/Home';
import Nearby from '../screens/Nearby';
import Routes from './Routes';
import PictureGallery from '../screens/PictureGallery';
import AppDrawer from './AppDrawer';

export const InnerAppRouter = createStackNavigator({
  [Routes.HOME]: { screen: Home },
  [Routes.NEARBY]: { screen: Nearby },
  [Routes.PIC_GALLERY]: { screen: PictureGallery },
},
{ initialRouteName: Routes.HOME });

const AppRouter = createStackNavigator(
  {
    InnerAppRouter: {
      screen: createDrawerNavigator(
        {
          MainApp: {
            screen: InnerAppRouter,
          },
        },
        {
          contentComponent: props => <AppDrawer {...props} mainAppStack={InnerAppRouter} />,
        },
      ),
    },
  },
  {
    headerMode: 'none',
  },
);


export default AppRouter;