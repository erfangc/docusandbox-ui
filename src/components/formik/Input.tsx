import {useField} from "formik";
import React from "react";
import {InputProps} from "./InputProps";

export const Input = ({name, label, labelClassNames, ...props}: InputProps) => {
    const [field, meta, _] = useField<any>(name as string);
    if (label) {
        return (
            <label className={labelClassNames ?? 'text-sm text-gray-600'}>
                <p>{label}</p>
                <input className='mr-4 rounded py-1.5 px-2 border-gray-600 border' {...field} {...props}/>
                {
                    meta.touched && meta.error
                        ? (
                            <div>
                                {meta.error}
                            </div>
                        )
                        : null
                }
            </label>
        );        
    } else {
        return (
            <div>
                <input className='mr-4 rounded py-1.5 px-2 border-gray-600 border' {...field} {...props}/>
                {
                    meta.touched && meta.error
                        ? (
                            <div>
                                {meta.error}
                            </div>
                        )
                        : null
                }
            </div>
        )
    }
};