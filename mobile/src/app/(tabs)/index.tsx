import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>FixPro</Text>
      <Text style={styles.subheading}>Mobile app scaffolded and ready.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  heading: { fontSize: 32, fontWeight: "700", marginBottom: 8 },
  subheading: { fontSize: 16, color: "#666" },
});