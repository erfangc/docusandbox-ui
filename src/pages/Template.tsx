import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Field} from "../components/Template/Field";
import {AutoFillInstructionForm} from "../components/Template/AutoFillInstructionForm";
import {AutoFillInstruction} from "../components/Template/AutoFillInstruction";
import {TemplateUpload} from "./TemplateUpload";

export function Template() {

    const [state, setState] = useState<any>();
    const params = useParams();
    const templateFilename = params['templateFilename'];
    const [email, setEmail] = useState<string>();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/api/templates/${templateFilename}`)
            .then(resp => resp.json())
            .then(json => setState(json))
            .catch(reason => alert(reason));
    }, []);

    const updateAutoFillInstruction = (name: string, autoFillInstruction: AutoFillInstruction) => {
        // call API to update the field, also update locally
        fetch(
            `/api/templates/${templateFilename}/${name}`,
            {
                method: 'PATCH',
                body: JSON.stringify(autoFillInstruction),
                headers: {'Content-Type': 'application/json'}
            },
        ).then(resp => resp.json()).then(json => setState(json)).catch(reason => alert(reason));
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

    const fields = state?.fields?.map(({name, type, autoFillInstruction}: Field) => {
        return (
            <div key={name} className="pt-6">
                <div className="text-gray-700 flex items-center space-x-2">
                    <p className="font-semibold">{name}</p>
                    <p className="text-xs font-mono">{type}</p>
                </div>
                <AutoFillInstructionForm
                    type={type}
                    autoFillInstruction={autoFillInstruction}
                    onChange={autoFillInstruction => updateAutoFillInstruction(name, autoFillInstruction)}
                />
            </div>
        );
    });

    return (
        <div className="container mx-auto my-20">
            <TemplateUpload/>
            <section className="grid grid-cols-4 mb-20">{fields}</section>
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
                <PrimaryButton onClick={createForm}>
                    + Create
                </PrimaryButton>
            </section>
        </div>
    );
}

export function PrimaryButton({ children, ...props }: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return (
        <button className="bg-blue-600 px-3 py-2 text-blue-100 rounded" {...props}>
            {children}
        </button>
    );
}
