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
} from "react-native";
import Swiper from "react-native-deck-swiper";
import { profiles } from "../data/profiles";
import ProfileDetails from "../components/ProfileDetails";

const { width, height } = Dimensions.get("window");

const SwipeScreen = () => {
  const [likedProfiles, setLikedProfiles] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const swiperRef = useRef(null);
  const scrollViewRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  const handleSwipeLeft = (cardIndex) => {
    const profile = profiles[cardIndex];
    setLikedProfiles([...likedProfiles, profile]);
  };

  const handleSwipeRight = (cardIndex) => {
    console.log("Profile removed:", profiles[cardIndex].name);
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
    setSelectedProfile(profiles[swiperRef.current.state.firstCardIndex]);
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

  const renderCard = (card) => {
    return (
      <View style={styles.card}>
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
      </View>
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
        <View style={styles.swiperContainer}>
          <Swiper
            ref={swiperRef}
            cards={profiles}
            renderCard={renderCard}
            onSwipedLeft={handleSwipeLeft}
            onSwipedRight={handleSwipeRight}
            cardIndex={0}
            backgroundColor={"#f5f5f5"}
            stackSize={3}
            stackSeparation={15}
            animateOverlayLabelsOpacity
            animateCardOpacity
            swipeBackCard
          />
        </View>

        {showDetails && selectedProfile && (
          <Animated.View
            style={[styles.detailsContainer, { opacity: fadeAnim }]}
            pointerEvents="box-none"
          >
            <View style={styles.detailsContent}>
              <ProfileDetails
                profile={selectedProfile}
                onBackPress={handleScrollToSwiper}
              />
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
});

export default SwipeScreen;
