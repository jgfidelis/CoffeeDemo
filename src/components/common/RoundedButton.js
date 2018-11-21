// @flow
import * as React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.TouchableOpacity`
  margin-left: 10;
  margin-top: 10;
  border-radius: 8;
  border-width: 1;
  width: ${props => props.width || 140};
  justify-content: center;
  align-items: center;
`;

const LabelText = styled.Text`
  font-size: ${props => props.fontSize || 16};
  font-weight: bold;
`;

type Props = {
  width?: number,
  fontSize?: number,
  label: string,
  onPress: () => void,
};

export default class RoundedButton extends React.PureComponent<Props> {
  render() {
    const { width, label, onPress, fontSize } = this.props;
    return (
      <ButtonWrapper width={width} onPress={onPress}>
        <LabelText fontSize={fontSize}>{label}</LabelText>
      </ButtonWrapper>
    )
  }
}