import React, { useState, useEffect, useRef } from "react";
import { View, Image, Animated, PanResponder, Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const ImageSlider = ({ images, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slideRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentIndex < images.length - 1) {
        animateToNext();
      } else {
        animateToFirst();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, images.length, interval]);

  const animateToNext = () => {
    Animated.timing(scrollX, {
      toValue: -(currentIndex + 1) * width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex(prevIndex => prevIndex + 1);
    });
  };

  const animateToPrevious = () => {
    Animated.timing(scrollX, {
      toValue: -(currentIndex - 1) * width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex(prevIndex => prevIndex - 1);
    });
  };

  const animateToFirst = () => {
    Animated.timing(scrollX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex(0);
    });
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return Math.abs(gestureState.dx) > 5;
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx > 50 && currentIndex > 0) {
        animateToPrevious();
      } else if (gestureState.dx < -50 && currentIndex < images.length - 1) {
        animateToNext();
      } else {
        // If the swipe wasn't far enough, snap back to the current image
        Animated.spring(scrollX, {
          toValue: -currentIndex * width,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const renderPagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {images.map((_, index) => (
          <View key={index} style={[styles.paginationDot, { opacity: currentIndex === index ? 1 : 0.5 }]} />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.slidesContainer,
          {
            transform: [{ translateX: scrollX }],
            width: width * images.length,
          },
        ]}
        {...panResponder.panHandlers}
      >
        {images.map((image, index) => (
          <Image key={index} source={image} style={styles.image} resizeMode="cover" />
        ))}
      </Animated.View>
      {renderPagination()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    position: "relative",
    overflow: "hidden",
  },
  slidesContainer: {
    flexDirection: "row",
    height: "100%",
  },
  image: {
    width: width,
    height: 200,
  },
  paginationContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "green",
    marginHorizontal: 4,
  },
});

export default ImageSlider;
