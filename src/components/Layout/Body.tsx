import React from "react";
import "./Body.css"; // Assuming you have defined styles here

const Body = ({ response }: { response: any }) => {
    return (
        <div className="body">
            {response === null ? (
                <h2 className="instruction-message">{"Please select the inputs of the problem using the slider and submit to get the algorithm results"}</h2>
            ) : (
                <pre>{JSON.stringify(response, null, 2)}</pre>
            )}
        </div>
    );
};

export default Body;
