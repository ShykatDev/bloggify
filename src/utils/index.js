export const getDummyImage = (user) => {
  const nameLetters = user?.firstName?.split("");
  const firstLetter = nameLetters[0];

  return firstLetter;
};
