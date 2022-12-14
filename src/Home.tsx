import React from "react";
import {Link} from "react-router-dom";

export function Home() {
    return (
        <div className="container mx-auto my-20">
            <h1 className="text-4xl">
                <b>Welcome</b> to the DocuSandbox Project
            </h1>
            <p className="my-6">
                This is a demo application that showcase how to turn a AcroForm enabled
                Acrobat file into a reusable template for DocuSign while digitally collecting
                and auto-filling fields in the AcroForm
            </p>
            <h2 className="text-xl mb-2">What can you do in this app:</h2>
            <ul className="list-inside list-disc">
                <li>
                    <Link className="text-blue-700 underline" to={'/templates'}>Upload an AcroForm PDF as a template</Link>
                </li>
                <li><Link className="text-blue-700 underline" to={'/user-profiles'}>Create an user profile</Link></li>
                <li>Map fields in uploaded PDF template to user profile data items</li>
                <li>Create / modify a form using the template</li>
                <li>Fill the form digitally and submit the filled PDF to DocuSign</li>
            </ul>
        </div>
    );
}