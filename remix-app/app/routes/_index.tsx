import type {MetaFunction} from "@remix-run/node";
import Layout from "../../layouts/Layout";

export const meta: MetaFunction = () => {
    return [
        {title: "New Remix App"},
        {name: "description", content: "Welcome to Remix!"},
    ];
};

export default function Index() {
    return (
        <>
            <h1 className={"text-gray-900 text-3xl font-extrabold"}>Dynamock</h1>
            <p className={"text-gray-700 text-xl font-semibold"}>
                Welcome to dynamock! The best in class mocking framework.
            </p>
        </>
    );
}
