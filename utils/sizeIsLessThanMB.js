import * as FileSystem from "expo-file-system";
const sizeIsLessThanMB = async (uri, maxSizeMB) => {
  const fileSize = await getFileSize(uri);

  const convertBytesToMegabytes = (bytes) => {
    const megabytes = bytes / (1024 * 1024);
    return megabytes;
  };

  const size = convertBytesToMegabytes(fileSize);

  return size < maxSizeMB;
};

const getFileSize = async (fileUri) => {
  let fileInfo = await FileSystem.getInfoAsync(fileUri);
  return fileInfo.size;
};

export default sizeIsLessThanMB;
