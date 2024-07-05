import React from "react";
import "./Body.css"; // Assuming you have defined styles here

const Body = ({ response }: { response: any }) => {
    return (
        <div className="body">
            {response && response.bad ? (
                <p className="error-message">{response.message}</p>
            ) : (
                <pre>{JSON.stringify(response, null, 2)}</pre>
            )}
        </div>
    );
};

export default Body;
