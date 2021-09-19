"use strict";

var crypto = require("crypto");

// The Power of a Smile
// by Tupac Shakur
var poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

var Blockchain = {
	blocks: [],
};

// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: "000000",
	data: "",
	timestamp: Date.now(),
})

function blockHash(bl) {
	return crypto.createHash("sha256").update(JSON.stringify(bl)
	).digest("hex");
}

// console.log(Blockchain.blocks.length)
// TODO: insert each line into blockchain
var n = 1;
for (let line of poem) {
	Blockchain.blocks.push({
		index: n,
		prevHash: Blockchain["blocks"][n - 1]["hash"],
		data: line,
		timestamp: Date.now(),
	});

	Blockchain["blocks"][n]["hash"] = blockHash(Blockchain["blocks"][n]);

	n += 1
}

console.log(Blockchain)
// #############################
// Part 2

function verifyBlock(current_block) {
	if (current_block["index"] !== 0) {
		var prev_block = Blockchain["blocks"][current_block["index"] - 1];
		var filtered_block = Object.fromEntries(
			Object.entries(current_block).filter(e => e[0] != 'hash'));

		const conditionsArray = [
			(current_block["data"] !== null ||
				current_block["data"] !== ""),
			(current_block["prevHash"] !== null ||
				current_block["prevHash"] !== ""),
			(current_block["index"] >= 0),
			(current_block["hash"] === blockHash(filtered_block)),
			(current_block["prevHash"] === prev_block["hash"]),
		]

		if (!conditionsArray.includes(false)) {
			console.log(`Block ${current_block['index']} Valid \n`)
			return true
		} else {
			console.log(`Block ${current_block['index']} Invalid \n`)
			return false
		}
	} else {
		const conditionsArray = [
			(current_block["data"] !== null ||
				current_block["data"] !== ""),
			(current_block["index"] >= 0),
			(current_block["hash"] === "000000"),
		]

		if (!conditionsArray.includes(false)) {
			console.log(`Block ${current_block['index']} Valid \n`)
			return true
		} else {
			console.log(`Block ${current_block['index']} Valid \n`)
			return false
		}
	}
}

function verifyChain(Blockchain) {
	for (let current_block of Blockchain["blocks"]) {
		verifyBlock(current_block)
	};
	console.log(`Full Blockchain is Valid`)
	return true
}

verifyChain(Blockchain)