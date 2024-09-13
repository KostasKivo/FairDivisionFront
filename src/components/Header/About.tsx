import React from 'react';
import "./About.css";

function About() {
    return (
        <div className="about-container">
            <h1>About This Site</h1>
            <section className="about-section">
                <p>
                    This site was created to demonstrate various Fair Division algorithms using dynamic input from users.
                    To get started, select the number of agents and goods, then input the valuation of each good for each agent.
                    You can also choose the algorithm to allocate the goods. The valuations are additive, ensuring they are both monotone and normalized.
                </p>
                <p>
                    Each algorithm guarantees different fairness properties for the allocation. Once input is submitted, the system will generate an allocation based on the selected algorithm, providing the resulting distribution and additional properties.
                </p>
            </section>

            <section className="about-section">
                <h2>Algorithms Overview</h2>

                <h3>Round-Robin Algorithm</h3>
                <p>
                    The Round-Robin algorithm operates over multiple rounds where agents take turns picking their most valued remaining item.
                    It was proven by Caragiannis et al. <a href="https://www.cs.toronto.edu/~nisarg/papers/mnw.ec16.pdf" target="_blank" rel="noopener noreferrer">[Source]</a> that this algorithm guarantees an allocation that is Envy-Free up to one good (EF1). The algorithm runs in polynomial time, making it a simple yet efficient solution for fair division.
                </p>

                <h3>Envy-Cycle Elimination Algorithm</h3>
                <p>
                    Introduced by Lipton et al. <a href="https://web.stanford.edu/~saberi/envy.pdf" target="_blank" rel="noopener noreferrer">[Source]</a>, the Envy-Cycle Elimination algorithm also guarantees EF1 allocations. Unlike Round-Robin, this algorithm identifies an unenvied agent and gives her the most valued good. If no unenvied agent exists, it detects and eliminates envy cycles by shifting bundles among the agents in the cycle. This process continues until no goods remain.
                </p>

                <h3>Match & Freeze Algorithm</h3>
                <p>
                    The Match & Freeze algorithm, proposed by Amanatidis et al. <a href="https://arxiv.org/pdf/2001.09838" target="_blank" rel="noopener noreferrer">[Source]</a>, is designed for bi-valued instances where goods can take one of two values (a &gt; b &ge; 0). It ensures stronger fairness guarantees by producing EFX<sub>0</sub> allocations, which are a stricter form of EFX. The algorithm works by matching agents to goods using a bipartite graph, freezing agents who receive highly valued goods for subsequent rounds.
                </p>

                <h3>Leximin++ Algorithm</h3>
                <p>
                    The Leximin++ algorithm, introduced by Plaut and Roughgarden <a href="https://timroughgarden.org/papers/efx.pdf" target="_blank" rel="noopener noreferrer">[Source]</a>, guarantees EFX allocations by optimizing based on the minimum utility of agents. After maximizing the minimum utility, it refines allocations by adjusting the size of bundles to further improve fairness. The algorithm ensures EFX but has an exponential time complexity due to the need to evaluate all possible combinations.
                </p>

                <h3>Maximizing Nash Social Welfare (MNW)</h3>
                <p>
                    The MNW algorithm, described by Caragiannis et al. <a href="https://www.cs.toronto.edu/~nisarg/papers/mnw.pdf" target="_blank" rel="noopener noreferrer">[Source]</a>, maximizes the product of agents' utilities to guarantee EF1 allocations while balancing fairness and efficiency. Although finding the exact MNW allocation is NP-Hard, the approach approximates it by generating allocation combinations and selecting the one that optimizes Nash welfare. The algorithm is widely used in practical applications like <a href="http://www.spliddit.org/" target="_blank" rel="noopener noreferrer">Spliddit</a>.
                </p>

                <h3>Identical EFX Algorithm</h3>
                <p>
                    The Identical EFX algorithm specifically handles cases with identical valuations. In each step, it allocates a good to the agent with the least valued bundle, ensuring that the allocation is as fair as possible. Since each agent gets a good in turn, the algorithm guarantees an EFX allocation. This method is efficient and provides stronger fairness guarantees when agents have identical preferences.
                </p>
            </section>
        </div>
    );
}

export default About;
