import React from 'react';
import "./About.css";

function About() {
    return (
        <div className="about-container">
            <h1>About This Site</h1>
            <section className="about-section">
                <p>
                    This site was created to display different Fair Division algorithms with dynamic input provided by the user.
                    To use the site, select the number of agents and goods, then provide the valuation for each good per agent.
                    You can also select the desired algorithm for allocating the goods. The valuations are additive, ensuring they are monotone and normalized.
                </p>
                <p>
                    Each algorithm ensures different properties for the allocations. Once the input is submitted, an array of agents and goods will be created, showing the allocations for each agent and some properties of the generated allocation.
                </p>
            </section>

            <section className="about-section">
                <h2>Algorithms Overview</h2>

                <h3>Round-Robin Algorithm</h3>
                <p>
                    The Round-Robin algorithm is the simplest algorithm and allocates the most valued good to each agent each round until all goods are allocated.
                    It was proven by Caragiannis et al. <a href="https://www.cs.toronto.edu/~nisarg/papers/mnw.ec16.pdf" target="_blank" rel="noopener noreferrer">[Source]</a> that it produces an EF1 allocation.
                </p>

                <h3>Envy-Cycle Elimination Algorithm</h3>
                <p>
                    The Envy-Cycle elimination algorithm was introduced by Lipton et al. <a href="https://web.stanford.edu/~saberi/envy.pdf" target="_blank" rel="noopener noreferrer">[Source]</a> and also produces an EF1 allocation.
                    Instead of sequentially picking each agent, this algorithm chooses an unenvied agent to receive their most valued good. If no unenvied agent exists, a cycle among the agents and their bundles is detected and eliminated by reallocating bundles.
                </p>

                <h3>Match & Freeze Algorithm</h3>
                <p>
                    The Match & Freeze algorithm was introduced by Amanatidis et al. <a href="https://arxiv.org/pdf/2001.09838" target="_blank" rel="noopener noreferrer">[Source]</a> and produces EFX allocations for bi-valued instances of goods (a {'>'} b {'>'}= 0).
                    The algorithm creates a bipartite graph, matches agents with goods they value most, and allocates them. Agents who receive high-valued goods are "frozen" for the next few rounds.
                </p>

                <h3>Leximin++ Algorithm</h3>
                <p>
                    Leximin++ is a comparison operator introduced by Plaut and Roughgarden <a href="https://timroughgarden.org/papers/efx.pdf" target="_blank" rel="noopener noreferrer">[Source]</a>.
                    It compares agents' valuations and returns an EFX allocation. The algorithm slightly varies for two players or identical valuations.
                </p>

                <h3>Nash Social Welfare</h3>
                <p>
                    The Nash Social Welfare of an allocation is the geometric mean of the allocation. Caragiannis et al. <a href="https://www.cs.toronto.edu/~nisarg/papers/mnw.pdf" target="_blank" rel="noopener noreferrer">[Source]</a> proved that maximizing it holds interesting properties.
                    Although computing MNW is NP-Hard, the algorithm used here was designed for similar valuations as those on <a href="http://www.spliddit.org/" target="_blank" rel="noopener noreferrer">Spliddit</a>.
                </p>
            </section>
        </div>
    );
}

export default About;
