import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {PrimaryButton} from "../components/PrimaryButton";
import {Field} from "../components/Template/models/Field";

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

    const updateInput = (name: string, value: any) => {
        fetch(
            `/api/forms/${formId}`,
            {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({[name]: value}),
            }
        ).then(resp => resp.json()).then(json => setForm(json)).catch(reason => alert(reason));
    };
    const [loading, setLoading] = useState(false);
    const signForm = () => {
        setLoading(true);
        fetch(`/api/forms/${formId}/signings`, { method: 'PUT' })
            .then(_ => alert('Done')).catch(reason => alert(reason)).finally( () => setLoading(false));
    };

    const fields = template?.fields || [];
    // TODO build new inputs
    const fieldInputs = <></>;

    return (
        <div className="container mx-auto my-20 space-y-6">
            <p>Template: {template?.filename}</p>
            <h1 className="text-2xl">Fill out the form</h1>
            <section className="space-y-6 flex flex-col">
                {fieldInputs}
            </section>
            <section>
                <PrimaryButton disabled={loading} onClick={signForm}>
                    {loading ? 'Loading ...' : 'Send for DocuSign'}
                </PrimaryButton>
            </section>
        </div>
    );
}
