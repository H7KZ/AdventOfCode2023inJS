const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf8").split("\r\n");

let sum = 0;

const numbers = {
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9
}

for (let i = 0; i < input.length; i++) {
    // find first occurence of a any text number and replace it with the actual number, then find the last occurence of a any text number and replace it with the actual number
    for (let x = 0; x <= input[i].length - 1; x++) {
        let numbersMatch = [];
        
        for (const [key, value] of Object.entries(numbers)) {
            numbersMatch.push({
                key,
                i: input[i].indexOf(key),
                value
            });
        }

        if (numbersMatch.every((a) => a.i === -1)) continue;

        numbersMatch = numbersMatch.sort((a, b) => a.i - b.i).filter((a) => a.i !== -1);

        input[i] = input[i].replace(numbersMatch[0].key, `${numbersMatch[0].key[0]}${numbersMatch[0].value}${numbersMatch[0].key[numbersMatch[0].key.length - 1]}`);

        console.log(input[i]);
    }

    let number = '';

    for (let x = 0; x <= input[i].length - 1; x++) {
        if (!isNaN(input[i][x])) {
            number += input[i][x];
            break;
        }
    }
    
    for (let x = input[i].length - 1; x >= 0; x--) {
        if (!isNaN(input[i][x])) {
            number += input[i][x];
            break;
        }
    }

    console.log(number);

    sum += Number(number);
}

console.log(sum);
