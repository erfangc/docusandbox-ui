import {FieldFormProps} from "../../pages/Template";
import {Form, Formik} from "formik";
import {FormikHelpers} from "formik/dist/types";
import {Field} from "./Field";

export function FieldForm({field, onChange}: FieldFormProps) {
    
    function handleSubmit(values: Field, formikHelpers: FormikHelpers<Field>) {
        
    }

    return (
        <Formik initialValues={field} onSubmit={handleSubmit}>
            {({}) => (
                <Form>
                    
                </Form>
            )}
        </Formik>
    );
    
}