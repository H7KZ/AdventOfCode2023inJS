const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf8").split("\r\n");

let maps = {};

const startTime = Date.now();

for (let i = 2; i < input.length; i++) {
    if (input[i].match(" map:")) {
        let map = input[i].split(" map:")[0];

        maps[map] = [];

        for (let j = i + 1; j < input.length; j++) {
            if (input[j] === "") break;

            maps[map].push(input[j].split(" ").map(Number));
        }

        i += maps[map].length;
    }
}

const mapsValues = Object.values(maps);

let lowestSeed = 0;

for (let i = 0; i < input[0].split(": ")[1].split(" ").length; i += 2) {
    const seed = input[0].split(": ")[1].split(" ").map(Number)[i];
    const range = input[0].split(": ")[1].split(" ").map(Number)[i + 1];

    console.log(i / 20 * 100 + "%");

    for (let j = seed; j < seed + range; j++) {
        let currentSeed = j;

        for (let y = 0; y < mapsValues.length; y++) {
            let mapped = false;

            for (let x = 0; x < mapsValues[y].length; x++) {
                if (currentSeed >= mapsValues[y][x][1] && currentSeed <= mapsValues[y][x][1] + mapsValues[y][x][2] - 1) {
                    currentSeed = mapsValues[y][x][0] + currentSeed - mapsValues[y][x][1];

                    mapped = true;
                }

                if (mapped) break;
            }
                
            if (y === mapsValues.length - 1) {
                if (currentSeed < lowestSeed || lowestSeed === 0) {
                    lowestSeed = currentSeed;
                }
            }
        }
    }

    // seedsCollection.push(seeds);
    // seeds = [];

    // for (let i = 0; i < mapsValues.length; i++) {
    //     const seedsCollectionCopy = [...seedsCollection];

    //     for (let j = 0; j < seedsCollectionCopy.length; j++) {
    //         for (let y = 0; y < seedsCollectionCopy[j].length; y++) {
    //             let mapped = false;
    //             for (let x = 0; x < mapsValues[i].length; x++) {
    //                 if (seedsCollectionCopy[j][y] >= mapsValues[i][x][1] && seedsCollectionCopy[j][y] <= mapsValues[i][x][1] + mapsValues[i][x][2] - 1) {
    //                     seeds[j] = mapsValues[i][x][0] + seedsCollectionCopy[j][y] - mapsValues[i][x][1];

    //                     mapped = true;
    //                 }

    //                 if (mapped) break;
    //             }
    //         }
    //     }
    // }

    // console.log(seedsCollection.length);
    
    // finalSeeds.push(seedsCollection.map(c => c[0]).sort((a, b) => a - b)[0]);

    // seedsCollection = [];
}

console.log("100%");

console.log(lowestSeed);

console.log(Date.now() - startTime);

// for (let i = 0; i < mapsValues.length; i++) {
//     const seedsCopy = [...seeds];

//     for (let j = 0; j < seedsCopy.length; j++) {
//         let mapped = false;
//         for (let x = 0; x < mapsValues[i].length; x++) {
//             if (seedsCopy[j] >= mapsValues[i][x][1] && seedsCopy[j] <= mapsValues[i][x][1] + mapsValues[i][x][2] - 1) {
//                 seeds[j] = mapsValues[i][x][0] + seedsCopy[j] - mapsValues[i][x][1];

//                 mapped = true;
//             }

//             if (mapped) break;
//         }
//     }
// }

// console.log(finalSeeds.sort((a, b) => a - b));
