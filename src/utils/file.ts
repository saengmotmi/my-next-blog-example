export const getFilenameWithoutExtension = (filename: string) => {
  const NOT_EXIST = -1;

  const extensionDotIndex = filename.lastIndexOf(".");
  if (extensionDotIndex === NOT_EXIST) {
    return filename;
  }
  const nameWithoutExtension = filename.slice(0, extensionDotIndex);

  return nameWithoutExtension;
};
