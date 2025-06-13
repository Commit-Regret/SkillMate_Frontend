import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  FlatList,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Modal from "../components/Modal";
import ChatComponent from "../components/ChatComponent";
import socket from "../utils/socket";
import { styles } from "../utils/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [user, setUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useLayoutEffect(() => {
    const getUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          socket.emit("joinPersonalRoom", parsedUser.id);
        } else {
          navigation.replace("Login");
        }
      } catch (error) {
        console.error("Error getting user:", error);
        navigation.replace("Login");
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    // Get rooms when component mounts
    socket.emit("getRooms");

    // Listen for rooms list
    socket.on("roomsList", (roomsList) => {
      console.log("Received rooms:", roomsList);
      setRooms(roomsList);
    });

    // Listen for new room created
    socket.on("roomCreated", (room) => {
      console.log("New room created:", room);
      setRooms((prevRooms) => [...prevRooms, room]);
    });

    // Listen for online users
    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    // Listen for user status changes
    socket.on("userStatusChange", ({ userId, status }) => {
      setOnlineUsers((prev) =>
        prev.map((user) => (user.id === userId ? { ...user, status } : user))
      );
    });

    return () => {
      socket.off("roomsList");
      socket.off("roomCreated");
      socket.off("onlineUsers");
      socket.off("userStatusChange");
    };
  }, []);

  const handleCreateGroup = () => {
    if (!user) {
      Alert.alert("Error", "Please login first");
      return;
    }
    setVisible(true);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("username");
      socket.emit("logout", user?.id);
      navigation.replace("Login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.chatscreen}>
      <View style={styles.chattopContainer}>
        <View style={styles.chatheader}>
          <Text style={styles.chatheading}>Chats</Text>
          <View style={styles.chatheaderButtons}>
            <Pressable onPress={handleCreateGroup}>
              <Feather name="edit" size={24} color="green" />
            </Pressable>
            <Pressable onPress={handleLogout} style={{ marginLeft: 15 }}>
              <Feather name="log-out" size={24} color="red" />
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.chatlistContainer}>
        {rooms.length > 0 ? (
          <FlatList
            data={rooms}
            renderItem={({ item }) => (
              <ChatComponent
                item={item}
                onlineUsers={onlineUsers}
                currentUser={user}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View style={styles.chatemptyContainer}>
            <Text style={styles.chatemptyText}>No rooms created!</Text>
            <Text>Click the icon above to create a Chat room</Text>
          </View>
        )}
      </View>
      {visible ? <Modal setVisible={setVisible} /> : null}
    </SafeAreaView>
  );
};

export default Chat;
