import {
  uniqueNamesGenerator,
  animals,
  colors,
  NumberDictionary,
} from "unique-names-generator";

const numberDictionary = NumberDictionary.generate({ min: 0, max: 999 });
export const generateReadableId = () => {
  return uniqueNamesGenerator({
    dictionaries: [colors, animals, numberDictionary],
    length: 3,
    separator: "-",
    style: "lowerCase",
  });
};
