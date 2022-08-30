import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Field} from "../components/Template/Field";

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

    const fields = state?.fields?.map(({name, type, autoFillInstruction}: Field) => {
        return (
            <div key={name} className="space-y-6">
                <p>{name}</p>
                <p>{type}</p>
            </div>
        );
    });

    return (
        <div>
            {fields}
        </div>
    );
}

