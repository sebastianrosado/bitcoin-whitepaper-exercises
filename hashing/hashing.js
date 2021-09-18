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

// TODO: insert each line into blockchain
var n = 1;
for (let line of poem) {
	Blockchain.blocks.push({
		index: n,
		prevHash: Blockchain["blocks"][n - 1]["hash"],
		data: line,
		timestamp: Date.now(),
	})
	Blockchain["blocks"][n]["hash"] = blockHash(Blockchain["blocks"][n])
	n += 1
}

console.log(Blockchain)


// console.log(`Blockchain is valid: ${verifyChain(Blockchain)}`);

function verifyChain(Blockchain) {

}

// **********************************