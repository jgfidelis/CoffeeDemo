// @flow

import * as React from 'react';
import { ActivityIndicator, Text, SafeAreaView, Linking } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { featuredStart } from '../../reducers/featured';
import Routes from '../navigation/Routes';
import RoundedButton from '../common/RoundedButton';
import Star from '../common/Star';

import type { Venue } from '../../types';
import type { NavigationScreenProp } from 'react-navigation';

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

type Props = {
  isFetching: boolean,
  error: ?string,
  venue: ?Venue,
  actions: { startFeaturedRequest: () => void },
  navigation: NavigationScreenProp<{}>,
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
    const stories = venue.photos.map((pic, index) => {
      return { id: index.toString(), image: pic };
    })
    navigation.navigate(Routes.PIC_GALLERY, { stories });
  }

  renderContent = () => {
    const { venue } = this.props;
    if (!venue) return null;
    return (
      <Wrapper>
        <Preview source={{ uri: venue.image_url }} />
        <RoundedButton onPress={this.openImageGallery} label={'View More Pics!'} />
        <NameText>{venue.name}</NameText>
        <Row>
          <InsideRow>
            <FieldTextBold>Phone: </FieldTextBold>
            <FieldTextRegular>{venue.display_phone}</FieldTextRegular>
          </InsideRow>
          <InsideRow>
            <FieldTextBold>Rating: </FieldTextBold>
            <FieldTextRegular>{venue.rating}</FieldTextRegular>
            <Star size={16}/>
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
        <RoundedButton onPress={this.openUrl} label={'Check on Yelp!'} />
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

