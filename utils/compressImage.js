import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

const compressImage = async (uri) => {
  try {
    const manipResult = await manipulateAsync(
      uri,
      [{ resize: { width: 450 } }],
      {
        compress: 0.9,
        format: SaveFormat.JPEG,
      }
    );

    //log on success
    console.log("Image compressed successfully");

    return manipResult;
  } catch (error) {
    console.error("Error compressing image:", error);
    throw error;
  }
};

export default compressImage;
