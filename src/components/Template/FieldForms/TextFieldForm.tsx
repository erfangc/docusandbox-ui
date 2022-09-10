import {FieldFormProps} from "./FieldFormProps";
import {Form} from "formik";
import React from "react";
import {Input} from "../../formik/Input";
import {SecondaryButton} from "../../SecondaryButton";

export function TextFieldForm({field}: FieldFormProps) {
    return (
        <Form>
            <h4 className="text-lg font-bold">{field.name}</h4>
            <p className="text-sm text-gray-700">{field.type}</p>
            <div className="mt-6">
                <Input name="autoFillFormula" label="Autofill Formula"/>
            </div>
            <br/>
            <SecondaryButton type="submit">Save</SecondaryButton>
        </Form>
    );
}