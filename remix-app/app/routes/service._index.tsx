import {Button} from "~/components/ui/button";
import {Link, useLoaderData} from "@remix-run/react";
import {json, LoaderFunction} from "@remix-run/node";
import {DataTable} from "../../components/DataTable";
import {serviceColumns} from "~/types/services";

export const loader: LoaderFunction = async () => {
    const response = await fetch("http://localhost:5173/api/service");
    if (!response.ok) {
        throw new Error("Failed to fetch services");
    }
    return json(await response.json());
};

export default function index() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {services} = useLoaderData<typeof loader>();

    return (
        <>
            <h1 className={"text-gray-900 font-extrabold text-3xl"}>Services</h1>
            <p className={"text-gray-900 text-xl pb-4 pt-4"}>
                Add/Remove service(s)/ API(s) from being mocked. This page maintains a
                list of services and their configurations.
            </p>

            <hr/>

            <div className={"flex flex-col flex-wrap justify-between gap-16 m-4"}>
                <Link to={'/service/new'}>
                    <Button className={"float-right"}>Add Service</Button>
                </Link>
                <div className="container mx-auto py-10">
                    <DataTable columns={serviceColumns} data={services}/>
                </div>
            </div>


        </>
    )
}

// export default index;