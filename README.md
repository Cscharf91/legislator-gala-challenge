## Legislator Gala Challenge

By Cory Scharf

---

This was quite a difficult coding challenge. Solving it was out of my comfort zone but I learned a lot along the way and ultimately found it to be an interesting and fun problem to tackle. I unfortunately didn't have time to write thorough test cases/unit testing, so I made a function that can create some dynamic inputs.

### The Approach

My approach to this challenge was to use `Simulated Annealing`. This algorithm uses randomness and probabilities to find a solution, keeping score of the "cost" of each iteration. With potentially hundreds of guests, brute forcing the best solution is sub-optimal, with a huge number of combinations to try, while simulated annealing finds a solid solution noticeably more efficiently.

### Get Started

To run this, npm and ts-node are required.

To install ts-node:

```
npm install -g ts-node
```

To install node_modules:potentially

```
npm install
```

In `index.ts`, you can change the parameters in the function call `seatingPlanner()` to test different cases.

Finally, run the project with:

```
npm run start
```

The above command will write to a file in the directory called "output.json."

---
