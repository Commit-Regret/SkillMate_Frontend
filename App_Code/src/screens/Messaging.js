import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import socket from "../utils/socket";
import MessageComponent from "../components/MessageComponent";

import { styles } from "../utils/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Messaging = ({ route, navigation }) => {
  const [user, setUser] = useState("");
  const { name, id } = route.params;
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const getUsername = async () => {
    try {
      const value = await AsyncStorage.getItem("username");
      if (value !== null) {
        setUser(value);
      }
    } catch (e) {
      console.error("Error while loading username!");
    }
  };

  const handleNewMessage = () => {
    if (!message.trim()) return;
    if (!isConnected) {
      Alert.alert("Error", "Not connected to server. Please try again.");
      return;
    }

    const hour =
      new Date().getHours() < 10
        ? `0${new Date().getHours()}`
        : `${new Date().getHours()}`;

    const mins =
      new Date().getMinutes() < 10
        ? `0${new Date().getMinutes()}`
        : `${new Date().getMinutes()}`;
    console.log("message", message);
    console.log("user", user);
    if (user) {
      const messageData = {
        message: message.trim(),
        room_id: id,
        user,
        timestamp: { hour, mins },
      };

      try {
        socket.emit("newMessage", messageData);
        setChatMessages((prev) => [
          ...prev,
          { ...messageData, id: Date.now().toString() },
        ]);
        setMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
        Alert.alert("Error", "Failed to send message. Please try again.");
      }
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({ title: name });
    getUsername();

    setIsConnected(socket.connected);

    socket.emit("joinRoom", id);

    socket.emit("findRoom", id);
  }, []);

  useEffect(() => {
    const onConnect = () => {
      console.log("Socket connected");
      setIsConnected(true);
    };

    const onDisconnect = () => {
      console.log("Socket disconnected");
      setIsConnected(false);
    };

    const onFoundRoom = (roomChats) => {
      console.log("Room messages received:", roomChats);
      setChatMessages(roomChats);
    };

    const onNewMessage = (messageData) => {
      console.log("New message received:", messageData);
      setChatMessages((prev) => [...prev, messageData]);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("foundRoom", onFoundRoom);
    socket.on("newMessage", onNewMessage);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foundRoom", onFoundRoom);
      socket.off("newMessage", onNewMessage);
      socket.emit("leaveRoom", id);
    };
  }, [socket, id]);

  return (
    <View style={styles.messagingscreen}>
      <View
        style={[
          styles.messagingscreen,
          { paddingVertical: 15, paddingHorizontal: 10 },
        ]}
      >
        {chatMessages.length > 0 ? (
          <FlatList
            data={chatMessages}
            renderItem={({ item }) => (
              <MessageComponent item={item} user={user} />
            )}
            keyExtractor={(item) => item.id}
            inverted={false}
          />
        ) : (
          <View style={styles.noMessagesContainer}>
            <Text style={styles.noMessagesText}>
              No messages yet. Start the conversation!
            </Text>
          </View>
        )}
      </View>

      <View style={styles.messaginginputContainer}>
        <TextInput
          style={styles.messaginginput}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          placeholderTextColor="#666"
          onSubmitEditing={handleNewMessage}
        />
        <Pressable
          style={[
            styles.messagingbuttonContainer,
            (!message.trim() || !isConnected) &&
              styles.messagingbuttonContainerDisabled,
          ]}
          onPress={handleNewMessage}
          disabled={!message.trim() || !isConnected}
        >
          <View>
            <Text style={{ color: "#f2f0f1", fontSize: 20 }}>SEND</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Messaging;
