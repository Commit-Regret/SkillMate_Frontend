import { View, Text, Pressable } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../utils/styles";

const ChatComponent = ({ item, onlineUsers, currentUser }) => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState({});
  const [isOnline, setIsOnline] = useState(false);

  useLayoutEffect(() => {
    setMessages(item.messages[item.messages.length - 1]);

    const checkOnlineStatus = () => {
      if (onlineUsers && item.users) {
        const onlineInRoom = item.users.some((userId) =>
          onlineUsers.some(
            (onlineUser) =>
              onlineUser.id === userId && onlineUser.status === "online"
          )
        );
        setIsOnline(onlineInRoom);
      }
    };

    checkOnlineStatus();
  }, [item, onlineUsers]);

  const handleNavigation = () => {
    navigation.navigate("Messaging", {
      id: item.id,
      name: item.name,
      users: item.users,
      currentUser: currentUser,
    });
  };

  return (
    <Pressable style={styles.cchat} onPress={handleNavigation}>
      <View style={styles.avatarContainer}>
        <Ionicons
          name="person-circle-outline"
          size={45}
          color="black"
          style={styles.cavatar}
        />
        {isOnline && <View style={styles.onlineIndicator} />}
      </View>

      <View style={styles.crightContainer}>
        <View>
          <Text style={styles.cusername}>{item.name}</Text>
          <Text style={styles.cmessage}>
            {messages?.text ? messages.text : "Tap to start chatting"}
          </Text>
        </View>
        <View>
          <Text style={styles.ctime}>
            {messages?.time ? messages.time : "now"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatComponent;
