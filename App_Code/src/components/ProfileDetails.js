import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
const { width } = Dimensions.get("window");

const ProfileDetails = ({ profile, onBackPress }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: profile.image }} style={styles.profileImage} />
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBackPress}
            activeOpacity={0.7}
          >
            <Text style={styles.backButtonText}>↑</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.about}>{profile.bio}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Previous Experience</Text>
          {profile.experience?.map((exp, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.experienceText}>{exp}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tech Stack</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.techStackContainer}
          >
            {profile.techStack?.map((tech, index) => (
              <View key={index} style={styles.techChip}>
                <Text style={styles.techText}>{tech}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  profileSection: {
    alignItems: "center",
    padding: 20,
  },
  imageContainer: {
    position: "relative",
    marginBottom: 20,
  },
  profileImage: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
  },
  backButton: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "rgba(0, 122, 255, 0.9)",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  about: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 30,
  },
  section: {
    width: "100%",
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  experienceItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
    paddingRight: 20,
  },
  bulletPoint: {
    fontSize: 16,
    color: "#666",
    marginRight: 10,
  },
  experienceText: {
    fontSize: 16,
    color: "#666",
    flex: 1,
  },
  techStackContainer: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  techChip: {
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  techText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
});

export default ProfileDetails;
