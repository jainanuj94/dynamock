import {ActionFunction, ActionFunctionArgs, json, redirect} from "@remix-run/node";
import {useActionData} from "@remix-run/react";
import {useForm} from "react-hook-form";
import {Form as SchadCnForm, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../../components/ui/form";
import {Input} from "../../components/ui/input";
import {Button} from "../../components/ui/button";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect} from "react";

export const action: ActionFunction = async ({request}: ActionFunctionArgs) => {
    const formData = await request.formData();
    const formValues = Object.fromEntries(formData);

    // Server-side validation
    const validationResult = formSchema.safeParse(formValues);
    if (!validationResult.success) {
        return json({errors: validationResult.error.flatten().fieldErrors, values: formValues});
    }

    // Process valid data (e.g., save to a database)
    try {
        const res = await fetch("http://localhost:5173/api/keys", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formValues),
        });

        await res.json();
    }catch (e) {
        console.log("Error processing form data:", e);
        return json({errors: ["There was an error processing your form."]})
    }

    return redirect("/keys");
}

const formSchema = z.object({
    key: z.string().min(1),
    startingValue: z.string(),
    incrementRule: z.string().nullable(),
    customRule: z.string().nullable()
});


const AddUniqueKey = () => {
    const actionData = useActionData<typeof action>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: actionData?.values || {
            key: '',
            startingValue: '',
            incrementRule: '',
            customRule: ''
        },
    });

    useEffect(() => {
        console.log("sd",actionData)
        if (actionData?.errors) {
            Object.keys(actionData.errors).forEach((key) => {
                form.setError(key, {message: actionData.errors[key]});
            });
        }
    }, [actionData, actionData?.errors, form])


    return (
        <>
            <h1 className={"text-gray-900 font-extrabold text-3xl"}>Add Unique Key</h1>
            <hr/>
            <div className={"flex items-center justify-between"}>
                <SchadCnForm  {...form}>
                    <form method={"post"}>
                        <FormField
                            control={form.control}
                            name="key"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Unique Key Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Unique Key Name" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="startingValue"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Starting Value</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Starting value for your key" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="incrementRule"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Increment Rule</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Increment Rule" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="customRule"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Custom Rule</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Custom Rule" {...field} />
                                    </FormControl>
                                    <FormMessage className={"text-red-700"}/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </SchadCnForm>
            </div>
        </>
    )
}

export default AddUniqueKey
