import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

const ChatGPT = () => {
  const [data, setData] = useState([]);
  const apiKey = [GPT_PERSONAL_KEY];
  const apiUrl =
    "https://api.openai.com/v1/engines/text-davinci-002/completions";
  const [textInput, setTextInput] = useState("");

  const handleSend = async () => {
    const prompt = textInput;
    const response = await axios.post(
      apiUrl,
      {
        prompt: prompt,
        max_tokens: 1024,
        temperature: 0.5,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );
    const text = response.data.choices[0].text;
    setData([
      ...data,
      { type: "user", text: textInput },
      { type: "bot", text: text },
    ]);
    setTextInput("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HEY WALLY 😀</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        style={styles.body}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", padding: 10 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                color: item.type === "user" ? "#F652A0" : "#059DC0",
              }}
            >
              {item.type === "user" ? "Yan" : "Wally"}
            </Text>
            <Text style={styles.bot}>: {item.text}</Text>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Talk to Wally"
        value={textInput}
        onChangeText={(text) => setTextInput(text)}
      />
      <TouchableOpacity style={styles.botton} onPress={handleSend}>
        <Text style={styles.bottonText}>SEND TALK</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatGPT;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6DECE0",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4C5270",
    marginTop: 70,
    marginBottom: 10,
  },
  body: {
    backgroundColor: "#BCECE0",
    width: "95%",
    margin: 10,
    borderRadius: 10,
  },
  bot: {
    fontSize: 16,
    color: "#4C5270",
  },
  input: {
    backgroundColor: "#BCECE0",
    width: "95%",
    marginBottom: 10,
    height: 60,
    fontSize: 16,
    color: "#4C5270",
    borderRadius: 10,
  },
  botton: {
    backgroundColor: "#F652A0",
    width: "90%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16,
    color: "#4C5270",
    borderRadius: 10,
    marginBottom: 20,
  },
  bottonText: {
    fontSize: 20,
    color: "#4C5270",
    textAlign: "center",
    fontWeight: "bold",
  },
});
