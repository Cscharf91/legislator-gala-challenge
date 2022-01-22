## Legislator Gala Challenge

By Cory Scharf

---

This was quite a difficult coding challenge. Solving it was out of my comfort zone but I learned a lot along the way and ultimately found it to be an interesting and fun problem to tackle. I unfortunately didn't have time to write thorough test cases/unit testing, so I made a function that can create some dynamic inputs.

### The Approach

My approach to this challenge was to use `Simulated Annealing`. This algorithm uses randomness and probabilities to find a solution, keeping score of the "cost" of each iteration. With potentially hundreds of guests, brute forcing the best solution is sub-optimal, with a huge number of combinations to try, while simulated annealing finds a solid solution noticeably more efficiently.

Basic steps to the algorithm:

1. Generate a random solution.
2. Calculate its cost-- +1 from a pair avoiding each other being seated together, -1 from a pair who preferred each other.
3. Get neighbor solution-- swap a random guest from a random table with another random guest from a different random table.
4. Compare new cost with old cost. If the new cost is an improvement, use the new solution, otherwise calculate the acceptance probability (based off the two solutions and the gradually decreasing "temperature") and either keep or change the solution.
5. Iterate through x iterations (x = 100 here), then decrease the temperature.
6. Return the current solution and cost.

Here are a couple things I wish I had more time to improve:

1. As mentioned, limited testing, in both unit testing and in a more robust test generator, which would allow for more variety in `preferences` and `numTables`.
2. Improvement in a case where there are far more tables than guests (with this algorithm, everyone will sit alone).
3. Doesn't take advantage of the following rule: "you may assume that the number of seats per table are flexible..." This is becuase simulated annealing swaps 2 people evenly each iteration, although I wonder if incorporating occasional 1-way moves would improve the result.

### Get Started

To run this, npm and ts-node are required.

To install ts-node:

```
npm install -g ts-node
```

To install node_modules:

```
npm install
```

In `index.ts`, you can change the parameters in the function call `seatingPlanner()` to test different cases (sorry for the ugly uuids being used as names by default in the testGenerator!).

Finally, run the project with:

```
npm run start
```

The above command will write to a file in the directory called "output.json."

---
