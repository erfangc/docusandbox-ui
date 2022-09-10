import React from "react";
import {useField} from "formik";
import {Operator} from "../models/Operator";

export function SelectOperator({
                                   name,
                                   ...props
                               }: React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>) {
    const [input, , ] = useField<Operator>(name as string);
    return (
        <select
            {...input}
            {...props}
        >
            <option value={undefined}></option>
            <option value='GREATER_THAN'>GREATER_THAN</option>
            <option value='LESS_THAN'>LESS_THAN</option>
            <option value='EQUALS'>EQUALS</option>
            <option value='IS_ONE_OF'>IS_ONE_OF</option>
            <option value='IS_BETWEEN'>IS_BETWEEN</option>
        </select>
    );
}