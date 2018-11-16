import * as React from 'react';
import Stories from '../Stories';
import styled from 'styled-components';

const Wrapper = styled.View`
  flex: 1;
`;

export default class PictureGallery extends React.PureComponent {
  render() {
    const stories = this.props.navigation.state.params.pics.map((pic, index) => {
      return { id: index.toString(), image: pic };
    })
    return (
      <Wrapper>
        <Stories stories={stories} />
      </Wrapper>
    )
  }
}