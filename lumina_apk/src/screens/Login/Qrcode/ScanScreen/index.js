import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet, Easing,Dimensions,Platform } from 'react-native';

const WINDOW =Dimensions.get('window')

const ScanAnimation = () => {
  const scanAnimation = useRef(new Animated.Value(-2)).current;

  const cardStyle = Platform.select({
    ios: () =>
      StyleSheet.create({
        container: {
          shadowRadius: 50,
          shadowOpacity: 0.5,
          shadowOffset: {width: 0, height: 50},
          borderRadius: 5,
          backgroundColor: '#666',
          // width: Dimensions.get('window').width - 40,
        },
      }),
    android: () =>
      StyleSheet.create({
        container: {
          elevation: 6,
          borderRadius: 5,
          backgroundColor: '#129d52',
          // width: Dimensions.get('window').width - 40,
        },
      }),
  })();

  const startAnimation = () => {
    Animated.loop(
      Animated.timing(scanAnimation, {
        toValue: WINDOW.height,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.scanLine,
          cardStyle.container,
          styles.card,
          {
            transform: [{ translateY: scanAnimation }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanLine: {
    position: 'absolute',
    top: 0,
    left: '10%', // Adjust the position of the scan line
    height: 2,
    width: '80%', // Adjust the width of the scan line
    backgroundColor: '#129d52',
  },
  card: {
    margin: 0,
    elevation: 50,
    shadowRadius: 24,
    shadowOffset: {
      width: 30,
      height: 18,
    },
    shadowColor: '#129d52',
  },
});

export default ScanAnimation;
