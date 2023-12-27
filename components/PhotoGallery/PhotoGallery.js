import { useTheme } from "@react-navigation/native";
import { Image, StyleSheet, Text, View } from "react-native";

export const PhotoGallery = ({ images }) => {
  /** Contexts */
  const { colors } = useTheme();

  return (
    <View>
      <Text style={[styles.header, { color: colors.text }]}>Images</Text>
      {images.map((image) => (
        <Image
          key={image.id}
          source={{ uri: image.imageUrl }}
          style={styles.img}
          testID={`image-${image.id}`}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: undefined,
    aspectRatio: 16 / 9,
    marginBottom: 10,
    resizeMode: "cover",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default PhotoGallery;
