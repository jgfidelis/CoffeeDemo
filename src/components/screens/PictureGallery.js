// @flow
import * as React from 'react';
import Stories from '../Stories';
import styled from 'styled-components';

const Wrapper = styled.View`
  flex: 1;
`;

const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 10;
  top: 20;
`;

const BackLabel = styled.Text`
  font-size: 18;
  color: blue;
  font-weight: bold;
`;

type Props = {
  navigation: {
    state: {
      params: {
        stories: Array<{ id: string, image: string }>,
      },
    },
  },
}

export default class PictureGallery extends React.PureComponent<Props> {
  static navigationOptions = () => ({
    header: null,
  });

  goBack = () => this.props.navigation.pop();

  render() {
    const { stories } = this.props.navigation.state.params;
    return (
      <Wrapper>
        <Stories stories={stories} />
        <BackButton onPress={this.goBack}><BackLabel>Back</BackLabel></BackButton>
      </Wrapper>
    )
  }
}