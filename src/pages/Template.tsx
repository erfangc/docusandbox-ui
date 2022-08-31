import React, {useEffect, useState} from "react";
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
    
    function handleFileUpload({target}: React.ChangeEvent<HTMLInputElement>) {
        const file = target.files?.item(0);
        if (!file) {
            return;
        }
        const formData = new FormData();
        formData.append('file', file);
        fetch(
            `/api/templates`,
            {
                method: 'POST',
                body: formData
            }
        )
            .then(resp => resp.json())
            .then(json => window.location.href = `/templates/${json.filename}`)
            .catch(reason => alert(reason));
    }

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
            <section className="border-b pb-4">
                <label
                    className="cursor-pointer bg-gray-200 text-gray-800 p-2 rounded border border-gray-600 border-dashed"
                    htmlFor="file-upload"
                >
                    Choose Template File
                </label>
                <input className="opacity-0" id="file-upload" type="file" name="file" onChange={handleFileUpload}/>
                <div className="flex mt-2 items-center text-gray-800">
                    <p>Filename:</p>
                    <p className="ml-2 text-gray-600">
                        {templateFilename}
                    </p>
                </div>
            </section>
            <section className="space-y-6 divide-gray-300 divide-y">
                {fields}
            </section>
        </div>
    );
}

