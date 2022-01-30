var weightInputs = document.getElementsByName("weight");
var scoreInputs = document.getElementsByName("score");
var totalInputs = document.getElementsByName("total");
var percentages = document.getElementsByClassName("percentage");
var numOfActivities = 4;

for (var i = 0; i < numOfActivities; i++) {
    scoreInputs[i].addEventListener('keyup', calculatePercentage);
    totalInputs[i].addEventListener('keyup', calculatePercentage);
}

window.onload = function resetFields() {
    document.getElementById("calculator").reset();
};

weight.onclick = function weightedGrade() {
    var sum = 0;
    var totalWeight = 0;
    var invalidInput = false;
    for (var i = 0; i < numOfActivities; i++) {
        var score = scoreInputs[i];
        var total = totalInputs[i];
        var weight = weightInputs[i];
        if (percentages[i].innerHTML != "") {
            if (isNaN(weight.value) || weight.value == "") {
                invalidInput = true;
            } else {
                totalWeight += Number(weight.value);
                sum += (score.value / total.value) * weight.value;
            }
        } else if (score.value != "" || total.value != "" || weight.value != "") {
            invalidInput = true;
        }
    }
    var result = (sum / totalWeight) * 100;
    if (!isNaN(result)) {
        document.getElementById("result").innerHTML = result.toFixed(2) + "%";
    }
    if (invalidInput) {
        alert("Some input fields are empty or contain invalid input.");
    }
};

document.getElementById("mean").onclick = function meanOfGrade() {
    var sum = 0;
    var totalActivities = 0;
    var invalidInput = false;
    for (var i = 0; i < numOfActivities; i++) {
        if (percentages[i].innerHTML != "") {
            totalActivities++;
            sum += scoreInputs[i].value / totalInputs[i].value;
        } else if (scoreInputs[i].value != "" || totalInputs[i].value != "") {
            invalidInput = true;
        }
    }
    var result = (sum / totalActivities) * 100;
    if (!isNaN(result)) {
        document.getElementById("result").innerHTML = result.toFixed(2) + "%";
    }
    if (invalidInput) {
        alert("Some input fields are empty or contain invalid input.");
    }
};

document.getElementById("add-activity").onclick = function addActivityRow() {
    numOfActivities++;
    var row = document.getElementById("activity-table").insertRow(-1);
    var cell1 = row.insertCell(0);
    cell1.innerHTML = "Activity " + numOfActivities;
    var cell2 = row.insertCell(1);
    cell2.innerHTML = "A" + numOfActivities;
    var cell3 = row.insertCell(2);
    cell3.innerHTML = '<input type="text" name="weight">';
    var cell4 = row.insertCell(3);
    cell4.classList.add("input");
    cell4.classList.add("grade");
    cell4.innerHTML = '<input type="text" name="score"> / <input type="text" name="total">';
    var cell5 = row.insertCell(4);
    cell4.firstElementChild.addEventListener('keyup', calculatePercentage);
    cell4.lastElementChild.addEventListener('keyup', calculatePercentage);
    cell5.classList.add("percentage");
};

function calculatePercentage(e) {
    var score;
    var total;
    var result = -1;
    var percentage = e.target.parentElement.nextElementSibling;
    if (e.target.name == "score") {
        score = e.target.value;
        total = e.target.nextElementSibling.value;
    } else if (e.target.name == "total") {
        score = e.target.previousElementSibling.value;
        total = e.target.value;
    }
    if (score != "") {
        result = (score / total) * 100;
    }
    if (isFinite(result) && result >= 0) {
        percentage.innerText = result.toFixed(2);
    } else {
        percentage.innerText = "";
    }
}