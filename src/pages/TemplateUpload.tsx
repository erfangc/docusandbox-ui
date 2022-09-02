import {useParams} from "react-router-dom";
import React from "react";

export function TemplateUpload() {

    const params = useParams();
    const templateFilename = params['templateFilename'];

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

    return (
        <section className="border-b pb-4">
            <label
                className="cursor-pointer bg-gray-200 text-gray-800 p-2 rounded border border-gray-600 border-dashed"
                htmlFor="file-upload"
            >
                Choose Template File
            </label>
            <input className="opacity-0" id="file-upload" type="file" name="file" onChange={handleFileUpload}/>
            <div className="flex mt-2 items-center text-gray-800 pt-2">
                <p>Filename:</p>
                <p className="ml-2 text-gray-600">
                    {templateFilename}
                </p>
            </div>
        </section>
    );
}