import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../../components/ui/form";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "../../components/ui/input";
import {Button} from "../../components/ui/button";

const fields = [
    {
        fieldName: "serviceName",
        label: "Service Name"
    },
    {
        fieldName: "httpMethod",
        label: "Http Method"
    },
    {
        fieldName: "baseUrl",
        label: "Base URL"
    },
    {
        fieldName: "path",
        label: "Path"
    },
    {
        fieldName: "uniqueKey",
        label: "Unique Key"
    },
    {
        fieldName: "uniqueKeyLocation",
        label: "Unique Key Location"
    },
    {
        fieldName: "uniqueKeyPath",
        label: "Unique Key Path"
    },
    {
        fieldName: "defaultTo",
        label: "Default To"
    }
]
const formSchema = z.object({
    serviceName: z.string().min(1),
    httpMethod: z.string().min(1),
    baseUrl: z.string().min(1),
    defaultTo: z.string().min(1),
    path: z.string().min(1),
    uniqueKey: z.string().min(1),
    uniqueKeyLocation: z.string().min(1),
    uniqueKeyPath: z.string().min(1),
})

const AddService = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            serviceName: '',
            httpMethod: '',
            baseUrl: '',
            defaultTo: '',
            path: '',
            uniqueKey: '',
            uniqueKeyLocation: '',
            uniqueKeyPath: ''
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const res = await fetch("/api/service", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            await res.json();
        }catch (e: never){
            console.log(e);
        }
    }

    return (
        <>
            <h1 className={"text-gray-900 font-extrabold text-3xl"}>Add New Service</h1>

            <div className={"flex items-center justify-between"}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4 w-fit">
                        { fields.map((obj : {fieldName: string, label: string}, index: number) => (
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            <FormField
                                key={index}
                                control={form.control}
                                name={obj.fieldName}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className={"float-left"}>{obj.label}</FormLabel>
                                        <FormControl>
                                            <Input {...field} key={index} className={"text-gray-200 w-full float-end"}/>
                                        </FormControl>
                                        <FormMessage className={"text-red-700"}/>
                                    </FormItem>
                                )}
                            />

                        ))}
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </>
    )
};

export default AddService;