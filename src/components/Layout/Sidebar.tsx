import React, { useState, useEffect } from 'react';
import "./Sidebar.css";
import AllocationSection from "./AllocationSection";

interface SidebarProps {
    setResponse: (response: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setResponse }) => {
    const agentMaxValue = 5;
    const submitUrl = "http://localhost:8080/submit";

    const [agentSliderValue, setAgentSliderValue] = useState<number>(1);
    const [goodsSliderValue, setGoodsSliderValue] = useState<number>(1);
    const [valuationDropdownValue, setValuationDropdownValue] = useState<string>("1");
    const [algorithmDropdownValue, setAlgorithmDropdownValue] = useState<string>("1");
    const [valuations, setValuations] = useState<number[][]>([]);
    const [expandedAgent, setExpandedAgent] = useState<number | null>(null);
    const [showLeximinInput,setShowLeximinInput] = useState<boolean>(false);

    const [leximinFirstAllocation, setLeximinFirstAllocation] = useState<number[][]>([]);
    const [expandedFirstAllocation, setExpandedFirstAllocation] = useState<boolean>(false);

    const [leximinSecondAllocation, setLeximinSecondAllocation] = useState<number[][]>([]);
    const [expandedSecondAllocation, setExpandedSecondAllocation] = useState<boolean>(false);

    useEffect(() => {
        // Initialize or update the valuations matrix and expanded state when agentSliderValue or goodsSliderValue changes
        setValuations((prev) => {
            const newValuations = Array(agentSliderValue)
                .fill(null)
                .map((_, agentIndex) =>
                    Array(goodsSliderValue)
                        .fill(null)
                        .map((_, goodIndex) => (prev[agentIndex] && prev[agentIndex][goodIndex]) || 1)
                );
            return newValuations;
        });

        setExpandedAgent(null);
    }, [agentSliderValue, goodsSliderValue]);

    useEffect( () => {
        setLeximinFirstAllocation( (prev) => {
            const newAllocation = Array(agentSliderValue)
                .fill(null )
                .map( (_,agentIndex) =>
                Array(goodsSliderValue)
                    .fill(null)
                    .map( (_,allocatedGoodIndex) =>  (prev[agentIndex] && prev[agentIndex][allocatedGoodIndex]) || 1)
                );
            return newAllocation;
        });

        setExpandedFirstAllocation(false);
    }, [showLeximinInput,agentSliderValue]);

    useEffect( () => {
        setLeximinSecondAllocation( (prev) => {
            const newAllocation = Array(agentSliderValue)
                .fill(null )
                .map( (_,agentIndex) =>
                    Array(goodsSliderValue)
                        .fill(null)
                        .map( (_,allocatedGoodIndex) =>  (prev[agentIndex] && prev[agentIndex][allocatedGoodIndex]) || 1)
                );
            return newAllocation;
        });

        setExpandedSecondAllocation(false);
    }, [showLeximinInput,agentSliderValue]);


    const leximinAllocationChange = (allocationType: 'first' | 'second', agentIndex: number, allocation: string) => {
        // Parse the allocation string into an array of numbers
        const allocatedItems = allocation.split(',').map(Number);

        // Update the state based on the allocationType
        if (allocationType === 'first') {
            setLeximinFirstAllocation((prev) => {
                const newAllocations = [...prev];
                newAllocations[agentIndex] = allocatedItems;
                return newAllocations;
            });
        } else if (allocationType === 'second') {
            setLeximinSecondAllocation((prev) => {
                const newAllocations = [...prev];
                newAllocations[agentIndex] = allocatedItems;
                return newAllocations;
            });
        }
    };


    const agentSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setAgentSliderValue(value);
        if (goodsSliderValue > value * 2) {
            setGoodsSliderValue(value * 2);
        }
    };

    const goodsSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setGoodsSliderValue(value);
    };

    const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValuationDropdownValue(e.target.value);
    };

    const handleAlgorithmDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setAlgorithmDropdownValue(value);
        setShowLeximinInput(value === "4");
    };

    const handleValuationChange = (agentIndex: number, goodIndex: number, value: number) => {
        setValuations((prev) => {
            const newValuations = [...prev];
            newValuations[agentIndex][goodIndex] = value;
            return newValuations;
        });
    };

    const toggleExpandAgent = (agentIndex: number) => {
        setExpandedAgent((prev) => (prev === agentIndex ? null : agentIndex));
    };

    const toggleExpandAllocation = (type: 'first' | 'second') => {
        if (type === 'first') {
            setExpandedFirstAllocation((prev) => !prev);
        } else {
            setExpandedSecondAllocation((prev) => !prev);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const requestData = {
            agentSliderValue,
            goodsSliderValue,
            valuationDropdownValue,
            algorithmDropdownValue,
            valuationContainer: valuations.flat().join(","),
        };

        try {
            const response = await fetch(submitUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            const data = await response.json();
            setResponse(data);
        } catch (error) {
            console.error("Error:", error);
            setResponse(null);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="sidebar">
            <div className="agent-slider-container">
                <p>Number of agents</p>
                <label htmlFor="agentSlider">Value: {agentSliderValue}</label>
                <input
                    type="range"
                    id="agentSlider"
                    min="1"
                    max={agentMaxValue}
                    value={agentSliderValue}
                    onChange={agentSliderChange}
                />
            </div>
            <hr />
            <div className="goods-slider-container">
                <p>Number of goods</p>
                <label htmlFor="goodsSlider">Value: {goodsSliderValue}</label>
                <input
                    type="range"
                    id="goodsSlider"
                    min="1"
                    max={agentSliderValue * 2}
                    value={goodsSliderValue}
                    onChange={goodsSliderChange}
                />
            </div>
            <hr />
            <div className="valuation-dropdown-container">
                <p>Choose valuation:</p>
                <select value={valuationDropdownValue} onChange={handleDropdownChange}>
                    <option value="1">Additive valuations</option>
                    {/* <option value="b">Option B</option>
                    <option value="c">Option C</option> */}
                </select>
            </div>
            <hr />
            <div className="algorithm-dropdown-container">
                <p>Choose algorithm:</p>
                <select value={algorithmDropdownValue} onChange={handleAlgorithmDropdownChange}>
                    <option value="1">Round Robin</option>
                    <option value="2">Envy Cycle elimination</option>
                    <option value="3">Match And Freeze</option>
                    <option value="4">Leximin++</option>
                </select>
            </div>
            {showLeximinInput && (
                <>
                    <hr />
                    <AllocationSection
                        title="Toggle First Allocation"
                        allocations={leximinFirstAllocation}
                        onChange={(agentIndex, value) => leximinAllocationChange('first', agentIndex, value)}
                        expanded={expandedFirstAllocation}
                        toggleExpand={() => toggleExpandAllocation('first')}
                    />
                    <hr />
                    <AllocationSection
                        title="Toggle Second Allocation"
                        allocations={leximinSecondAllocation}
                        onChange={(agentIndex, value) => leximinAllocationChange('second', agentIndex, value)}
                        expanded={expandedSecondAllocation}
                        toggleExpand={() => toggleExpandAllocation('second')}
                    />
                </>
            )}
            <hr />
            {valuations.map((agentValuations, agentIndex) => (
                <div key={agentIndex} className="agent-valuation-container">
                    <div onClick={() => toggleExpandAgent(agentIndex)}>
                        <p>Agent {agentIndex + 1} valuations:</p>
                    </div>
                    {expandedAgent === agentIndex && (
                        agentValuations.map((value, goodIndex) => (
                            <div key={goodIndex} className="good-slider-container">
                                <label htmlFor={`agent-${agentIndex}-good-${goodIndex}`}>
                                    Good {goodIndex + 1} value: {value}
                                </label>
                                    <input
                                    type="range"
                                    id={`agent-${agentIndex}-good-${goodIndex}`}
                                    min="1"
                                    max="10"
                                    value={value}
                                    onChange={(e) =>
                                        handleValuationChange(agentIndex, goodIndex, Number(e.target.value))
                                    }
                                />
                            </div>
                        ))
                    )}
                </div>
            ))}
            <hr />
            <button type="submit">Submit</button>
        </form>
    );
};

export default Sidebar;
