export const originalImage = (imagePath: string) => {
  if (!imagePath) return "#";
  return `https://image.tmdb.org/t/p/original/${imagePath}`;
};
export const w500Image = (imagePath: string) => {
  return `https://image.tmdb.org/t/p/w500/${imagePath}`;
};
