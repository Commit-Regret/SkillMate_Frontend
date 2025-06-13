import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import socket from "../utils/socket";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Connect socket when component mounts
    socket.connect();

    return () => {
      // Disconnect socket when component unmounts
      socket.disconnect();
    };
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      // Emit login event
      socket.emit("login", { email, password });

      // Listen for login response
      socket.once("loginResponse", async (response) => {
        console.log("Login response:", response);
        if (response.success) {
          // Store user data
          await AsyncStorage.setItem("user", JSON.stringify(response.user));
          await AsyncStorage.setItem("username", response.user.username);

          // Join personal room
          socket.emit("joinPersonalRoom", response.user.id);

          // Navigate to Chat screen
          navigation.replace("Swipe");
        } else {
          Alert.alert("Error", response.message || "Login failed");
        }
        setLoading(false);
      });

      // Set timeout for login response
      setTimeout(() => {
        if (loading) {
          setLoading(false);
          Alert.alert("Error", "Login request timed out. Please try again.");
        }
      }, 10000); // 10 second timeout
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "An error occurred during login");
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          editable={true}
          placeholderTextColor="#666"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          editable={true}
          placeholderTextColor="#666"
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.linkText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
    color: "#333",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#128C7E",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkButton: {
    marginTop: 20,
    alignItems: "center",
  },
  linkText: {
    color: "#128C7E",
    fontSize: 16,
  },
});

export default Login;

// import { View, Text, SafeAreaView } from "react-native";
// import React from "react";

// const Login = () => {
// 	return (
// 		<SafeAreaView>
// 			<Text>Hello World</Text>
// 		</SafeAreaView>
// 	);
// };

// export default Login;
