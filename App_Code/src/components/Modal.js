import { View, Text, TextInput, Pressable, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import socket from "../utils/socket";
import { styles } from "../utils/styles";

const Modal = ({ setVisible }) => {
  const [groupName, setGroupName] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Check socket connection status
    setIsConnected(socket.connected);

    const onConnect = () => {
      console.log("Socket connected in Modal");
      setIsConnected(true);
    };

    const onDisconnect = () => {
      console.log("Socket disconnected in Modal");
      setIsConnected(false);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const handleCreateRoom = () => {
    if (!isConnected) {
      Alert.alert("Error", "Not connected to server. Please try again.");
      return;
    }

    if (!groupName.trim()) {
      Alert.alert("Error", "Please enter a room name");
      return;
    }

    console.log("Creating room:", groupName);

    // Emit createRoom event
    socket.emit("createRoom", groupName.trim(), (response) => {
      console.log("Room creation response:", response);
      if (response && response.success) {
        setGroupName("");
        setVisible(false);
      } else {
        Alert.alert("Error", response?.message || "Failed to create room");
      }
    });
  };

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalsubheading}>Enter your Group name</Text>
      <TextInput
        style={styles.modalinput}
        placeholder="Group name"
        value={groupName}
        onChangeText={(text) => setGroupName(text)}
        autoCapitalize="none"
        autoCorrect={false}
        editable={true}
        placeholderTextColor="#666"
      />
      <View style={styles.modalbuttonContainer}>
        <Pressable
          style={[
            styles.modalbutton,
            (!isConnected || !groupName.trim()) && { opacity: 0.5 },
          ]}
          onPress={handleCreateRoom}
          disabled={!isConnected || !groupName.trim()}
        >
          <Text style={styles.modaltext}>CREATE</Text>
        </Pressable>
        <Pressable
          style={[styles.modalbutton, { backgroundColor: "#E14D2A" }]}
          onPress={() => setVisible(false)}
        >
          <Text style={styles.modaltext}>CANCEL</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Modal;
