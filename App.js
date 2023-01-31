import { StyleSheet, View } from "react-native";
import ChatGPT from "./src";
export default function App() {
  return (
    <View style={styles.container}>
      <ChatGPT />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
