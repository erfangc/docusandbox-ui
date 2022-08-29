import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {AutoFillInstructionFormProps} from "./AutoFillInstructionFormProps";

export function Template() {

    const [state, setState] = useState<any>();
    const params = useParams();
    const templateFilename = params['templateFilename'];

    useEffect(() => {
        fetch(`/api/templates/${templateFilename}`)
            .then(resp => resp.json())
            .then(json => setState(json))
            .catch(reason => alert(reason));
    }, [templateFilename]);

    if (!state) {
        return null;
    }

    const fields = state?.fields?.map((field: any) => {
        const autoFillInstruction = field.autoFillInstruction;
        return (
            <div key={field.name} className="space-y-6">
                <p>{field.name}</p>
                <p>{field.type}</p>
            </div>
        );
    });

    return (
        <div>
            {fields}
        </div>
    );
}

export function AutoFillInstructionForm({autoFillInstruction}: AutoFillInstructionFormProps) {
    const {copyFrom, onlyIf} = autoFillInstruction;
    return (
        <div></div>
    )
}
