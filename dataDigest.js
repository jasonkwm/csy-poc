// import data from "./data.json" with { type: "json" };
import * as fs from "fs";

const file = fs.readFileSync("./data.json");
const parsed = JSON.parse(file);

const small = 0;
const combo = 0;
const big = 0;
const medium = 0;

const jackpot = 0;
const mini = 0;
const major = 0;
const mega = 0;

const objCount = {
    jackpot: 0,
    feesEarned: 0,
    dropBelow10k: 0,
    dropBelow5k: 0,
    above50k: 0,
    above100k: 0,
};

for (let i in parsed) {
    if (!objCount[parsed[i].prizeType]) {
        objCount[parsed[i].prizeType] = 0;
    }
    objCount[parsed[i].prizeType] += 1;
    if (parsed[i].prizeType.includes("Jackpot")) {
        objCount["jackpot"] += 1;
    }
    if (parsed[i].remainingPrizePool <= 10000) {
        objCount["dropBelow10k"] += 1;
    } else if (parsed[i].remainingPrizePool <= 5000) {
        objCount["dropBelow5k"] += 1;
    } else if (parsed[i].remainingPrizePool >= 100000) {
        objCount["above100k"] += 1;
    } else if (parsed[i].remainingPrizePool >= 50000) {
        objCount["above50k"] += 1;
    }
    objCount["feesEarned"] += parsed[i].feesEarned;
}
console.log("ObjCount: \n", objCount);

console.log("LastBet: \n", parsed[parsed.length - 1]);
