// flow

import * as React from 'react';
import { ActivityIndicator, Text, SafeAreaView, Linking } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { featuredStart } from '../../reducers/featured';
import Routes from '../navigation/Routes';

import type { Venue } from '../../types';

const Wrapper = styled.View`
  flex: 1;
`;

const CenterWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const DrawerButton = styled.TouchableOpacity`
  margin-left: 10;
`;

const Preview = styled.Image`
  width: 100%;
  height: 35%;
`;

const ViewMoreButton = styled.TouchableOpacity`
  margin-left: 10;
  margin-top: 10;
  border-radius: 8;
  border-width: 1;
  width: 140;
  justify-content: center;
  align-items: center;
`;

const ViewMoreText = styled.Text`
  font-size: 16;
  font-weight: bold;
`;

const NameText = styled.Text`
  margin-top: 10;
  margin-left: 10;
  font-size: 20;
  font-weight: bold;
  width: 100%;
  text-align: center;
`;

const Row = styled.View`
  width: 100%;
  flex-direction: row;
  margin-horizontal: 10;
  margin-top: 10;
`;

const InsideRow = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const FieldTextBold = styled.Text`
  font-size: 16;
  font-weight: bold;
`;

const FieldTextRegular = styled.Text`
  font-size: 16;
`;

const Star = styled.Image`
  width: 16;
  height: 16;
`;

const YelpButton = styled.TouchableOpacity`
  margin-left: 10;
  margin-top: 10;
  border-radius: 8;
  border-width: 1;
  width: 140;
  justify-content: center;
  align-items: center;
`;

type Props = {
  isFetching: boolean,
  error: ?string,
  venue: ?Venue,
  actions: { startFeaturedRequest: () => void },
};

class Home extends React.PureComponent<Props> {
  
  static navigationOptions = ({ navigation }) => ({
    title: 'FEATURED',
    headerLeft: <DrawerButton onPress={() => navigation.openDrawer()}><Text>Drawer</Text></DrawerButton>,
  });

  async componentDidMount() {
    this.props.actions.startFeaturedRequest();
  }

  renderHeader = () => {
    return (
      <SafeAreaView>
        <DrawerButton>
          <Text>Drawer</Text>
        </DrawerButton>
      </SafeAreaView>
    )
  }

  renderLoading = () => {
    return (
      <CenterWrapper>
        <ActivityIndicator/>
      </CenterWrapper>
    );
  }

  openUrl = () => Linking.openURL(this.props.venue.url);

  openImageGallery = () => {
    const { navigation, venue } = this.props;
    navigation.navigate(Routes.PIC_GALLERY, { pics: venue.photos });
  }

  renderContent = () => {
    const { venue } = this.props;
    if (!venue) return null;
    return (
      <Wrapper>
        <Preview source={{ uri: venue.image_url }} />
        <ViewMoreButton onPress={this.openImageGallery}>
          <ViewMoreText>View More Pics!</ViewMoreText>
        </ViewMoreButton>
        <NameText>{venue.name}</NameText>
        <Row>
          <InsideRow>
            <FieldTextBold>Phone: </FieldTextBold>
            <FieldTextRegular>{venue.display_phone}</FieldTextRegular>
          </InsideRow>
          <InsideRow>
            <FieldTextBold>Rating: </FieldTextBold>
            <FieldTextRegular>{venue.rating}</FieldTextRegular>
            <Star source={{uri: 'http://www.clker.com/cliparts/M/I/J/t/i/o/star-md.png'}}/>
          </InsideRow>
        </Row>
        <Row>
          <InsideRow>
            <FieldTextBold>Price: </FieldTextBold>
            <FieldTextRegular>{venue.price}</FieldTextRegular>
          </InsideRow>
          <InsideRow>
            <FieldTextBold>Reviews: </FieldTextBold>
            <FieldTextRegular>{venue.review_count}</FieldTextRegular>
          </InsideRow>
        </Row>
        <Row>
          <InsideRow>
            <FieldTextBold>Address: </FieldTextBold>
            <FieldTextRegular>{`${venue.location.display_address.join(', ')}`}</FieldTextRegular>
          </InsideRow>
        </Row>
        <YelpButton onPress={this.openUrl}>
          <ViewMoreText>Check on Yelp!</ViewMoreText>
        </YelpButton>
      </Wrapper>
    );
  }


  render() {
    return (
      <Wrapper>
        {this.props.isFetching ? this.renderLoading() : this.renderContent()}
      </Wrapper>
    )

  }
}

const mapStateToProps = (state) => ({
  isFetching: state.featured.isFetching,
  error: state.featured.error,
  venue: state.featured.venue,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    startFeaturedRequest: () => dispatch(featuredStart()),
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

