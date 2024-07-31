import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Animated, TouchableOpacity, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const AnimatedButton = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const handleBtnClick = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 5,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Handle what to do after the animation ends
    });
  };

  useEffect(() => {
    const bounceAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.08,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    setTimeout(() => {
      bounceAnimation.start();
    }, 4000);

    return () => bounceAnimation.stop();
  }, [scaleAnim]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBtnClick}>
        <Animated.View
          style={[
            styles.mainBtn,
            {
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            },
          ]}
        >
          <LinearGradient
            colors={['#fbc2eb', '#a6c1ee']}
            style={styles.gradient}
          >
            <Text style={styles.btnText}>Click Me</Text>
          </LinearGradient>
         </Animated.View>
       </TouchableOpacity>
     </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainBtn: {
    borderRadius: 100,
    elevation: 5,
  },
  gradient: {
    padding: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  btnText: {
    fontSize: 20,
    color: 'white',
    textTransform: 'uppercase',
  },
});
