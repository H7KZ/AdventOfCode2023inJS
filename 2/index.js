const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf8").split("\r\n");

const toCheck = {
    "red": 12,
    "green": 13,
    "blue": 14
}

let idCount = 0;

for (let i = 0; i < input.length; i++) {
    const gameId = input[i].split(": ")[0].split(" ")[1];

    const sets = input[i].split(": ")[1].split("; ");

    let isPossible = true;

    for (let x = 0; x < sets.length; x++) {
        const set = sets[x].split(", ");

        for (let z = 0; z < set.length; z++) {
            const card = set[z].split(" ");

            if (toCheck[card[1]] < Number(card[0])) {
                isPossible = false;
                break;
            }
        }

        if (!isPossible) break;
    }

    if (isPossible) idCount += Number(gameId);
}

console.log(idCount);


let powerCount = 0;

for (let i = 0; i < input.length; i++) {
    const sets = input[i].split(": ")[1].split("; ");

    const maxPower = {
        "red": 0,
        "green": 0,
        "blue": 0
    }

    for (let x = 0; x < sets.length; x++) {
        const set = sets[x].split(", ");

        for (let z = 0; z < set.length; z++) {
            const card = set[z].split(" ");

            if (maxPower[card[1]] < Number(card[0])) {
                maxPower[card[1]] = Number(card[0]);
            }
        }
    }

    powerCount += maxPower["red"] * maxPower["green"] * maxPower["blue"];
}

console.log(powerCount);
