import { NextResponse } from "next/server";
import { seedRestaurantData } from "@/lib/seed-data";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");
    const adminKey = process.env.ADMIN_KEY;

    if (!adminKey || key !== adminKey) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    try {
        await seedRestaurantData();
        return NextResponse.json({ success: true, message: "Data seeded successfully" });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
