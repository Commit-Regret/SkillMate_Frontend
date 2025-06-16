// // import React, { useState } from "react";
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   StyleSheet,
// //   Alert,
// //   ActivityIndicator,
// // } from "react-native";
// // import AsyncStorage from "@react-native-async-storage/async-storage";
// // import socket from "../utils/socket";

// // const Signup = ({ navigation }) => {
// //   const [username, setUsername] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [confirmPassword, setConfirmPassword] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const handleSignup = async () => {
// //     if (!username || !email || !password || !confirmPassword) {
// //       Alert.alert("Error", "Please fill in all fields");
// //       return;
// //     }

// //     if (password !== confirmPassword) {
// //       Alert.alert("Error", "Passwords do not match");
// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       socket.emit("signup", { username, email, password });

// //       socket.once("signupResponse", async (response) => {
// //         if (response.success) {
// //           await AsyncStorage.setItem("user", JSON.stringify(response.user));
// //           await AsyncStorage.setItem("username", response.user.username);

// //           navigation.replace("Chat");
// //         } else {
// //           Alert.alert("Error", response.message || "Signup failed");
// //         }
// //         setLoading(false);
// //       });
// //     } catch (error) {
// //       console.error("Signup error:", error);
// //       Alert.alert("Error", "An error occurred during signup");
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Create Account</Text>

// //       <View style={styles.inputContainer}>
// //         <TextInput
// //           style={styles.input}
// //           placeholder="Username"
// //           value={username}
// //           onChangeText={setUsername}
// //           autoCapitalize="none"
// //         />

// //         <TextInput
// //           style={styles.input}
// //           placeholder="Email"
// //           value={email}
// //           onChangeText={setEmail}
// //           keyboardType="email-address"
// //           autoCapitalize="none"
// //         />

// //         <TextInput
// //           style={styles.input}
// //           placeholder="Password"
// //           value={password}
// //           onChangeText={setPassword}
// //           secureTextEntry
// //         />

// //         <TextInput
// //           style={styles.input}
// //           placeholder="Confirm Password"
// //           value={confirmPassword}
// //           onChangeText={setConfirmPassword}
// //           secureTextEntry
// //         />
// //       </View>

// //       <TouchableOpacity
// //         style={styles.button}
// //         onPress={handleSignup}
// //         disabled={loading}
// //       >
// //         {loading ? (
// //           <ActivityIndicator color="#fff" />
// //         ) : (
// //           <Text style={styles.buttonText}>Sign Up</Text>
// //         )}
// //       </TouchableOpacity>

// //       <TouchableOpacity
// //         style={styles.linkButton}
// //         onPress={() => navigation.navigate("Login")}
// //       >
// //         <Text style={styles.linkText}>Already have an account? Login</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: "center",
// //     padding: 20,
// //     backgroundColor: "#f5f5f5",
// //   },
// //   title: {
// //     fontSize: 32,
// //     fontWeight: "bold",
// //     textAlign: "center",
// //     marginBottom: 40,
// //     color: "#333",
// //   },
// //   inputContainer: {
// //     marginBottom: 20,
// //   },
// //   input: {
// //     backgroundColor: "#fff",
// //     padding: 15,
// //     borderRadius: 10,
// //     marginBottom: 10,
// //     fontSize: 16,
// //   },
// //   button: {
// //     backgroundColor: "#128C7E",
// //     padding: 15,
// //     borderRadius: 10,
// //     alignItems: "center",
// //   },
// //   buttonText: {
// //     color: "#fff",
// //     fontSize: 18,
// //     fontWeight: "bold",
// //   },
// //   linkButton: {
// //     marginTop: 20,
// //     alignItems: "center",
// //   },
// //   linkText: {
// //     color: "#128C7E",
// //     fontSize: 16,
// //   },
// // });

// // export default Signup;

// import React, { useState } from "react";
// import { View, TextInput, Button, Text } from "react-native";
// import axios from "axios";

// export default function SignupScreen({ navigation }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const signup = async () => {
//     try {
//       const res = await axios.post("http://127.0.1.0:5000/auth/signup", {
//         email,
//         password,
//       });
//       const { session_id, user_id } = res.data;
//       navigation.replace("Chat", { sessionId: session_id, userId: user_id });
//     } catch (err) {
//       alert("Signup failed");
//     }
//   };

//   return (
//     <View>
//       <Text>Signup</Text>
//       <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
//       <TextInput
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />
//       <Button title="Signup" onPress={signup} />
//       <Button
//         title="Go to Login"
//         onPress={() => navigation.navigate("Login")}
//       />
//     </View>
//   );
// }

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signup = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://172.20.10.4:5000/auth/signup", {
        email,
        password,
      });
      const { session_id, user_id } = res.data;
      navigation.replace("Chat", { sessionId: session_id, userId: user_id });
    } catch (err) {
      Alert.alert("Error", "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={signup}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Create Account</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button: {
    backgroundColor: "#128C7E",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    color: "#128C7E",
    fontSize: 16,
  },
});
