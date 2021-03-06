// @flow

import * as React from 'react';
import { Image, StyleSheet } from 'react-native';

type Props = {
  story: { id: string, image: any },
};

export default class Stories extends React.PureComponent<Props> {
  render() {
    const { story } = this.props;
    return <Image style={styles.image} source={{uri: story.image}} resizeMode="contain" />;
  }
}

const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
  },
});
