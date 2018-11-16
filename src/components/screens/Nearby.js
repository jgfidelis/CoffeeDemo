import * as React from 'react';
import { ActivityIndicator, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import RNOrderByDistance from 'react-native-order-by-distance';
import styled from 'styled-components';

import { nearbyStart } from '../../reducers/nearby';

import type { Venue } from '../../types';

const CenterWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const DrawerButton = styled.TouchableOpacity`
  margin-left: 10;
`;

const Wrapper = styled.View`
  flex: 1;
  padding-horizontal: 10;
`;

const ItemView = styled.View`
  width: auto;
  height: 60;
  flex-direction: row;
  margin-horizontal: 10;
  justify-content: space-between;
`;

const SideView = styled.View`
  flex-direction: row;
`;

const RowText = styled.Text`
  font-size: 20;
  font-weight: bold;
`;

const Star = styled.Image`
  width: 22;
  height: 22;
`;

type Props = {
  isFetching: boolean,
  error: ?string,
  venues: ?(Venue[]),
  actions: { startSearchRequest: () => void },
};

type State = {
  orderedVenues: Venue[],
  hasLoaded: boolean,
};

export const getGeoLocation = async (): Promise<?GeoLocation> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position: GeoLocation) => {
        resolve(position);
      },
      error => {
        reject(error);
      },
    );
  });
};

class Nearby extends React.PureComponent<Props, State> {
  static navigationOptions = ({ navigation }) => ({
    title: 'Nearby Coffees',
    headerLeft: <DrawerButton onPress={() => navigation.openDrawer()}><Text>Drawer</Text></DrawerButton>,
  });
  state = {
    orderedVenues: [],
    hasLoaded: false,
  };

  async componentDidMount() {
    //just to get geolocation permision
    await getGeoLocation();
    RNOrderByDistance.startModule();
    this.props.actions.startSearchRequest();
  }

  async componentDidUpdate(prevProps) {
    if (!this.props.isFetching && prevProps.isFetching && !this.props.error) {
      // api call is done, call bridge to handle this for us
      const data = this.props.venues.map(venue => {
        return {
          latitude: venue.coordinates.latitude,
          longitude: venue.coordinates.longitude,
          name: venue.name,
          rating: venue.rating,
        };
      });
      const orderedVenues = await RNOrderByDistance.orderByDistance(data);
      this.setState({ orderedVenues: orderedVenues.response, hasLoaded: true });
    }
  }

  renderItem = ({ item }) => {
    return (
      <ItemView>
        <RowText numberOfLines={1}>{item.name}</RowText>
        <SideView>
          <RowText>{item.rating}</RowText>
          <Star source={{uri: 'http://www.clker.com/cliparts/M/I/J/t/i/o/star-md.png'}}/>
        </SideView>
      </ItemView>
    )
  }

  render() {
    if (!this.state.hasLoaded) {
      return (
        <CenterWrapper>
          <ActivityIndicator />
        </CenterWrapper>
      )
    }
    return (
      <Wrapper>
        <FlatList
          data={this.state.orderedVenues}
          renderItem={this.renderItem}
          keyExtractor={item => item.name}
        />
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.nearby.isFetching,
  error: state.nearby.error,
  venues: state.nearby.venues,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    startSearchRequest: () => dispatch(nearbyStart()),
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Nearby);