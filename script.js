var task = document.getElementById("task");
var hours = document.getElementById("hours");
var desc = document.getElementById("desc");
var colect = document.getElementById("colect");
var names = document.getElementById("names");

var options = ["1", "2", "3", "4"];
var nameArray = ["Онуфрійчук", "Григорьєв", "Ящук", "Дудник"];

document.addEventListener("DOMContentLoaded", function () {
    // Додаємо опції у select "colect"
    options.forEach(optionValue => {
        let option = document.createElement("option");
        option.value = optionValue;
        option.textContent = optionValue;
        colect.appendChild(option);
    });

    // Додаємо опції у select "names"
    nameArray.forEach(optionValue => {
        let option = document.createElement("option");
        option.value = optionValue;
        option.textContent = optionValue;
        names.appendChild(option);
    });
});

let mydata = [];

fetch("Salary.json")
    .then(response => response.json())
    .then(data => {
        mydata = data;
        // Викликаємо функцію для обробки всіх об'єктів
    })
    .catch(error => console.error("Error loading JSON:", error));

function sendAllData() {
    if (mydata.length > 0) {
        mydata.forEach(obj => {
            JsonParse(obj);
            sendRequest(obj);
        });
    } else {
        alert("No data available");
    }
}

function JsonParse(data) {
    task.value = data.task;
    hours.value = data.hours;
    desc.value = data.desc;

    colect.value = data.colect.toString();

    if (typeof data.names === "number") {
        names.selectedIndex = data.names - 1;
    } else if (typeof data.names === "string") {
        let index = nameArray.indexOf(data.names);
        if (index !== -1) {
            names.selectedIndex = index;
        } else {
            console.warn("Ім'я не знайдено в масиві:", data.names);
        }
    }
}


function sendRequest(data) {
    let container = document.getElementById("dataContainer"); // Контейнер для даних
    if (!container) {
        container = document.createElement("div");
        container.id = "dataContainer";
        document.body.appendChild(container);
    }

    let card = document.createElement("div");
    card.classList.add("data-card"); // Додаємо клас для стилізації
    card.innerHTML = `
        <p><strong>Task:</strong> ${data.task}</p>
        <p><strong>Hours:</strong> ${data.hours}</p>
        <p><strong>Description:</strong> ${data.desc}</p>
        <p><strong>Colect:</strong> ${data.colect}</p>
        <p><strong>Name:</strong> ${data.names}</p>
    `;

    container.appendChild(card);
}

function sendZP() {
    sendAllData();
}
