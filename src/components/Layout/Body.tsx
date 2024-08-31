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

                    {/* Allocation Table */}
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

                    {/* Allocation Properties */}
                    <div>
                        <h2 id="allocation-properties-text">Allocation Properties</h2>
                        <h3 className="allocation-property-text">Envy-Freeness: {response.ef ? "True" : "False"}</h3>
                        <h3 className="allocation-property-text">Proportionality: {response.prop ? "True" : "False"}</h3>
                        <h3 className="allocation-property-text">EF1: {response.ef1 ? "True" : "False"}</h3>
                        <h3 className="allocation-property-text">EFX: {response.efx ? "True" : "False"}</h3>
                        <h3 className="allocation-property-text">Nash Welfare Value: {response.nashWelfareValue}</h3>
                    </div>

                    {/* Valuation Matrix */}
                    <div className="valuation-matrix-container">
                        <h2 id="valuation-matrix-text">Valuation Matrix</h2>
                        <table className="valuation-matrix-table">
                            <thead>
                            <tr>
                                <th>Agent/Good</th>
                                {response.valuationMatrix[0].map((_: any, index: number) => (
                                    <th key={index}>Good {index + 1}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {response.valuationMatrix.map((agentValuations: any[], agentIndex: number) => (
                                <tr key={agentIndex}>
                                    <td>Agent {agentIndex + 1}</td>
                                    {agentValuations.map((value, goodIndex) => (
                                        <td key={goodIndex}>{value}</td>
                                    ))}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Body;
