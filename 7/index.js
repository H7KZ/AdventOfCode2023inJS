function getHandRank(hand) {
    const sameCards = hand.sameCards;

    if (sameCards.find((card) => card.count === 5)) {
        return {
            rank: 6,
            highestKindCard: getHighestCard(hand.cards),
            highestCardsSorted: mapCards(hand.cards)
        };
    }

    if (sameCards.find((card) => card.count === 4)) {
        return {
            rank: 5,
            highestKindCard: sameCards.find((card) => card.count === 4).card,
            highestCardsSorted: mapCards(hand.cards)
        };
    }

    if (sameCards.find((card) => card.count === 3) && sameCards.find((card) => card.count === 2)) {
        return {
            rank: 4,
            highestKindCard: getHighestCard(hand.cards),
            highestCardsSorted: mapCards(hand.cards)
        };
    }

    if (sameCards.find((card) => card.count === 3)) {
        return {
            rank: 3,
            highestKindCard: sameCards.find((card) => card.count === 3).card,
            highestCardsSorted: mapCards(hand.cards)
        };
    }

    if (sameCards.filter((card) => card.count === 2).length === 2) {
        return {
            rank: 2,
            highestKindCard: getHighestCard(hand.cards.filter((card) => card.count === 2)),
            highestCardsSorted: mapCards(hand.cards)
        };
    }

    if (sameCards.find((card) => card.count === 2)) {
        return {
            rank: 1,
            highestKindCard: sameCards.find((card) => card.count === 2).card,
            highestCardsSorted: mapCards(hand.cards)
        };
    }

    return {
        rank: 0,
        highestKindCard: getHighestCard(hand.cards),
        highestCardsSorted: mapCards(hand.cards)
    }
}

function mapCards(cards) {
    const allCards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
    return cards.map((card) => allCards.findIndex(i => i === card));
}

function getHighestCard(cards) {
    return mapCards(cards).sort((a, b) => b - a).reverse()[0];
}

const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf8").split("\r\n");

const hands = input.map((card) => {
    const [cards, bid] = card.split(" ");

    return {
        cards: cards.split(""),
        bid: Number(bid),
        sameCards: []
    };
});

for (let i = 0; i < hands.length; i++) {
    const cards = hands[i].cards;
    const sameCards = hands[i].sameCards;

    for (let j = 0; j < cards.length; j++) {
        if (!sameCards.find((card) => card.card === cards[j])) {
            sameCards.push({
                card: cards[j],
                count: 1
            });
            
            continue;
        }

        sameCards.find((card) => card.card === cards[j]).count++;
    }
}

hands.sort((a, b) => {
    const hand1 = getHandRank(a);
    const hand2 = getHandRank(b);

    if (hand1.rank > hand2.rank) {
        return -1;
    }

    if (hand1.rank < hand2.rank) {
        return 1;
    }

    if (hand1.highestKindCard < hand2.highestKindCard) {
        return -1;
    }

    if (hand1.highestKindCard > hand2.highestKindCard) {
        return 1;
    }

    for (let i = 0; i < hand1.highestCardsSorted.length; i++) {
        if (hand1.highestCardsSorted[i] > hand2.highestCardsSorted[i]) {
            return -1;
        }

        if (hand1.highestCardsSorted[i] < hand2.highestCardsSorted[i]) {
            return 1;
        }
    }

    return 0;
}).reverse();

let power = 1;

for (let i = 0; i < hands.length; i++) {
    const bid = hands[i].bid;

    power += bid * (i + 1);

    console.log(hands[i].cards.join(""), bid);
}

console.log(power);
