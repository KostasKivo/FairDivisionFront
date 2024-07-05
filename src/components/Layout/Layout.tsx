import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Body from "./Body";
import "./Layout.css"; // Create this file for Layout specific styles

export const Layout = () => {
    const [response, setResponse] = useState<any>(null);

    return (
        <section className="layout">
            <Sidebar setResponse={setResponse} />
            <Body response={response} />
        </section>
    );
};
