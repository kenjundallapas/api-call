const adviceText = document.getElementById('adviceText');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

let currentAdviceId = null;
let adviceHistory = [];

async function fetchAdvice(adviceId = '') {
    try {
        adviceText.innerText = 'Loading...';
        const url = adviceId ? `https://api.adviceslip.com/advice/${adviceId}` : `https://api.adviceslip.com/advice`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        displayAdvice(data.slip);

    } catch (error) {
        adviceText.innerText = `Error fetching advice. ${error.message}`;
    }
}

function displayAdvice(slip) {
    adviceText.innerText = slip.advice;

    if (!adviceHistory.length || adviceHistory[adviceHistory.length - 1].id !== slip.id) {
        adviceHistory.push(slip);
    }

    currentAdviceId = slip.id;
    prevButton.disabled = adviceHistory.length <= 1;
}

nextButton.addEventListener('click', () => fetchAdvice());
prevButton.addEventListener('click', () => {
    if (adviceHistory.length > 1) {
        adviceHistory.pop();
        const previousAdvice = adviceHistory[adviceHistory.length - 1];
        adviceText.innerText = previousAdvice.advice;
        currentAdviceId = previousAdvice.id;
        prevButton.disabled = adviceHistory.length <= 1;
    }
});

fetchAdvice();
