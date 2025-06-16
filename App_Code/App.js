import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Login from "./src/screens/Login";
import Messaging from "./src/screens/Messaging";
import Chat from "./src/screens/Chat";

import HomeScreen from "./src/screens/HomeScreen";
import SwipeScreen from "./src/screens/SwipeScreen";
import ChatScreen from "./src/screens/Chat";
import ChatList from "./src/screens/ChatList";
import SignupScreen from "./src/screens/Signup";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#007AFF",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "SkillMate" }}
          />
          <Stack.Screen
            name="Swipe"
            component={SwipeScreen}
            options={{ title: "Find Matches" }}
          />
          <Stack.Screen
            name="Messaging"
            component={Messaging}
            options={{ title: "Messaging" }}
          />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={{ title: "Chats", headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: "Login", headerShown: false }}
          />
          <Stack.Screen
            name="Chats"
            component={ChatList}
            options={{ title: "Login", headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ title: "Login", headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
