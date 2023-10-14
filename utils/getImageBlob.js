import * as FileSystem from "expo-file-system";

const getImageBlob = async (uri) => {
  const originalUri = uri;
  const fileName = uri.substring(uri.lastIndexOf("/") + 1);
  const newUri = `${FileSystem.documentDirectory}resumableUploadManager-${fileName}.toupload`;
  await FileSystem.copyAsync({ from: originalUri, to: newUri });
  return (blob = new Blob([await (await fetch(uri)).blob()], {
    type: "image/jpeg",
  }));
};

export default getImageBlob;
