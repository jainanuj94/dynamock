import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "../ui/form";
import {Input} from "../ui/input";
import {UseFormReturn} from "react-hook-form";

const InputController = ({label, form, fieldName, placeholderLabel} : {
    label: string,
    placeholderLabel?: string,
    fieldName: string,
    form: UseFormReturn<any>
}) => {
    return (
        <>
            <FormField
                control={form.control}
                name={fieldName}
                render={({field}) => (
                    <FormItem>
                        <FormLabel className={"float-left"}>{label}</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder={placeholderLabel} className={"text-gray-200 w-full float-end"}/>
                        </FormControl>
                        <FormMessage className={"text-red-700"}/>
                    </FormItem>
                )}
            />
        </>
    )
}

export default InputController;