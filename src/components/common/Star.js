// @flow
import * as React from 'react';
import styled from 'styled-components';

const StarImage = styled.Image`
  width: ${props => props.size};
  height: ${props => props.size};
`;

type Props = {
  size: number,
};

export default class Star extends React.PureComponent<Props> {
  render() {
    const { size } = this.props;
    return <StarImage size={size} source={{ uri: 'http://www.clker.com/cliparts/M/I/J/t/i/o/star-md.png' }}/>
  }
}