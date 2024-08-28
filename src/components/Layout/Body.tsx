import React from "react";
import "./Body.css";

const Body = ({ response }: { response: any }) => {
    return (
        <div className="body">
            {/* Check for error message */}
            {response?.errorMessage ? (
                <h2 className="error-message">{response.errorMessage}</h2>
            ) : response === null ? (
                <h2 className="instruction-message">
                    {"Please select the inputs of the problem using the slider and submit to get the algorithm results"}
                </h2>
            ) : (
                <div id="results-container">
                    <h2 id="results-text">Results of algorithm</h2>
                    <hr />

                    <table className="allocation-table">
                        <thead>
                        <tr>
                            <th>Agents</th>
                            <th>Items</th>
                        </tr>
                        </thead>
                        <tbody>
                        {response.allocations.map((allocation: any) => {
                            // Increment each item in the goodsList by 1
                            const incrementedGoodsList = allocation.goodsList.map((item: number) => item + 1);

                            return (
                                <tr key={allocation.agentId}>
                                    <td>{allocation.agentId + 1}</td>
                                    <td>{incrementedGoodsList.join(", ")}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>


                    <div>
                        <h2 id="allocation-properties-text">Allocation Properties</h2>
                        <h3 className="allocation-property-text">Envy-Freeness: {response.ef ? "True" : "False"}</h3>
                        <h3 className="allocation-property-text">EF1: {response.ef1 ? "True" : "False"}</h3>
                        <h3 className="allocation-property-text">EFX: {response.efx ? "True" : "False"}</h3>
                    </div>
                </div>
            )}
        </div>
    );
};




export default Body;
