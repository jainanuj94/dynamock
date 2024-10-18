import {Button} from "~/components/ui/button";
import {Link} from "@remix-run/react";

const index = () => {
    return (
        <>
            <h1 className={"text-gray-900 font-extrabold text-3xl"}>Services</h1>
            <p className={"text-gray-900 text-xl pb-4 pt-4"}>
                Add/Remove service(s)/ API(s) from being mocked. This page maintains a
                list of services and their configurations.
            </p>

            <hr/>

            <div className={"flex flex-wrap justify-between gap-16 m-4"}>
                <Button className={"float-right"}><Link to={'/service/new'}>Add Service</Link></Button>
            </div>


        </>
    )
};

export default index;