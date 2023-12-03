function matchEngineParts(inputString) {
    const numberRegex = /\d+/g;
    const symbolRegex = /[^a-zA-Z\d.]/g;
    const numberMatches = [];
    const symbolMatches = [];
    let match;

    while ((match = numberRegex.exec(inputString)) !== null) {
        numberMatches.push({
            number: match[0],
            position: {
                start: match.index,
                end: match.index + match[0].length - 1
            }
        });
    }

    while ((match = symbolRegex.exec(inputString)) !== null) {
        symbolMatches.push({
            symbol: match[0],
            position: {
                start: match.index,
                end: match.index
            }
        });
    }

    return { numbers: numberMatches, symbols: symbolMatches };
}

const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf8").split("\r\n");

const matches = [];

let sum = 0;

for (let i = 0; i < input.length; i++) {
    matches.push(matchEngineParts(input[i]));
}

for (let i = 0; i < matches.length; i++) {
    let numbersTop, symbolsTop;

    if (i !== 0) {
        numbersTop = matches[i - 1].numbers;
        symbolsTop = matches[i - 1].symbols;
    }

    const { numbers, symbols } = matches[i];

    let numbersDown, symbolsDown;

    if (i !== matches.length - 1) {
        numbersDown = matches[i + 1].numbers;
        symbolsDown = matches[i + 1].symbols;
    }

    for (let y = 0; y < numbers.length; y++) {
        const number = numbers[y];

        if (i !== 0) {
            const isSymbolTop = symbolsTop.some(
                symbol =>
                    symbol.position.start >= number.position.start - 1 &&
                    symbol.position.end <= number.position.end + 1
            );

            if (isSymbolTop) {
                sum += Number(number.number);
                continue;
            }
        }

        const isSymbolNextTo = symbols.some(
            symbol =>
                symbol.position.start == number.position.start - 1 ||
                symbol.position.end == number.position.end + 1
        );

        if (isSymbolNextTo) {
            sum += Number(number.number);
            continue;
        }

        if (i !== matches.length - 1) {
            const isSymbolDown = symbolsDown.some(
                symbol =>
                    symbol.position.start >= number.position.start - 1 &&
                    symbol.position.end <= number.position.end + 1
            );

            if (isSymbolDown) {
                sum += Number(number.number);
                continue;
            }
        }
    }
}

console.log(sum);

let gears = 0;

for (let i = 0; i < matches.length; i++) {
    let numbersTop, symbolsTop;

    if (i !== 0) {
        numbersTop = matches[i - 1].numbers;
        symbolsTop = matches[i - 1].symbols;
    }

    const { numbers, symbols } = matches[i];

    let numbersDown, symbolsDown;

    if (i !== matches.length - 1) {
        numbersDown = matches[i + 1].numbers;
        symbolsDown = matches[i + 1].symbols;
    }

    for (let y = 0; y < symbols.length; y++) {
        const symbol = symbols[y];
        const areThereNumbers = [];

        if (i !== 0) {
            const isNumberTop = numbersTop.some(n => (n.position.start >= symbol.position.start - 1 && n.position.start <= symbol.position.end + 1) || (n.position.end >= symbol.position.start - 1 && n.position.end <= symbol.position.end + 1));

            if (isNumberTop) {
                areThereNumbers.push(...numbersTop.filter(n => (n.position.start >= symbol.position.start - 1 && n.position.start <= symbol.position.end + 1) || (n.position.end >= symbol.position.start - 1 && n.position.end <= symbol.position.end + 1)));
            }
        }

        const isNumberNextTo = numbers.some(n => n.position.end == symbol.position.start - 1 || n.position.start == symbol.position.end + 1);

        if (isNumberNextTo) {
            areThereNumbers.push(...numbers.filter(n => n.position.end == symbol.position.start - 1 || n.position.start == symbol.position.end + 1));
        }

        if (i !== matches.length - 1) {
            const isNumberDown = numbersDown.some(n => (n.position.start >= symbol.position.start - 1 && n.position.start <= symbol.position.end + 1) || (n.position.end >= symbol.position.start - 1 && n.position.end <= symbol.position.end + 1));

            if (isNumberDown) {
                areThereNumbers.push(...numbersDown.filter(n => (n.position.start >= symbol.position.start - 1 && n.position.start <= symbol.position.end + 1) || (n.position.end >= symbol.position.start - 1 && n.position.end <= symbol.position.end + 1)));
            }
        }

        if (areThereNumbers.length <= 1 || areThereNumbers.length >= 3) {
            continue;
        }

        console.log(areThereNumbers);
        gears += Number(areThereNumbers[0].number) * Number(areThereNumbers[1].number);
    }
}

console.log(gears);
