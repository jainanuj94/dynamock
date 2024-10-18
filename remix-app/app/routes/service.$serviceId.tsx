import {useParams} from "react-router";

const ServiceDetails = () => {
    const { serviceId } = useParams();

    return (
        <>
            <h1>Service Details: {serviceId}</h1>
        </>
    )
}

export default ServiceDetails;