import csvParser from "csv-parser";
import { createObjectCsvWriter } from "csv-writer";
import fs from "fs";
import path from "path";

export interface Person {
  name: string;
  birthday: string;
  phone: string;
  message: string;
}

// Read from a CSV file
export const readCsv = async (filename: string): Promise<Person[]> => {
  const results: Person[] = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filename)
      .pipe(csvParser())
      .on("data", (data: Person) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error: Error) => reject(error));
  });
};

// Write to a CSV file
export const writeCsv = async (
  filename: string,
  data: Person[]
): Promise<void> => {
  const csvWriter = createObjectCsvWriter({
    path: filename,
    header: [
      { id: "name", title: "Name" },
      { id: "birthday", title: "Birthday" },
      { id: "phone", title: "Phone" },
      { id: "message", title: "Message" },
    ],
  });
  return csvWriter.writeRecords(data);
};

// Read from CSV file
export const getBirthdayRows = async (filename: string) => {
  const today = new Date();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();

  const matchBirthdays = (people: Person[]): Person[] => {
    return people.filter((person: Person) => {
      const [, bdayMonthStr, bdayDayStr] = person.birthday.split("-");
      const csvRowMonth = Number(bdayMonthStr);
      const csvRowDay = Number(bdayDayStr);
      return csvRowMonth === todayMonth && todayDay === csvRowDay;
    });
  };

  // Usage example
  const allPeople = await readCsv(filename).catch((error: Error) =>
    console.error(error)
  );

  if (allPeople) {
    return matchBirthdays(allPeople);
  }

  const results: Person[] = [];  
  return results;
};

// Usage example
// const filename = path.join(__dirname, "birthdays.csv");
// getBirthdayRows(filename);

// Write to CSV file
// const data: Person[] = [
//   { name: "John", birthday: "1990-01-01", phone: "123-456-7890" },
//   { name: "Jane", birthday: "1995-05-05", phone: "555-555-5555" },
// ];

// writeCsv(filename, data)
//   .then(() => console.log("Data written to CSV file"))
//   .catch((error: Error) => console.error(error));
