import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Templates} from "./pages/Templates";
import {Template} from "./pages/Template";
import {Form} from "./pages/Form";
import {Home} from "./Home";
import {UserProfile} from "./pages/UserProfile";


function App() {
    return (
        <main>
            <BrowserRouter>
                <Routes>
                    <Route path="templates" element={<Templates/>}/>
                    <Route path="templates/:templateFilename" element={<Template/>}/>
                    <Route path="user-profiles" element={<UserProfile/>}/>
                    <Route path="user-profiles/:email" element={<UserProfile/>}/>
                    <Route path="templates/:templateFilename/forms/:formId" element={<Form/>}/>
                    <Route path="/" element={<Home/>}/>
                </Routes>
            </BrowserRouter>
        </main>
    );
}

export default App;
