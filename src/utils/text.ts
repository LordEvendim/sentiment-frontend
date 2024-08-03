export const capitalizeFirstLetter = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const separateThousands = (text: number | string) =>
  text.toLocaleString("en").replaceAll(",", " ");
