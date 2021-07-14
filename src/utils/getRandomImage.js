export const getRandomImage = () => {
  const random = Math.floor(Math.random() * 200) + 1;
  return `https://picsum.photos/200/300?random=${random}`;
};
