// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import socket from "../utils/socket";

// const Login = ({ navigation }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert("Error", "Please fill in all fields");
//       return;
//     }

//     setLoading(true);
//     try {
//       socket.emit("login", { email, password });

//       socket.once("loginResponse", async (response) => {
//         if (response.success) {
//           await AsyncStorage.setItem("user", JSON.stringify(response.user));
//           await AsyncStorage.setItem("username", response.user.username);

//           navigation.replace("Chat");
//         } else {
//           Alert.alert("Error", response.message || "Login failed");
//         }
//         setLoading(false);
//       });
//     } catch (error) {
//       console.error("Login error:", error);
//       Alert.alert("Error", "An error occurred during login");
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome Back!</Text>

//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//           autoCapitalize="none"
//         />

//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//         />
//       </View>

//       <TouchableOpacity
//         style={styles.button}
//         onPress={handleLogin}
//         disabled={loading}
//       >
//         {loading ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           <Text style={styles.buttonText}>Login</Text>
//         )}
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.linkButton}
//         onPress={() => navigation.navigate("Signup")}
//       >
//         <Text style={styles.linkText}>Don't have an account? Sign up</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 20,
//     backgroundColor: "#f5f5f5",
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 40,
//     color: "#333",
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   input: {
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     fontSize: 16,
//   },
//   button: {
//     backgroundColor: "#128C7E",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   linkButton: {
//     marginTop: 20,
//     alignItems: "center",
//   },
//   linkText: {
//     color: "#128C7E",
//     fontSize: 16,
//   },
// });

// export default Login;

// // import { View, Text, SafeAreaView } from "react-native";
// // import React from "react";

// // const Login = () => {
// // 	return (
// // 		<SafeAreaView>
// // 			<Text>Hello World</Text>
// // 		</SafeAreaView>
// // 	);
// // };

// // export default Login;

// import React, { useState } from "react";
// import { View, Text, TextInput, Button } from "react-native";
// import axios from "axios";

// export default function LoginScreen({ navigation }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const login = async () => {
//     try {
//       const res = await axios.post("http://127.0.1.0:5000/auth/login", {
//         email,
//         password,
//       });
//       const { session_id, user_id } = res.data;
//       navigation.replace("Chat", { sessionId: session_id, userId: user_id });
//     } catch (err) {
//       alert("Login failed");
//     }
//   };

//   return (
//     <View>
//       <Text>Login</Text>
//       <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
//       <TextInput
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />
//       <Button title="Login" onPress={login} />
//       <Button
//         title="Go to Signup"
//         onPress={() => navigation.navigate("Signup")}
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
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      console.log("abc");
      const res = await axios.post("http://172.20.10.4:5000/auth/login", {
        email,
        password,
      });
      console.log("def");
      const { session_id, user_id } = res.data;
      AsyncStorage.setItem("session_id", session_id);
      AsyncStorage.setItem("user_id", user_id);
      navigation.replace("Chats", { session_id: session_id, userId: user_id });
    } catch (err) {
      Alert.alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

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
        onPress={login}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
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
