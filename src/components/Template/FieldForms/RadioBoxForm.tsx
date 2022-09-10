import {FieldFormProps} from "./FieldFormProps";
import {FieldArray, Form, useFormikContext} from "formik";
import React, {useEffect} from "react";
import {Input} from "../../formik/Input";
import {SelectOperator} from "./SelectOperator";
import {SecondaryButton} from "../../SecondaryButton";
import {Field} from "../models/Field";

export function RadioBoxForm({field}: FieldFormProps) {
    
    const {values, initialValues, resetForm} = useFormikContext<Field>();
    
    useEffect(() => {
        if (initialValues !== field) {
            resetForm()
        }
    }, [initialValues, field]);
    
    return (
        <Form>
            <h4 className="text-lg font-bold">{field.name}</h4>
            <p className="text-sm text-gray-700">{field.type}</p>
            <FieldArray name="radioOptions">
                {() => (
                    <div className="mt-4 space-y-4">
                        {values.radioOptions &&
                            values.radioOptions.map((radioOption, index) => {
                                const operator = radioOption.autoCheckIf?.operator;
                                return (
                                    <div key={`radioOptions.${index}.autoCheckIf`} className="flex flex-col space-y-6">
                                        <p className="text-sm text-gray-800">{radioOption.value}</p>
                                        <Input
                                            label="Formula"
                                            name={`radioOptions.${index}.autoCheckIf.formula`}
                                        />
                                        <SelectOperator name={`radioOptions.${index}.autoCheckIf.operator`}/>
                                        {
                                            operator === 'EQUALS' &&
                                            <Input
                                                name={`radioOptions.${index}.autoCheckIf.equals`}
                                                label="Equals"
                                            />
                                        }
                                        {
                                            (operator === 'LESS_THAN' || operator === 'IS_BETWEEN') &&
                                            <Input name={`radioOptions.${index}.autoCheckIf.lessThan`}/>
                                        }
                                        {
                                            (operator === 'GREATER_THAN' || operator === 'IS_BETWEEN') &&
                                            <Input name={`radioOptions.${index}.autoCheckIf.greaterThan`}/>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                )}
            </FieldArray>
            <br/>
            <SecondaryButton type="submit">Save</SecondaryButton>
        </Form>
    );
}