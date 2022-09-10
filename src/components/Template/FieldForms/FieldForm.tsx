import React from "react";
import {FieldFormProps} from "./FieldFormProps";
import {TextFieldForm} from "./TextFieldForm";
import {CheckBoxForm} from "./CheckBoxForm";
import {RadioBoxForm} from "./RadioBoxForm";
import {Formik} from "formik";
import {Field} from "../models/Field";

export function FieldForm({field, onChange}: FieldFormProps) {

    const type = field.type;
    let childForm = null;

    if (type === 'TEXT_FIELD') {
        childForm = <TextFieldForm field={field} onChange={onChange}/>;
    } else if (type === 'CHECK_BOX') {
        childForm = <CheckBoxForm field={field} onChange={onChange}/>;
    } else if (type === 'RADIO_BOX') {
        childForm = <RadioBoxForm field={field} onChange={onChange}/>;
    }

    const initialValues: Field = {
        ...field,
        autoFillFormula: field.autoFillFormula || '',
    };

    return (
        <Formik initialValues={initialValues} onSubmit={onChange} enableReinitialize>
            {childForm}
        </Formik>
    );

}
