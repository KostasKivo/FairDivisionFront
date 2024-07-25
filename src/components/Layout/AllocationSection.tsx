import React from 'react';
import "./AllocationSection.css";

interface AllocationSectionProps {
    title: string;
    allocations: number[][];
    onChange: (agentIndex: number, value: string) => void;
    expanded: boolean;
    toggleExpand: () => void;
}

const AllocationSection: React.FC<AllocationSectionProps> = ({
                                                                 title,
                                                                 allocations,
                                                                 onChange,
                                                                 expanded,
                                                                 toggleExpand
                                                             }) => (
    <>
        <div className="allocation-container">
            <div onClick={toggleExpand} style={{ cursor: 'pointer' }}>
                <p>{title}</p>
            </div>
            {expanded && (
                <div>
                    {allocations.map((agentAllocations, agentIndex) => (
                        <div key={agentIndex} className={`leximin-agent-${agentIndex}-allocation-container`}>
                            <p>Agent {agentIndex + 1} Bundle</p>
                            <input
                                type="text"
                                placeholder="Enter comma separated goods"
                                onChange={(e) => onChange(agentIndex, e.target.value)}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    </>
);

export default AllocationSection;