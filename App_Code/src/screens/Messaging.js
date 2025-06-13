import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  FlatList,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import socket from "../utils/socket";
import MessageComponent from "../components/MessageComponent";

import { styles } from "../utils/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Messaging = ({ route, navigation }) => {
  const [user, setUser] = useState("");
  const { name, id, otherUserId } = route.params;
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const [roomId, setRoomId] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({ title: name });
    getUsername();

    // Join private room when component mounts
    if (socket && socket.connected && user) {
      const privateRoomId = [user, otherUserId].sort().join("-");
      setRoomId(privateRoomId);
      socket.emit("joinPrivateRoom", { userId: user, otherUserId });
      console.log("Joined private room:", privateRoomId);
    } else {
      Alert.alert("Error", "Not connected to server. Please try again.");
    }
  }, [user]);

  useEffect(() => {
    const onConnect = () => {
      console.log("Socket connected");
      setIsConnected(true);
      setIsLoading(false);

      // Rejoin room on reconnection
      if (roomId) {
        socket.emit("joinPrivateRoom", { userId: user, otherUserId });
      }
    };

    const onDisconnect = (reason) => {
      console.log("Socket disconnected:", reason);
      setIsConnected(false);

      if (reason === "io server disconnect") {
        Alert.alert(
          "Connection Lost",
          "Server disconnected. Please try again."
        );
      } else if (reason === "transport close") {
        Alert.alert(
          "Connection Lost",
          "Network connection lost. Please check your internet connection."
        );
      } else {
        Alert.alert(
          "Connection Lost",
          "Disconnected from server. Please try again."
        );
      }
    };

    const onConnectError = (error) => {
      console.error("Connection error:", error);
      setIsConnected(false);
      Alert.alert(
        "Connection Error",
        "Failed to connect to server. Please try again."
      );
    };

    const onPrivateRoomHistory = (messages) => {
      console.log("Private room history received:", messages);
      setChatMessages(messages || []);
      setIsLoading(false);
    };

    const onNewPrivateMessage = (messageData) => {
      console.log("New private message received:", messageData);
      setChatMessages((prev) => {
        const messageExists = prev.some((msg) => msg.id === messageData.id);
        if (messageExists) {
          return prev;
        }
        return [...prev, messageData];
      });
    };

    const onUserTyping = ({ userId }) => {
      if (userId !== user) {
        setOtherUserTyping(true);
      }
    };

    const onUserStoppedTyping = ({ userId }) => {
      if (userId !== user) {
        setOtherUserTyping(false);
      }
    };

    const onError = (error) => {
      console.error("Socket error:", error);
      Alert.alert(
        "Error",
        error.message || "An error occurred. Please try again."
      );
      setIsLoading(false);
    };

    // Set up socket event listeners
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onConnectError);
    socket.on("privateRoomHistory", onPrivateRoomHistory);
    socket.on("newPrivateMessage", onNewPrivateMessage);
    socket.on("userTyping", onUserTyping);
    socket.on("userStoppedTyping", onUserStoppedTyping);
    socket.on("error", onError);

    // Initial connection check
    if (socket.connected) {
      setIsConnected(true);
      if (user && otherUserId) {
        const privateRoomId = [user, otherUserId].sort().join("-");
        setRoomId(privateRoomId);
        socket.emit("joinPrivateRoom", { userId: user, otherUserId });
      }
    } else {
      console.log("Socket not connected, attempting to connect...");
      socket.connect();
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error", onConnectError);
      socket.off("privateRoomHistory", onPrivateRoomHistory);
      socket.off("newPrivateMessage", onNewPrivateMessage);
      socket.off("userTyping", onUserTyping);
      socket.off("userStoppedTyping", onUserStoppedTyping);
      socket.off("error", onError);
    };
  }, [user, otherUserId, roomId]);

  const getUsername = async () => {
    try {
      const value = await AsyncStorage.getItem("username");
      if (value !== null) {
        setUser(value);
      }
    } catch (e) {
      console.error("Error while loading username!");
      Alert.alert("Error", "Failed to load user information.");
    }
  };

  const handleNewMessage = () => {
    if (!message.trim() || !roomId) return;
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

    console.log("Sending message:", message);
    console.log("User:", user);

    if (user) {
      const messageData = {
        roomId,
        message: message.trim(),
        user,
        timestamp: { hour, mins },
      };

      try {
        // Emit message to server
        socket.emit("privateMessage", messageData);

        // Clear input
        setMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
        Alert.alert("Error", "Failed to send message. Please try again.");
      }
    }
  };

  const handleTyping = () => {
    if (!roomId || !isConnected) return;
    socket.emit("typing", { roomId, userId: user });
    setIsTyping(true);
  };

  const handleStopTyping = () => {
    if (!roomId || !isConnected) return;
    socket.emit("stopTyping", { roomId, userId: user });
    setIsTyping(false);
  };

  if (isLoading) {
    return (
      <View style={[styles.messagingscreen, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading messages...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.messagingscreen}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View
        style={[
          styles.messagingscreen,
          { paddingVertical: 15, paddingHorizontal: 10 },
        ]}
      >
        {!isConnected && (
          <View style={styles.connectionWarning}>
            <Text style={styles.connectionWarningText}>
              Not connected to server. Messages may not be sent or received.
            </Text>
          </View>
        )}

        {otherUserTyping && (
          <View style={styles.typingIndicator}>
            <Text style={styles.typingText}>{name} is typing...</Text>
          </View>
        )}

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
          onChangeText={(text) => {
            setMessage(text);
            if (!isTyping) {
              handleTyping();
            }
          }}
          onBlur={handleStopTyping}
          placeholder="Type a message..."
          placeholderTextColor="#666"
          onSubmitEditing={handleNewMessage}
          autoCapitalize="none"
          autoCorrect={false}
          editable={isConnected}
          multiline={true}
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
    </KeyboardAvoidingView>
  );
};

export default Messaging;
