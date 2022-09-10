import {FieldFormProps} from "./FieldFormProps";
import {Form, useFormikContext} from "formik";
import {SelectOperator} from "./SelectOperator";
import React, {useEffect} from "react";
import {Input} from "../../formik/Input";
import {SecondaryButton} from "../../SecondaryButton";
import {Field} from "../models/Field";

export function CheckBoxForm({field}: FieldFormProps) {
    const {initialValues, values, resetForm} = useFormikContext<Field>();
    const operator = values.autoCheckIf?.operator;

    useEffect(() => {
        if (initialValues !== field) {
            resetForm();
        }
    }, [initialValues, field]);

    return (
        <Form>
            <h4 className="text-lg font-bold">{field.name}</h4>
            <p className="text-sm text-gray-700">{field.type}</p>
            <div className="flex flex-col space-y-6 mt-6">
                <Input label="Formula" name="autoCheckIf.formula"/>
                <SelectOperator name="autoCheckIf.operator"/>
                {
                    operator === 'EQUALS' && <Input name="autoCheckIf.equals" label="Equals"/>
                }
                {
                    (operator === 'LESS_THAN' || operator === 'IS_BETWEEN') &&
                    <Input name="autoCheckIf.lessThan"/>
                }
                {
                    (operator === 'GREATER_THAN' || operator === 'IS_BETWEEN') &&
                    <Input name="autoCheckIf.greaterThan"/>
                }
            </div>
            <br/>
            <SecondaryButton type="submit">Save</SecondaryButton>
        </Form>
    );

}

