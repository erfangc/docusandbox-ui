import {TemplateUpload} from "./TemplateUpload";

export function Templates() {
    return (
        <div className="container mx-auto my-20">
            <h1 className="text-2xl font-bold">Upload a Template</h1>
            <TemplateUpload/>
            <p className="my-6 text-lg">What happens after you upload?</p>
            <ul className="list-disc list-inside">
                <li>The server creates a <code className="text-gray-800 bg-gray-200 p-1 rounded">Template</code> object</li>
                <li>The server parses and stores each PDF form field in the uploaded template file</li>
                <li>You can then setup how to auto-fill each field, each time someone uses the template</li>
            </ul>
        </div>
    );
}