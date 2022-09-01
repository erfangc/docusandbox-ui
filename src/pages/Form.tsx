import {useEffect, useState} from "react";
import {Field} from "../components/Template/Field";
import {useParams} from "react-router-dom";
import {PrimaryButton} from "./Template";

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
    const fieldInputs = fields
        .filter(field => !field.autoFillInstruction || (!field.autoFillInstruction.copyFrom && !field.autoFillInstruction.onlyIf))
        .map(field => (
            <FieldInput
                key={field.name}
                field={field}
                onChange={v => updateInput(field.name, v)}
                value={form?.input[field.name]}
            />)
        );

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

interface FieldInputProps {
    field: Field
    value: any
    onChange: (str?: any) => void
}

export function FieldInput(props: FieldInputProps) {
    const {field: {type}} = props;
    if (type === "TEXT_FIELD") {
        return <TextFieldInput {...props}/>;
    } else if (type === 'CHECK_BOX') {
        return <CheckboxFieldInput {...props}/>;
    } else {
        return null;
    }
}

export function TextFieldInput({field, value, onChange}: FieldInputProps) {
    const [tempValue, setTempValue] = useState(value);

    useEffect(() => {
        setTempValue(value);
    }, [value]);

    const submit = () => {
        onChange(tempValue);
    };

    return (
        <label>
            <p>{field.name}</p>
            <input
                name={field.name}
                type="text"
                value={tempValue}
                onChange={e => setTempValue(e.currentTarget.value)}
                onBlur={submit}
            />
        </label>
    );
}

export function CheckboxFieldInput({field, value, onChange}: FieldInputProps) {
    const [tempValue, setTempValue] = useState<boolean>(value);
    
    useEffect(() => {
        setTempValue(value);
    }, [value]);
    
    const submit = () => {
        onChange(tempValue);
    };
    
    return (
        <label>
            <p>{field.name}</p>
            <input 
                name={field.name}
                type="checkbox" 
                checked={tempValue}
                onChange={e => setTempValue(e.currentTarget.checked)}
                onBlur={submit}
            />
        </label>
    );
}
