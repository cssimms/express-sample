import type { User } from "../types";

const SEED_USERS: User[] = [
  { name: "Ada Lovelace" },
  { name: "Grace Hopper" },
  { name: "Alan Turing" },
  { name: "Margaret Hamilton" },
  { name: "Linus Torvalds" },
  { name: "Katherine Johnson" },
  { name: "Dennis Ritchie" },
  { name: "Barbara Liskov" },
  { name: "Ken Thompson" },
  { name: "Radia Perlman" },
];
const PROD_URL = "https://express-sample-a5je.onrender.com";

const seedProduction = async (userList: User[]) => {
  console.log("Creating seed users on production...");

  userList.forEach(async (userData) => {
    const userResponse = await fetch(`${PROD_URL}/users`, {
      method: "POST",
      body: JSON.stringify(userData),
    });

    if (userResponse.ok) {
      console.log("Failed to create user: ", userData.name);
      console.log("Error response: ", userResponse);
    }
  });
};

seedProduction(SEED_USERS);
