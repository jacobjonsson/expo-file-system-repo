import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

export default function App() {
  const [permission, askForPermission] =
    ImagePicker.useMediaLibraryPermissions();

  async function handlePress() {
    await askForPermission();

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });

    if (result.canceled || !result.assets[0]) {
      return;
    }

    try {
      await FileSystem.uploadAsync(
        "https://httpbin.org/post",
        result.assets[0].uri,
        {
          fieldName: "file",
          mimeType: "image/jpeg",
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Text>Open picker</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
