let answers = {}; // Stores selected answers

function selectAnswer(question, answer) {
    answers[question] = answer;
}

function calculateResults() {
    if (Object.keys(answers).length < 2) {
        document.getElementById("quiz-result").innerText = "Please answer all questions!";
        document.getElementById("quiz-result").style.color = "#F23D3D";
        return;
    }

    let philosopherCount = {
        "Kant": 0,
        "Aristotle": 0,
        "Nietzsche": 0,
        "Hume": 0,
        "Descartes": 0
    };

    let mapping = {
        "A": "Kant",
        "B": "Aristotle",
        "C": "Nietzsche",
        "D": "Hume",
        "E": "Descartes"
    };

    for (let q in answers) {
        philosopherCount[mapping[answers[q]]] += 1;
    }

    let result = Object.keys(philosopherCount).reduce((a, b) => philosopherCount[a] > philosopherCount[b] ? a : b);

    document.getElementById("quiz-result").innerText = "Your philosophical match: " + result;
    document.getElementById("quiz-result").style.color = "#00D26A";
}
let animeAnswers = {}; // Stores selected answers for anime quiz

function selectAnswer(question, answer) {
    animeAnswers[question] = answer;
}

function calculateResults() {
    if (Object.keys(animeAnswers).length < 7) {
        document.getElementById("anime-quiz-result").innerText = "Please answer all questions!";
        document.getElementById("anime-quiz-result").style.color = "#F23D3D";
        return;
    }

    let protagonistCount = {
        "Luffy": 0,
        "Goku": 0,
        "Naruto": 0,
        "Saeba Ryo": 0,
        "Eren Yeager": 0
    };

    let mapping = {
        "A": "Luffy",
        "B": "Goku",
        "C": "Naruto",
        "D": "Saeba Ryo",
        "E": "Eren Yeager"
    };

    for (let q in animeAnswers) {
        protagonistCount[mapping[animeAnswers[q]]] += 1;
    }

    let result = Object.keys(protagonistCount).reduce((a, b) => protagonistCount[a] > protagonistCount[b] ? a : b);

    document.getElementById("anime-quiz-result").innerText = "Your anime protagonist match: " + result;
    document.getElementById("anime-quiz-result").style.color = "#00D26A";
}
