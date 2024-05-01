import React from 'react';
import Register2 from './LoginRegister/Register';
import Login2 from './LoginRegister/Login2';
import Forget from './LoginRegister/Forget';
import Reset from './LoginRegister/Reset';

import Page1 from './Index/Page1'
// import ALLtest from './Index/ALLtest'
import Edit from './Index/Edit'
import AbAll from './AboutMe/AbAll'
import {Material} from './AboutMe/AbMaterial'


// 炯
// import { Homepage } from './Usercontrol/Pages';


import { createBrowserRouter, RouterProvider } from 'react-router-dom'


export const router = createBrowserRouter([
    { path: "/", element: <Login2 /> },
    { path: "forget", element: <Forget /> },
    { path: "page1", element: <Page1 /> },
    { path: "reset", element: <Reset /> },
    { path: "login", element: <Login2 /> },
    { path: "edit", element: <Edit /> },
    { path: "register", element: <Register2 /> },
    { path: "aboutme", element: <AbAll /> },
    { path: "aboutmeall", element: <Material /> },
    // { path: "LoginFromSql", element: <LoginFromSql /> },
    


// 炯
    // { path: "manage", element: <Homepage /> },



]);

export function LRRouter() {
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    )
}

