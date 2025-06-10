import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from "react-native";

const { width } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const [techStack, setTechStack] = useState("");

  const handleMentorSwipe = () => {
    // navigation.navigate("Swipe");
    navigation.navigate("Chat");
  };

  const handleTeamSwipe = () => {
    navigation.navigate("TeamSwipe");
  };

  const handleGenerateRoadmap = () => {
    navigation.navigate("Roadmap");
  };

  const handleSuggestProjects = () => {
    navigation.navigate("Projects");
  };

  const handleAskAI = () => {
    navigation.navigate("AI");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={[styles.section, styles.sectionMentor]}>
          <Text style={styles.sectionTitle}>FIND YOUR MENTOR</Text>
          <Text style={styles.sectionDescription}>
            Swipe to connect with skilled individuals of your preference
          </Text>
          <TouchableOpacity
            style={styles.sectionButton}
            onPress={handleMentorSwipe}
          >
            <Text style={styles.buttonText}>START SWIPING</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.section, styles.sectionTeam]}>
          <Text style={styles.sectionTitle}>FIND YOUR PERFECT TEAM</Text>
          <Text style={styles.sectionDescription}>
            Choose your required tech stack
          </Text>
          <TextInput
            style={styles.techInput}
            placeholder="Enter tech stack"
            placeholderTextColor="#666"
            value={techStack}
            onChangeText={setTechStack}
          />
          <TouchableOpacity
            style={styles.sectionButton}
            onPress={handleTeamSwipe}
          >
            <Text style={styles.buttonText}>START SWIPING</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.section, styles.sectionLearn]}>
          <Text style={styles.sectionTitle}>WANT TO LEARN SOMETHING NEW?</Text>
          <Text style={styles.sectionDescription}>
            Get a personalized roadmap
          </Text>
          <TouchableOpacity
            style={[styles.sectionButton, styles.darkButton]}
            onPress={handleGenerateRoadmap}
          >
            <Text style={styles.buttonText}>+ Generate Roadmap</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.section, styles.sectionInspiration]}>
          <Text style={styles.sectionTitle}>NEED SOME INSPIRATION?</Text>
          <Text style={styles.sectionDescription}>
            Here are some ideas for your next hackathon project
          </Text>
          <TouchableOpacity
            style={[styles.sectionButton, styles.darkButton]}
            onPress={handleSuggestProjects}
          >
            <Text style={styles.buttonText}>◎ Suggest Projects</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.floatingButton} onPress={handleAskAI}>
        <Text style={styles.floatingButtonText}>★ Ask Spacious AI</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    textAlign: "center",
  },
  sectionDescription: {
    fontSize: 16,
    color: "#000",
    marginBottom: 20,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  sectionButton: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  darkButton: {
    backgroundColor: "#333",
  },
  techInput: {
    backgroundColor: "#fff",
    width: width * 0.8,
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
  },
  sectionMentor: {
    backgroundColor: "#958DB9",
  },
  sectionTeam: {
    backgroundColor: "#A198C7",
  },
  sectionLearn: {
    backgroundColor: "#B3A9E1",
  },
  sectionInspiration: {
    backgroundColor: "#CFBAF0",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  floatingButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default HomeScreen;
