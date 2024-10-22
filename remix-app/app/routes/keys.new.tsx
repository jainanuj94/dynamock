import {ActionFunction, ActionFunctionArgs, json, redirect} from "@remix-run/node";
import {useActionData} from "@remix-run/react";
import {useForm} from "react-hook-form";
import {Form} from "../../components/ui/form";
import {Button} from "../../components/ui/button";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect} from "react";
import InputController from "../../components/controllers/InputController";

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
                <Form  {...form}>
                    <form method={"post"}>
                        <InputController
                            form={form}
                            label={"Unique Key Name"}
                            fieldName={"key"}
                            placeholderLabel={"Unique Key Name"}/>
                        <InputController
                            form={form}
                            label={"Starting Value"}
                            fieldName={"startingValue"}
                            placeholderLabel={"Starting value for your key"}/>
                        <InputController
                            form={form}
                            label={"Increment Rule"}
                            fieldName={"incrementRule"}
                            placeholderLabel={"Increment Rule"}/>
                        <InputController
                            form={form}
                            label={"Custom Rule"}
                            fieldName={"customRule"}
                            placeholderLabel={"Custom Rule"}/>

                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </>
    )
}

export default AddUniqueKey
