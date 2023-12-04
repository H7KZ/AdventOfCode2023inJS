const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf8").split("\r\n");

let sum = 0;

for (let i = 0; i < input.length; i++) {
    const numbers = input[i].split(": ")[1];
    const winningNumbers = numbers.split(" | ")[0].match(/\d+/g).map(Number);
    const myNumbers = numbers.split(" | ")[1].match(/\d+/g).map(Number);

    let count = 0;

    for (let j = 0; j < myNumbers.length; j++) {
        if (winningNumbers.includes(myNumbers[j])) count++;
    }

    let powered = 0;

    for (let j = 1; j <= count; j++) {
        powered *= 2;

        if (j === 1) powered = 1;
    }

    sum += powered;
}

console.log(sum);

sum = 0;

const cards = [];

for (let i = 0; i < input.length; i++) {
    const numbers = input[i].split(": ")[1];
    const winningNumbers = numbers.split(" | ")[0].match(/\d+/g).map(Number);
    const myNumbers = numbers.split(" | ")[1].match(/\d+/g).map(Number);

    let count = 0;

    for (let j = 0; j < myNumbers.length; j++) {
        if (winningNumbers.includes(myNumbers[j])) count++;
    }

    if (!cards[i]) cards[i] = 0;

    cards[i] += 1;

    for (let j = i + 1; j <= i + count; j++) {
        if (!cards[j]) cards[j] = 0;

        cards[j] += cards[i];
    }
}

console.log(cards.filter((v, i) => i <= input.length).reduce((a, b) => a + b, 0));
