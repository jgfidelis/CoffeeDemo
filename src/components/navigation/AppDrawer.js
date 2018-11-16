import * as React from 'react';
import styled from 'styled-components';
import { NavigationActions, DrawerActions, StackActions } from 'react-navigation';
import Routes from './Routes';

const Wrapper = styled.View`
  flex: 1;
  padding-top: 50;
  margin-horizontal: 20;
`;

const Button = styled.TouchableOpacity`
  margin-top: 10;
`;
// font-weight: ${props => props.selected ? 'bold' : 'regular'};
const RouteName = styled.Text`
  font-size: 16;
  
`;


export default class AppDrawer extends React.PureComponent {
  navigate = (route) => {
    const { navigation } = this.props;

    //closes the drawer
    this.props.navigation.dispatch(DrawerActions.closeDrawer());

    //resets to the route that you want
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: route })],
    });
    navigation.dispatch(resetAction);
  }

  render() {
    return (
      <Wrapper>
        <Button onPress={() => this.navigate(Routes.HOME)}><RouteName>Home</RouteName></Button>
        <Button onPress={() => this.navigate(Routes.NEARBY)}><RouteName>Nearby</RouteName></Button>
      </Wrapper>
    )
  }
}