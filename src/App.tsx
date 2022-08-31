import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Forms} from "./pages/Forms";
import {Templates} from "./pages/Templates";
import {Template} from "./pages/Template";
import {Form} from "./pages/Form";
import {UserProfiles} from "./pages/UserProfiles";
import {UserProfile} from "./pages/UserProfile";
import {Home} from "./Home";


function App() {
    return (
        <main>
            <BrowserRouter>
                <Routes>
                    <Route path="templates" element={<Templates/>}/>
                    <Route path="templates/:templateFilename" element={<Template/>}/>
                    <Route path="user-profiles" element={<UserProfiles/>}/>
                    <Route path="user-profiles/:email" element={<UserProfile/>}/>
                    <Route path="forms" element={<Forms/>}/>
                    <Route path="forms/:formId" element={<Form/>}/>
                    <Route path="/" element={<Home/>}/>
                </Routes>
            </BrowserRouter>
        </main>
    );
}

export default App;
