import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import socket from "../utils/socket";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ChatScreen({ route, navigation }) {
  const { chatName } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [conversationId, setConversationId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const setupChat = async () => {
      try {
        const userId = await AsyncStorage.getItem("user_id");
        setUserId(userId);

        if (!socket.connected) {
          socket.connect();
        }

        socket.emit("join_chat", {
          user_id: userId,
          other_user_id: chatName,
        });

        socket.on("chat_history", (msgs) => {
          if (Array.isArray(msgs)) {
            const formatted = msgs.map((msg) => ({
              id: (
                msg._id ||
                msg.id ||
                `${msg.sender_id}-${msg.timestamp}`
              ).toString(),
              from: msg.sender_id === userId ? "user" : "other",
              text: msg.content,
              timestamp: msg.timestamp || new Date().toISOString(),
            }));
            setMessages(formatted);
          }
          setIsLoading(false);
        });

        // socket.on("receive_message", (data) => {
        //   console.log("Received new message:", data);
        //   const from = data.sender_id === userId ? "user" : "other";
        //   setMessages((prev) => [
        //     ...prev,
        //     {
        //       id: (
        //         data._id ||
        //         data.id ||
        //         `${data.sender_id}-${data.timestamp}`
        //       ).toString(),
        //       from,
        //       text: data.content,
        //       timestamp: data.timestamp || new Date().toISOString(),
        //     },
        //   ]);
        // });

        socket.on("receive_message", (data) => {
          const messageId = (
            data._id ||
            data.id ||
            `${data.sender_id}-${data.timestamp}`
          ).toString();

          setMessages((prev) => {
            const alreadyExists = prev.some((msg) => msg.id === messageId);
            if (alreadyExists) return prev;

            const from = data.sender_id === userId ? "user" : "other";

            return [
              ...prev,
              {
                id: messageId,
                from,
                text: data.content,
                timestamp: data.timestamp || new Date().toISOString(),
              },
            ];
          });
        });

        socket.on("joined_chat", (data) => {
          setConversationId(data.conversation_id);

          socket.emit("fetch_messages", {
            conversation_id: data.conversation_id,
          });
        });
      } catch (error) {
        console.error("Error setting up chat:", error);
        setIsLoading(false);
      }
    };

    setupChat();

    return () => {
      socket.off("chat_history");
      socket.off("receive_message");
      socket.off("joined_chat");
    };
  }, [chatName]);

  const sendMessage = () => {
    if (!newMessage.trim() || !conversationId || !userId) return;

    const messageData = {
      conversation_id: conversationId,
      sender_id: userId,
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    // console.log(`jaa rha msg` , messageData);

    // setMessages((prev) => [
    //   ...prev,
    //   {
    //     id: Date.now().toString(),
    //     from: "user",
    //     text: newMessage.trim(),
    //     timestamp: messageData.timestamp,
    //   },
    // ]);

    socket.emit("send_message", messageData);
    setNewMessage("");
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.message,
              item.from === "user" ? styles.userMessage : styles.otherMessage,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.timestamp}>
              {new Date(item.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
        )}
        inverted={false}
      />
      <View style={styles.inputContainer}>
        <TextInput
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
          style={styles.input}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          onPress={sendMessage}
          style={[
            styles.sendButton,
            !newMessage.trim() && styles.sendButtonDisabled,
          ]}
          disabled={!newMessage.trim()}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    padding: 12,
    margin: 8,
    borderRadius: 16,
    maxWidth: "75%",
    elevation: 1,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
  },
  messageText: {
    fontSize: 16,
    color: "#000000",
  },
  timestamp: {
    fontSize: 12,
    color: "#666666",
    marginTop: 4,
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  input: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: "#128C7E",
    borderRadius: 20,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonDisabled: {
    backgroundColor: "#CCCCCC",
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
