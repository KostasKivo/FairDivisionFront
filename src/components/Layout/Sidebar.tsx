import {useState} from "react";
import "./Sidebar.css"; // Create this file for Sidebar specific styles

const Sidebar = ({setResponse}: { setResponse: (response: any) => void }) => {
    const agentMaxValue = 5;
    const submitUrl = "http://localhost:8080/submit";

    const [agentSliderValue, setAgentSliderValue] = useState(1);
    const [goodsSliderValue, setGoodsSliderValue] = useState(1);
    const [dropdownValue, setDropdownValue] = useState<string>("1"); // State for dropdown value
    const [valuations, setValuations] = useState("1,2,3,4");

    const agentSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setAgentSliderValue(value);
        // Ensure goodsSliderValue does not exceed agentSliderValue
        if (goodsSliderValue > value) {
            setGoodsSliderValue(value);
        }
    };

    const goodsSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGoodsSliderValue(Number(e.target.value));
    };

    const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDropdownValue(e.target.value);
    };

    const handleValuationsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValuations(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const requestData = {
            agentSliderValue: agentSliderValue,
            goodsSliderValue: goodsSliderValue,
            valuationDropdownValue: dropdownValue,
            valuationContainer: valuations,
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
            setResponse(data); // Pass the response data to the parent component
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
            <hr/>
            <div className="goods-slider-container">
                <p>Number of goods</p>
                <label htmlFor="goodsSlider">Value: {goodsSliderValue}</label>
                <input
                    type="range"
                    id="goodsSlider"
                    min="1"
                    max={agentSliderValue*2} // Set max to agentSliderValue
                    value={goodsSliderValue}
                    onChange={goodsSliderChange}
                />
            </div>
            <hr/>
            <div className="valuation-dropdown-container">
                <p>Choose valuation:</p>
                <select value={dropdownValue} onChange={handleDropdownChange}>
                    <option value="1">Additive valuations</option>
                    {/* <option value="b">Option B</option>
          <option value="c">Option C</option> */}
                </select>
            </div>
            <hr/>
            <div className="valuation-container">
                <p>Enter valuations:</p>
                <input
                    type="text"
                    value={valuations}
                    onChange={handleValuationsChange}
                />
            </div>
            <hr/>
            <button type="submit">Submit</button>
        </form>
    );
};

export default Sidebar;
