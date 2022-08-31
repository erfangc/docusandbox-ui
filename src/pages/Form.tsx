import {useEffect, useState} from "react";
import {Field} from "../components/Template/Field";
import {useParams} from "react-router-dom";

interface Template {
    filename: string
    fields?: Field[]
}

export function Form() {
    const [template, setTemplate] = useState<Template>();
    const { templateFilename, formId } = useParams();
    
    useEffect(() => {
        fetch(`/api/templates/${templateFilename}`)
            .then(resp => resp.json())
            .then(json => setTemplate(json))
            .catch(reason => alert(reason));
    }, []);
    
    return (
        <div className="container mx-auto my-20">
            <p>Template: {template?.filename}</p>
            <hr/>
            <h1 className="text-2xl">Fill out the form</h1>
        </div>
    );
}