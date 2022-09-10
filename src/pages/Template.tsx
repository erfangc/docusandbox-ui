import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {TemplateUpload} from "./TemplateUpload";
import {PrimaryButton} from "../components/PrimaryButton";
import {Field} from "../components/Template/models/Field";
import {FieldForm} from "../components/Template/FieldForms/FieldForm";

export function Template() {

    const [state, setState] = useState<any>();
    const params = useParams();
    const templateFilename = params['templateFilename'];
    const [email, setEmail] = useState<string>();
    const [currField, setCurrField] = useState<Field>();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/api/templates/${templateFilename}`)
            .then(resp => resp.json())
            .then(json => setState(json))
            .catch(reason => alert(reason));
    }, []);

    const updateField = (field: Field) => {
        // call API to update the field, also update locally
        const fieldName = field.name;
        fetch(
            `/api/templates/${templateFilename}/${fieldName}`,
            {
                method: 'PATCH',
                body: JSON.stringify(field),
                headers: {'Content-Type': 'application/json'}
            },
        )
            .then(resp => resp.json())
            .then(json => setState(json))
            .catch(reason => alert(reason));
    };

    if (!state) {
        return null;
    }

    // create a new Form from this template
    // then navigate to that form
    const createForm = () => {
        if (!email) {
            return;
        }
        fetch(
            `/api/forms?templateFilename=${templateFilename}&email=${email}`,
            {
                method: 'POST',
                body: JSON.stringify({}),
                headers: {'Content-Type': 'application/json'}
            },
        )
            .then(resp => resp.json())
            .then(json => navigate(`/templates/${templateFilename}/forms/${json.formId}`));
    };

    const fields = state?.fields?.map((field: Field) => {
        const {name, type} = field;
        return (
            <li 
                key={name}
                className={currField?.name === field.name ? 'bg-gray-200 px-4 py-1' : 'px-4 py-1'}
            >
                <a
                    className="flex mt-1 items-center justify-between cursor-pointer space-x-4"
                    onClick={() => setCurrField(field)}
                >
                    <span className="font-semibold">{name}</span>
                    <span className="text-xs font-mono">{type}</span>
                </a>
            </li>
        );
    });

    return (
        <div className="container mx-auto my-12">
            <TemplateUpload/>
            <div className="flex my-12">
                <ul className="divide-y">{fields}</ul>
                <section className="ml-12">
                    {currField && <FieldForm field={currField} onChange={updateField}/>}
                </section>
            </div>
            <hr/>
            <h1 className="my-6 text-lg font-semibold">Fill out a Form using This Template</h1>
            <section>
                <label htmlFor="recipientEmail">
                    <p>Recipient Email</p>
                    <input
                        id="recipientEmail"
                        name="email"
                        type="email"
                        className="mr-4 rounded"
                        value={email}
                        placeholder="ex: john@gmail.com"
                        onChange={e => setEmail(e.currentTarget.value)}
                    />
                </label>
                <PrimaryButton onClick={createForm}>Create</PrimaryButton>
            </section>
        </div>
    );
}
