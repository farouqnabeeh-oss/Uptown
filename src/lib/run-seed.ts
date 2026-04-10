import { seedRestaurantData } from "./seed-data";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function run() {
    console.log("Starting seed process...");
    try {
        await seedRestaurantData();
        console.log("Seeding completed successfully!");
    } catch (error) {
        console.error("Seeding failed:", error);
    }
}

run();
