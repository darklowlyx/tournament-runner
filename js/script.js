/*

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

*/

"use strict";

document.addEventListener("DOMContentLoaded", () => {
    let items = document.querySelectorAll(".tournament__eighth-finals .tournament__item");
    let itemsArray = Array.from(items);

    let chunkedItems = chunkArray(itemsArray, 2);
    let finalEights = chunkedItems.slice(0, 8);

    let quarterFinals = document.querySelectorAll(".tournament__quarter-finals .tournament__item");
    let semiFinals = document.querySelectorAll(".tournament__semi-finals .tournament__item");
    let finals = document.querySelectorAll(".tournament__final .tournament__item");
    
    function chunkArray(array, chunkSize) {
        let result = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            let chunk = array.slice(i, i + chunkSize);
            result.push(chunk);
        }
        return result;
    }

    function moveRandomElement(sourcePairs, targetCells, delay, callback) {
        sourcePairs.forEach((pair, index) => {
            setTimeout(() => {
                let randomIndex = Math.floor(Math.random() * pair.length);
                let winner = pair[randomIndex];
                let winnerClone = winner.cloneNode(true);
                winnerClone.style.position = 'absolute';
                winnerClone.style.transition = 'transform 1s ease-in-out';
                document.body.appendChild(winnerClone);

                let rect = winner.getBoundingClientRect();
                let targetRect = targetCells[index].getBoundingClientRect();
                winnerClone.style.left = `${rect.left}px`;
                winnerClone.style.top = `${rect.top}px`;
                winnerClone.style.transform = `translate(${targetRect.left - rect.left}px, ${targetRect.top - rect.top}px)`;

                setTimeout(() => {
                    targetCells[index].appendChild(winner.cloneNode(true));
                    winnerClone.remove();
                    if (callback && index === sourcePairs.length - 1) {
                        callback();
                    }
                }, 1000);
            }, delay * (index + 1));
        });
    }

    function showWinner(winnerElement) {
        let winnerContainer = document.getElementById('winner-container');
        let winnerName = winnerElement.querySelector('span').innerText;
        let winnerDiv = document.getElementById('winner');
        let winnerText = document.getElementById('winner-text');
        winnerDiv.innerText = winnerName;
        winnerText.innerText = `Победитель: ${winnerName}`;
        winnerContainer.style.display = 'block';
    }

    moveRandomElement(finalEights, quarterFinals, 1000, () => {
        let quarterFinalPairs = chunkArray(Array.from(quarterFinals), 2);
        moveRandomElement(quarterFinalPairs, semiFinals, 1000, () => {
            let semiFinalPairs = chunkArray(Array.from(semiFinals), 2);
            moveRandomElement(semiFinalPairs, finals, 1000, () => {
                let finalPairs = chunkArray(Array.from(finals), 2);
                setTimeout(() => {
                    let winnerIndex = Math.floor(Math.random() * finalPairs[0].length);
                    let winner = finalPairs[0][winnerIndex];
                    let winnerClone = winner.cloneNode(true);
                    winnerClone.style.position = 'absolute';
                    winnerClone.style.transition = 'transform 1s ease-in-out';
                    document.body.appendChild(winnerClone);

                    let rect = winner.getBoundingClientRect();
                    let targetRect = document.getElementById('winner').getBoundingClientRect();
                    winnerClone.style.left = `${rect.left}px`;
                    winnerClone.style.top = `${rect.top}px`;
                    winnerClone.style.transform = `translate(${targetRect.left - rect.left}px, ${targetRect.top - rect.top}px)`;

                    setTimeout(() => {
                        winnerClone.remove();
                        showWinner(winner);
                    }, 1000);
                }, 1000);
            });
        });
    });
});
