export const getDummyImage = (user) => {
  const nameLetters = user?.firstName?.split("");
  const firstLetter = nameLetters[0];

  return firstLetter;
};

export function formatDate(inputDate) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(inputDate);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  const formattedDate = day + " " + months[monthIndex] + ", " + year;
  return formattedDate;
}
