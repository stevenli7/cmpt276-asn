var color = document.getElementById("color");
var rectangleName = document.getElementById("rectangle-name");
var rectangle = document.getElementById("image");
var updateRectangles = document.getElementById("update");
var inputs = document.querySelectorAll("input");

window.onload = function display() {
    if (rectangleName.value == "") {
        document.title = "New Rectangle"
        updateRectangles.innerHTML = "ADD"
        updateRectangles.setAttribute("value", "add")
        document.getElementById("information").action = "/addRectangle"
        document.getElementById("delete").style.visibility = "hidden"
    }
    rectangle.style.setProperty("width", `${document.querySelector("input[name='width']").value}px`)
    rectangle.style.setProperty("height", `${document.querySelector("input[name='height']").value}px`)
    rectangle.style.setProperty("background-color", `${color.value}`)
};

inputs.forEach(element => element.addEventListener('input', updateValue))

function updateValue(e) {
    if (e.target.type == "number") {
        if (isNaN(e.target.valueAsNumber)) {
            alert("Please enter a number.")
            e.target.value = e.target.defaultValue
        } else if (e.target.name == "width") {
            rectangle.style.setProperty("width", `${e.target.value}px`)
        } else if (e.target.name == "height") {
            rectangle.style.setProperty("height", `${e.target.value}px`)
        }
    } else if (e.target == color) {
        rectangle.style.setProperty("background-color", `${e.target.value}`)
    } else if (e.target == rectangleName) {
        rectangle.innerHTML = e.target.value
    }
}

updateRectangles.onclick = function checkValidForm() {
    if (!CSS.supports("background-color", color.value)) {
        alert("Invalid color");
        return false;
    }
    if (rectangleName.value.trim() == "") {
        alert("Enter a name");
        return false;
    }    
    return true;
}
