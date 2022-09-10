import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {PrimaryButton} from "../components/PrimaryButton";
import {Field} from "../components/Template/models/Field";
import {Input} from "../components/formik/Input";
import {Form as FormikForm, Formik} from "formik";

interface Template {
    filename: string
    fields?: Field[]
}

interface Form {
    formId: string
    templateFilename: string,
    envelopeId?: string,
    documentBase64: string,
    filename: string,
    input: { [key: string]: any },
    recipientEmail: string,
    recipientName: string,
}

export function Form() {

    const [template, setTemplate] = useState<Template>();
    const {templateFilename, formId} = useParams();
    const [form, setForm] = useState<Form>();

    useEffect(() => {
        fetch(`/api/templates/${templateFilename}`)
            .then(resp => resp.json())
            .then(json => setTemplate(json))
            .catch(reason => alert(reason));
        fetch(`/api/forms/${formId}`)
            .then(resp => resp.json())
            .then(json => setForm(json))
            .catch(reason => alert(reason));
    }, []);

    const updateInput = (input: any) => {
        fetch(
            `/api/forms/${formId}`,
            {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(input),
            }
        ).then(resp => resp.json()).then(json => setForm(json)).catch(reason => alert(reason));
    };
    const [loading, setLoading] = useState(false);

    const signForm = async () => {
        setLoading(true);
        try {
            await fetch(`/api/forms/${formId}/signings`, {method: 'PUT'});
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const fields = (template?.fields || [])
        .map(field => {
            const type = field.type;
            switch (type) {
                case "CHECK_BOX":
                    return <Input key={field.name} name={field.name} label={field.name} type={"checkbox"}/>;
                case "TEXT_FIELD":
                    return <Input key={field.name} name={field.name} label={field.name} type={"text"}/>;
                case "RADIO_BOX":
                    return (
                        <div key={field.name}>
                            <p className={"text-sm text-gray-600"}>{field.name}</p>
                            <div className={"flex space-x-4"}>
                                {
                                    field.radioOptions?.map(radioOption =>
                                        <Input
                                            key={radioOption.value}
                                            name={field.name}
                                            radioGroup={field.name}
                                            value={radioOption.value}
                                            type={"radio"}
                                            label={radioOption.value}
                                        />
                                    )
                                }
                            </div>
                        </div>
                    );
            }
        });

    return (
        <div className="container mx-auto my-20 space-y-6">
            <p>Template: {template?.filename}</p>
            <h1 className="text-2xl">Fill out the form</h1>
            <section className="space-y-6 flex flex-col">
                <Formik initialValues={form?.input || {}} onSubmit={updateInput} enableReinitialize>
                    {
                        ({submitForm}) => (
                            <FormikForm className="flex flex-col space-y-6" onBlur={submitForm}>
                                {fields}
                            </FormikForm>
                        )}
                </Formik>
            </section>
            <section>
                <PrimaryButton disabled={loading} onClick={signForm}>
                    {loading ? 'Loading ...' : 'Send for DocuSign'}
                </PrimaryButton>
            </section>
        </div>
    );
}
