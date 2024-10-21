import {Link, useLoaderData} from "@remix-run/react";
import {Button} from "~/components/ui/button";
import {json, LoaderFunction} from "@remix-run/node";

export const loader: LoaderFunction = async () => {
    const response = await fetch("http://localhost:5173/api/keys");
    if (!response.ok) {
        throw new Error("Failed to fetch unique keys");
    }
    return json(await response.json());
};


const Keys_index = () => {
    const { uniqueKeys }  = useLoaderData<typeof loader>();
    return (
        <>
            <h1 className={"text-gray-900 font-extrabold text-3xl"}>Unique Keys</h1>
            <p className={"text-gray-900 text-xl pb-4 pt-4"}>
                Manage your unique keys from here. Add, remove, modify and the unique keys
                for your APIs here.
            </p>

            <div className={"flex flex-col flex-wrap justify-between gap-16 m-4"}>
                <Link to={'/keys/new'}>
                    <Button className={"float-right"}>Add Unique Key</Button>
                </Link>
                <ul>
                    {uniqueKeys && uniqueKeys.map((uniqueKey: { key: string, startingValue: string }) => (
                        <li key={uniqueKey.key}>
                            {uniqueKey.key} - {uniqueKey.startingValue}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Keys_index;