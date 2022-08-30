import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Field} from "../components/Template/Field";
import {AutoFillInstructionForm} from "../components/Template/AutoFillInstructionForm";
import {AutoFillInstruction} from "../components/Template/AutoFillInstruction";

export function Template() {

    const [state, setState] = useState<any>();
    const params = useParams();
    const templateFilename = params['templateFilename'];

    useEffect(() => {
        fetch(`/api/templates/${templateFilename}`)
            .then(resp => resp.json())
            .then(json => setState(json))
            .catch(reason => alert(reason));
    }, []);

    const updateAutoFillInstruction = (name: string, autoFillInstruction: AutoFillInstruction) => {
        // call API to update the field, also update locally
        const fields = state?.fields?.map((field: Field) => {
            if (field.name === name) {
                return {...field, autoFillInstruction};
            } else {
                return field;
            }
        });
        const newState = {...state, fields};
        setState(newState);
    };

    if (!state) {
        return null;
    }

    const fields = state?.fields?.map(({name, type, autoFillInstruction}: Field) => {
        return (
            <div key={name}>
                <div className="flex items-center space-x-2">
                    <p className="font-bold">{name}</p>
                    <p className="text-sm font-mono">{type}</p>
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
        <div className="container mx-auto max-w-2xl my-20">
            <div className="space-y-4">{fields}</div>
            <section>
                <pre>
                    {JSON.stringify(state?.fields, null, ' ')}
                </pre>
            </section>
        </div>
    );
}

