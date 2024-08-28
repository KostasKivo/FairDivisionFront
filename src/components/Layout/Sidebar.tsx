import React, {useEffect, useState} from 'react';
import "./Sidebar.css";
import AllocationSection from "./AllocationSection";

interface SidebarProps {
    setResponse: (response: any) => void;
}

const agentMaxValue = 100;
const goodsMaxValue = 100;
const minValuation = 1;
const maxValuation = 10;

const Sidebar: React.FC<SidebarProps> = ({ setResponse }) => {

    const DEFAULT_SUBMIT_URL = "http://localhost:8080/submit";

    const [agentSliderValue, setAgentSliderValue] = useState<number>(1);
    const [goodsSliderValue, setGoodsSliderValue] = useState<number>(1);
    const [valuationDropdownValue, setValuationDropdownValue] = useState<string>("1");
    const [algorithmDropdownValue, setAlgorithmDropdownValue] = useState<string>("1");
    const [valuations, setValuations] = useState<number[][]>([]);
    const [expandedAgent, setExpandedAgent] = useState<number | null>(null);
    const [number1, setNumber1] = useState<number>(0);
    const [number2, setNumber2] = useState<number>(0);


    const [showLeximinInput,setShowLeximinInput] = useState<boolean>(false);

    const [leximinFirstAllocation, setLeximinFirstAllocation] = useState<string[][]>([]);
    const [expandedFirstAllocation, setExpandedFirstAllocation] = useState<boolean>(false);

    const [leximinSecondAllocation, setLeximinSecondAllocation] = useState<string[][]>([]);
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
                    .map( (_,allocatedGoodIndex) =>  (prev[agentIndex] && prev[agentIndex][allocatedGoodIndex]) || "")
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
                        .map( (_,allocatedGoodIndex) =>  (prev[agentIndex] && prev[agentIndex][allocatedGoodIndex]) || "")
                );
            return newAllocation;
        });

        setExpandedSecondAllocation(false);
    }, [showLeximinInput,agentSliderValue]);


    const leximinAllocationChange = (allocationType: 'first' | 'second', agentIndex: number, allocation: string) => {
        const allocatedItems = allocation.split(',').map(item => item.trim());

        console.log(agentIndex);

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

    const generateRandomValuations = () => {
        const newValuations = Array.from({ length: agentSliderValue }, () =>
            Array.from({ length: goodsSliderValue }, () => Math.floor(Math.random() * maxValuation) + 1)
        );
        setValuations(newValuations);
    };

    const generateBinaryValuations = () => {
        const newValuations = valuations.map(row =>
            row.map(() => (Math.random() > 0.5 ? number1 : number2))
        );
        setValuations(newValuations);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const requestData: Record<string, any> = {
            agentSliderValue,
            goodsSliderValue,
            valuationDropdownValue,
            algorithmDropdownValue,
            valuationContainer: valuations.flat().join(","),
        };

        // Conditionally add leximin allocations if the algorithmDropdownValue is "4"
        if (algorithmDropdownValue === "4") {
            requestData.leximinFirstAllocation = leximinFirstAllocation.map(bundle =>
                bundle.map(item => item === '' ? undefined : parseInt(item))
                    .filter(value => value !== undefined)
            );
            requestData.leximinSecondAllocation = leximinSecondAllocation.map(bundle =>
                bundle.map(item => item === '' ? undefined : parseInt(item))
                    .filter(value => value !== undefined)
            );
        }

        try {
            const response = await fetch(DEFAULT_SUBMIT_URL, {
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
                    max={goodsMaxValue}
                    value={goodsSliderValue}
                    onChange={goodsSliderChange}
                />
            </div>
            <hr />
            <div className="valuation-dropdown-container">
                <p>Choose valuation type:</p>
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
                    <option value="5">Maximum Nash Welfare</option>
                </select>
            </div>
            <hr />
            <div className="button-container">
                <p>Generate valuations automatically:</p>
                {/*By default type submit, this will start a post request, type="button"*/}
                <button className="generate-button" onClick={generateRandomValuations}>Generate Valuations</button>
                <hr />
                <p>Generate binary valuation:</p>
                <div className="input-container">
                    <p>Enter two numbers for binary valuation:</p>
                    <input
                        type="number"
                        value={number1}
                        min={minValuation}
                        max={maxValuation}
                        onChange={(e) => setNumber1(Number(e.target.value))}
                        placeholder="Number 1"
                    />
                    <input
                        type="number"
                        value={number2}
                        min={minValuation}
                        max={maxValuation}
                        onChange={(e) => setNumber2(Number(e.target.value))}
                        placeholder="Number 2"
                    />
                </div>
                <button className="generate-button" onClick={generateBinaryValuations}>Generate Binary Valuation</button>
            </div>
            {showLeximinInput && (
                <>
                    <hr />
                    <p>Put two allocations to compare:</p>
                    <AllocationSection
                        title="First Allocation"
                        allocations={leximinFirstAllocation}
                        onChange={(agentIndex, value) => leximinAllocationChange('first', agentIndex, value)}
                        expanded={expandedFirstAllocation}
                        toggleExpand={() => toggleExpandAllocation('first')}
                    />
                    <AllocationSection
                        title="Second Allocation"
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
                                    min={minValuation}
                                    max={maxValuation}
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
