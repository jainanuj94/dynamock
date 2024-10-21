import {json} from "@remix-run/react";
import {prisma} from "../../repository/prismaClient";
import {ActionFunction} from "@remix-run/node";

export const loader = async () => {
    const uniqueKeys = await prisma.uniqueKey.findMany({});
    // Respond with JSON data
    return json({uniqueKeys});
};

export const action: ActionFunction = async ({ request }) => {
    if (request.method !== "POST") {
        return json({ error: "Method not allowed" }, { status: 405 });
    }

    const data = await request.json();

    try {
        const newService = await prisma.uniqueKey.create({
            data
        });

        return json(newService);
    } catch (error) {
        console.error("Failed to create unique key:", error);
        return json({ error: "Failed to create unique key" }, { status: 500 });
    }
};