let moralAnswers = {}; // Stores selected answers for Moral Philosophy Quiz
let animeAnswers = {}; // Stores selected answers for Anime Protagonist Quiz

// Function to store selected answer based on quiz type
function selectAnswer(question, answer, quizType) {
    if (quizType === "moral") {
        moralAnswers[question] = answer;
    } else if (quizType === "anime") {
        animeAnswers[question] = answer;
    }

    // Highlight selected button (reset others first)
    let buttons = document.querySelectorAll(`[onclick^="selectAnswer(${question}"]`);
    buttons.forEach(btn => btn.style.backgroundColor = "#FF914D"); // Default orange
    document.querySelector(`[onclick="selectAnswer(${question}, '${answer}', '${quizType}')"]`).style.backgroundColor = "#E67E30"; // Darker Orange
}

// Function to calculate results for the Moral Quiz
function calculateMoralResults() {
    if (Object.keys(moralAnswers).length < 6) {
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

    let moralMapping = {
        "A": "Kant",
        "B": "Aristotle",
        "C": "Nietzsche",
        "D": "Hume",
        "E": "Descartes"
    };

    for (let q in moralAnswers) {
        philosopherCount[moralMapping[moralAnswers[q]]] += 1;
    }

    let result = Object.keys(philosopherCount).reduce((a, b) => philosopherCount[a] > philosopherCount[b] ? a : b);

    document.getElementById("quiz-result").innerText = "Your philosophical match: " + result;
    document.getElementById("quiz-result").style.color = "#00D26A";
}

// Function to calculate results for the Anime Protagonist Quiz
function calculateAnimeResults() {
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

    let animeMapping = {
        "A": "Luffy",
        "B": "Goku",
        "C": "Naruto",
        "D": "Saeba Ryo",
        "E": "Eren Yeager"
    };

    for (let q in animeAnswers) {
        protagonistCount[animeMapping[animeAnswers[q]]] += 1;
    }

    let result = Object.keys(protagonistCount).reduce((a, b) => protagonistCount[a] > protagonistCount[b] ? a : b);

    document.getElementById("anime-quiz-result").innerText = "Your anime protagonist match: " + result;
    document.getElementById("anime-quiz-result").style.color = "#00D26A";
}

function updateLifeScore() {
    let checkedItems = document.querySelectorAll('#life-quiz input[type="checkbox"]:checked').length;
    let totalItems = document.querySelectorAll('#life-quiz input[type="checkbox"]').length;

    let progress = (checkedItems / totalItems) * 100;
    document.getElementById("progress-bar").style.width = `${progress}%`;

    document.getElementById("life-quiz-result").innerText = `You've completed ${checkedItems}/20 items`;
    document.getElementById("life-quiz-result").style.color = "#4CAF50";
}

function calculateLifeScore() {
    let checkedItems = document.querySelectorAll('#life-quiz input[type="checkbox"]:checked').length;
    let resultText = "";

    if (checkedItems >= 15) {
        resultText = "You are cooked, lad.";
    } else if (checkedItems >= 10) {
        resultText = "Crazy how you're still living rn...";
    } else if (checkedItems >= 5) {
        resultText = "Damn, you suffered.";
    } else {
        resultText = "Not a bad life.";
    }

    document.getElementById("life-quiz-result").innerText = `You've completed ${checkedItems}/20 items - ${resultText}`;
    document.getElementById("life-quiz-result").style.color = "#4CAF50";
}
function calculateLifeStats() {
    let birthdate = document.getElementById("birthdate").value;
    let height = parseFloat(document.getElementById("height").value);
    let weight = parseFloat(document.getElementById("weight").value);

    if (!birthdate || isNaN(height) || isNaN(weight)) {
        document.getElementById("life-results").innerHTML = `<p style="color:#FF4F4F;">Please enter all fields correctly!</p>`;
        return;
    }

    // Calculate age
    let birthDateObj = new Date(birthdate);
    let today = new Date();
    let ageYears = today.getFullYear() - birthDateObj.getFullYear();
    let ageMonths = today.getMonth() - birthDateObj.getMonth();
    let ageDays = today.getDate() - birthDateObj.getDate();

    if (ageDays < 0) {
        ageMonths--;
        ageDays += 30; // Approximate adjustment
    }
    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    let ageMinutes = ageYears * 525600 + ageMonths * 43800 + ageDays * 1440; // Rough calculation

    // Calculate BMI
    let bmi = (weight / ((height / 100) ** 2)).toFixed(1);
    let bmiCategory = "";
    let lifeExpectancyAdjustment = 0;

    if (bmi < 18.5) {
        bmiCategory = "Underweight";
        lifeExpectancyAdjustment = -Math.floor(Math.random() * 16) - 20; // Lose 20-35 years
    } else if (bmi >= 18.5 && bmi < 25) {
        bmiCategory = "Healthy";
        lifeExpectancyAdjustment = 0; // No change
    } else if (bmi >= 25 && bmi < 30) {
        bmiCategory = "Overweight";
        lifeExpectancyAdjustment = -Math.floor(Math.random() * 21) - 30; // Lose 30-50 years
    } else if (bmi >= 30 && bmi < 35) {
        bmiCategory = "Obese";
        lifeExpectancyAdjustment = -Math.floor(Math.random() * 21) - 50; // Lose 50-70 years
    } else if (bmi >= 35 && bmi < 40) {
        bmiCategory = "Severely Obese";
        lifeExpectancyAdjustment = -Math.floor(Math.random() * 21) - 70; // Lose 70-90 years
    } else if (bmi >= 40 && bmi < 45) {
        bmiCategory = "Morbidly Obese";
        lifeExpectancyAdjustment = -Math.floor(Math.random() * 26) - 90; // Lose 90-115 years
    } else {
        bmiCategory = "Beyond Human Comprehension";
        lifeExpectancyAdjustment = -Math.floor(Math.random() * 31) - 115; // Lose 115-145 years 💀
    }

    // Base life expectancy (starting from 90 years)
    let baseLifeExpectancy = 90;
    let estimatedLifeExpectancy = baseLifeExpectancy + lifeExpectancyAdjustment;
    estimatedLifeExpectancy = Math.max(estimatedLifeExpectancy, 5); // No one lives less than 5 💀

    // Predict death date
    let deathYear = birthDateObj.getFullYear() + estimatedLifeExpectancy;
    let deathDate = new Date(birthDateObj);
    deathDate.setFullYear(deathYear);

    let deathMessage = `💀 Estimated death year: <b>${deathYear}</b> (${deathDate.toDateString()})`;

    if (deathYear <= today.getFullYear()) {
        if (bmi >= 45) {
            deathMessage += `<br><span style="color:#FF4F4F;">💀 YOU SHOULD NOT BE ALIVE RIGHT NOW 💀</span>`;
        } else if (bmi >= 50) {
            deathMessage += `<br><span style="color:#FF4F4F;">💀 YOU'RE AN URBAN LEGEND. 💀</span>`;
        } else {
            deathMessage += `<br><span style="color:#FF4F4F;">💀 BRO... HOW ARE YOU STILL HERE? 💀</span>`;
        }
    }

    document.getElementById("age-result").innerHTML = `⏳ You are <b>${ageYears} years, ${ageMonths} months, and ${ageDays} days</b> old. <br> That’s about <b>${ageMinutes.toLocaleString()} minutes</b> of life!`;
    
    let roastMessage = "";
if (bmi >= 25 && bmi < 30) {
    roastMessage = "<br><span style='color:#FF9F00;'>💀 Lose some weight fatass, tf...</span>";
} else if (bmi >= 30 && bmi < 40) {
    roastMessage = "<br><span style='color:#FF4F4F;'>💀 Nah, can't even roast you at this point... genuinely feel bad for you.</span>";
} else if (bmi >= 40) {
    roastMessage = "<br><span style='color:#D40000;'>💀 Is life really that shit? I get u tbh, food is life...</span>";
}

document.getElementById("bmi-result").innerHTML = `⚖️ Your BMI is <b>${bmi}</b> (${bmiCategory}).` + roastMessage;


    document.getElementById("death-result").innerHTML = deathMessage;
}

let cancelScore = 0;

function selectAnswer(question, isYes) {
    // "Yes" answers increase cancel score
    if (isYes) {
        cancelScore++;
    }
}

function calculateCancelScore() {
    let resultText = "";

    if (cancelScore <= 2) {
        resultText = `"You gotta improve buddy..."`;
    } else if (cancelScore <= 4) {
        resultText = `"Menace to society..."`;
    } else if (cancelScore <= 7) {
        resultText = `"Bro, you are a red flag factory."`;
    } else {
        resultText = `"Don't let bro go outside, absolutely cooked...."`;
    }

    document.getElementById("cancel-quiz-result").innerHTML = `<b>${resultText}</b>`;
}

