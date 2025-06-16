import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

export default function ChatList({ navigation }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchChats = async () => {
    try {
      const sessionId = await AsyncStorage.getItem("session_id");
      const userId = await AsyncStorage.getItem("user_id");

      if (!sessionId || !userId) {
        console.error("Missing session ID or user ID");
        setIsLoading(false);
        return;
      }

      const res = await fetch("http://172.20.10.4:5000/chat/overview", {
        method: "POST",
        headers: {
          "X-Session-ID": sessionId,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setChats(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching chats:", error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchChats();
  };

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search chats..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={styles.searchBar}
        placeholderTextColor="#666"
      />
      <FlatList
        data={filteredChats}
        keyExtractor={(item, index) =>
          (item._id || item.id || item.name || index.toString()).toString()
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() => navigation.navigate("Chat", { chatName: item.name })}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {item.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.chatInfo}>
              <Text style={styles.chatName}>{item.name}</Text>
              <Text style={styles.chatMsg} numberOfLines={1}>
                {item.lastMessage}
              </Text>
            </View>
            {item.unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadCount}>{item.unreadCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No chats found</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4CAE0",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  searchBar: {
    backgroundColor: "#fff",
    padding: 12,
    margin: 16,
    borderRadius: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    fontSize: 16,
  },
  chatItem: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    backgroundColor: "#90A8C3",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  chatMsg: {
    fontSize: 14,
    color: "#666",
  },
  unreadBadge: {
    backgroundColor: "#128C7E",
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  unreadCount: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 6,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});
