import React, { useState, useEffect, useRef } from "react";
import { View, Image, Animated, PanResponder, Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = 300; // Fixed width for all cards
const CARD_HEIGHT = 200; // Fixed height for all cards

const ImageSlider = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

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
          <View
            key={index}
            style={[
              styles.paginationDot,
              {
                backgroundColor: currentIndex === index ? "#006E0A" : "#CCCCCC",
                width: currentIndex === index ? 20 : 8,
              },
            ]}
          />
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
        {images.map((image, index) => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1, 0.9],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.cardContainer,
                {
                  transform: [{ scale }],
                },
              ]}
            >
              <Image source={image} style={styles.image} resizeMode="cover" />
            </Animated.View>
          );
        })}
      </Animated.View>
      {renderPagination()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: CARD_HEIGHT + 40, // Extra space for pagination
    position: "relative",
    overflow: "hidden",
  },
  slidesContainer: {
    flexDirection: "row",
    height: CARD_HEIGHT,
  },
  cardContainer: {
    width: width,
    height: CARD_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 10,
    overflow: "hidden",
  },
  paginationContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default ImageSlider;
