const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf8").split("\r\n");

const times = input[0].split(":")[1].match(/\d+/g).map(Number);
const distances = input[1].split(":")[1].match(/\d+/g).map(Number);

let powered = 1;

for (let i = 0; i < times.length; i++) {
    let power = 0;

    for (let j = 1; j <= times[i]; j++) {
        const speed = j;
        const time = times[i] - j;

        const distanceTraveled = speed * time;

        if (distanceTraveled > distances[i]) {
            power++;
        }
    }

    powered *= power;
}

console.log(powered);

let ways = 0;

for (let i = 1; i <= Number(times.join("")); i++) {
    const speed = i;
    const time = Number(times.join("")) - i;

    const distanceTraveled = speed * time;

    if (distanceTraveled > Number(distances.join(""))) {
        ways++;
    }
}

console.log(ways);
