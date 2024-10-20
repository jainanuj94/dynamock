import {Button} from "~/components/ui/button";
import {Link, useLoaderData} from "@remix-run/react";
import {LoaderFunction, json} from "@remix-run/node";

export const loader: LoaderFunction = async () => {
    const response = await fetch("http://localhost:5173/api/service");
    if (!response.ok) {
        throw new Error("Failed to fetch services");
    }
    return json(await response.json());
};

export default function index() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { services } = useLoaderData<typeof loader>();

    return (
        <>
            <h1 className={"text-gray-900 font-extrabold text-3xl"}>Services</h1>
            <p className={"text-gray-900 text-xl pb-4 pt-4"}>
                Add/Remove service(s)/ API(s) from being mocked. This page maintains a
                list of services and their configurations.
            </p>

            <hr/>

            <div className={"flex flex-col flex-wrap justify-between gap-16 m-4"}>
                <Button className={"float-right"}><Link to={'/service/new'}>Add Service</Link></Button>
                <ul>
                    {services && services.map((service: {id: number, serviceName: string}) => (
                        <li key={service.id}>
                            {service.id} - {service.serviceName}
                        </li>
                    ))}
                </ul>
            </div>


        </>
    )
};

// export default index;