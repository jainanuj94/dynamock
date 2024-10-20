import {json} from "@remix-run/react";
import {prisma} from "../../repository/prismaClient";
import {ActionFunction} from "@remix-run/node";

export const loader = async () => {
    const services = await prisma.service.findMany({});
    // Respond with JSON data
    return json({services});
};

export const action: ActionFunction = async ({ request }) => {
    if (request.method !== "POST") {
        return json({ error: "Method not allowed" }, { status: 405 });
    }

    const data = await request.json();

    try {
        const newService = await prisma.service.create({
            data
        });

        return json(newService);
    } catch (error) {
        console.error("Failed to create service:", error);
        return json({ error: "Failed to create service" }, { status: 500 });
    }
};