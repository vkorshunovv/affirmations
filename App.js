import React, { useState, useEffect, useRef } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/Ionicons";
import { Video } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const App = () => {
  const buttonRef = useRef(null);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const opacity = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start(() => {
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start(() => {
        buttonRef.current.fadeOut(2000);
        setTimeout(() => {
          setIsButtonVisible(false);

          Animated.timing(opacity, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }).start();
        }, 2000);
      });
    });
  };

  useEffect(() => {
    buttonRef.current.bounceIn(2000);
  }, []);

  return (
    <LinearGradient
     colors={['rgb(35, 9, 31)', 'rgb(0, 0, 0)']}
     start={{ x: 0.5, y: -0.069 }}
     end={{ x: 0.5, y: 0.767 }}
     style={styles.container}
   >
      {isButtonVisible ? (
        <Animatable.View ref={buttonRef}>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.button}
              onPressIn={handlePressIn}
            >
              <Icon name="play" size={100} color="rgb(35, 9, 31)" />
            </TouchableOpacity>
          </Animated.View>
        </Animatable.View>
      ) : (
        <Animated.View style={{ ...styles.backgroundVideo, opacity }}>
          <Video
            source={require("./assets/fluid.mp4")}
            style={styles.backgroundVideo}
            resizeMode="cover"
            shouldPlay
            isLooping
          />
        </Animated.View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default App;
