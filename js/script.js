"use strict"

let item = document.querySelector(".tournament__item");
let finalList = [...document.querySelectorAll(".tournament__item")];
let finalChunkedList = chunkArray(finalList, 2);
let finalEights = [finalChunkedList[0], finalChunkedList[1], 
finalChunkedList[2], finalChunkedList[3],
finalChunkedList[11], finalChunkedList[12], 
finalChunkedList[13], finalChunkedList[14]];

function chunkArray(array, chunkSize) {
	let result = [];
	for (let i = 0; i < array.length; i += chunkSize) {
			let chunk = array.slice(i, i + chunkSize);
			result.push(chunk);
	}
	return result;
}

for (let i = 0; i < finalEights; i++){
	let tempClone = finalEights[i][Math.floor(Math.random() * finalEights[i].length)];
	finalChunkedList[i+4][0].append(tempClone);
}




