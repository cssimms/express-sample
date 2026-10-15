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
const DEV_URL = "http://localhost:3000";

const seedUsers = async (url: string, userList: User[]) => {
  for (const userData of userList) {
    console.log("Sending ...", userData);

    const userResponse = await fetch(`${url}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!userResponse.ok) {
      console.log("Failed to create user: ", userData.name);
      console.log("Error response: ", userResponse);
    }
  }
};

const parseEnv = (): "PROD" | "DEV" => {
  const arg = Bun.argv.slice(2).find((a) => a.startsWith("--env="));
  const value = arg?.slice("--env=".length).toUpperCase();

  if (value !== "PROD" && value !== "DEV") {
    console.error("Usage: bun run seed-users.ts --env=PROD|DEV");
    process.exit(1);
  }

  return value;
};

const seedDev = async (userList: User[]) => {
  console.log("Creating seed users on development...");
  await seedUsers(DEV_URL, userList);

  console.log("Users created in development.");
};

const seedProduction = async (userList: User[]) => {
  console.log("Creating seed users on production...");
  await seedUsers(PROD_URL, userList);

  console.log("Users created in production.");
};

const env = parseEnv();

if (env === "PROD") {
  await seedProduction(SEED_USERS);
} else {
  await seedDev(SEED_USERS);
}
