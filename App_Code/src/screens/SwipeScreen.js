import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Animated,
  PanResponder,
} from "react-native";
import { profiles } from "../data/profiles";
import ProfileDetails from "../components/ProfileDetails";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const SWIPE_THRESHOLD = 120;

const SwipeScreen = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedProfiles, setLikedProfiles] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const scrollViewRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.ValueXY()).current;
  const rotation = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: ["-10deg", "0deg", "10deg"],
    extrapolate: "clamp",
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          swipeRight();
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          swipeLeft();
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const swipeRight = () => {
    Animated.timing(position, {
      toValue: { x: width + 100, y: gesture.dy },
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setCurrentIndex(currentIndex + 1);
      position.setValue({ x: 0, y: 0 });
    });
  };

  const swipeLeft = () => {
    Animated.timing(position, {
      toValue: { x: -width - 100, y: gesture.dy },
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setCurrentIndex(currentIndex + 1);
      position.setValue({ x: 0, y: 0 });
    });
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const animateButtonPress = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleScrollToDetails = () => {
    animateButtonPress();
    setSelectedProfile(profiles[currentIndex]);
    setShowDetails(true);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ y: height, animated: true });
    }, 100);
  };

  const handleScrollToSwiper = () => {
    animateButtonPress();

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowDetails(false);
    });

    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handleStartChat = () => {
    if (selectedProfile) {
      navigation.navigate("Messaging", {
        name: selectedProfile.name,
        otherUserId: selectedProfile.id,
      });
    }
  };

  const renderCard = () => {
    if (currentIndex >= profiles.length) {
      return (
        <View style={styles.card}>
          <Text style={styles.noMoreCards}>No more profiles!</Text>
        </View>
      );
    }

    const card = profiles[currentIndex];
    const cardStyle = {
      transform: [
        { translateX: position.x },
        { translateY: position.y },
        { rotate: rotation },
      ],
    };

    return (
      <Animated.View
        style={[styles.card, cardStyle]}
        {...panResponder.panHandlers}
      >
        <Image source={{ uri: card.image }} style={styles.image} />
        <View style={styles.cardContent}>
          <View style={styles.cardInfo}>
            <Text style={styles.name}>
              {card.name}, {card.age}
            </Text>
            <Text style={styles.bio}>{card.bio}</Text>
          </View>
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity
              style={styles.cardButton}
              onPress={handleScrollToDetails}
              activeOpacity={0.7}
            >
              <Text style={styles.cardButtonText}>↓</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        scrollEnabled={!showDetails}
        pagingEnabled={true}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.swiperContainer}>{renderCard()}</View>

        {showDetails && selectedProfile && (
          <Animated.View
            style={[styles.detailsContainer, { opacity: fadeAnim }]}
            pointerEvents="box-none"
          >
            <View style={styles.detailsContent}>
              {/* <ProfileDetails
                profile={selectedProfile}
                onBackPress={handleScrollToSwiper}
              /> */}
              <TouchableOpacity
                style={styles.chatButton}
                onPress={handleStartChat}
              >
                <Text style={styles.chatButtonText}>Start Chat</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  swiperContainer: {
    height: height,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: width * 0.9,
    height: width * 1.3,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: "70%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cardContent: {
    padding: 20,
    flex: 1,
    justifyContent: "space-between",
  },
  cardInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  bio: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
  cardButton: {
    backgroundColor: "rgba(0, 122, 255, 0.9)",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  detailsContainer: {
    height: height,
    width: width,
    position: "relative",
  },
  detailsContent: {
    flex: 1,
  },
  noMoreCards: {
    fontSize: 24,
    textAlign: "center",
    color: "#666",
  },
  chatButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 25,
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: "center",
  },
  chatButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SwipeScreen;
