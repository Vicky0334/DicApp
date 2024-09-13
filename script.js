const input = document.querySelector("#input");
const answer = document.querySelector("#answer");
const historyDiv = document.querySelector('.history');
const list = document.querySelector("#list");

function search(){
    if(input.value === ""){
        alert("Please type some word to find the meaning");
    }
    else {
        let value = input.value.toLowerCase();
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${value}`)
        .then(response => response.json())
        .then(data => {
            const meanings = data[0].meanings;
            const firstMeaning = meanings[0].definitions[0].definition;
            const synonyms = meanings[0].synonyms ? meanings[0].synonyms.join(", ") : "No synonyms available";

            answer.innerHTML = `
                <h2 class="text-2xl font-bold">${input.value}</h2>
                <p class="mt-4">${firstMeaning}</p>
                <p class="mt-2 text-blue-600"><strong>Synonyms:</strong> ${synonyms}</p>`;
        })
        .catch(error => {
            console.error("Error fetching the data", error);
            alert("Could not find the meaning. Please try again.");
        });
        
        store();
    }
    input.value = "";
}

input.addEventListener("keypress", function(e) {
    if (e.key === 'Enter') {
        if (input.value === "") {
            alert("Please type a word to find the meaning");
        } else {
            search();
        }
    }
});

function store(){
    let value = input.value;
    let li = document.createElement("li");
    li.innerHTML = value;
    list.appendChild(li);
    saveData();
}

function toggle(){
    historyDiv.classList.toggle("hidden");
}

function deletelist(){
    list.innerHTML = "";
    saveData();
}

function saveData(){
    localStorage.setItem("list", list.innerHTML);
}

function getData(){
    if(localStorage.getItem("list") === null){
        list.innerHTML = "";
    } else {
        list.innerHTML = localStorage.getItem("list");
    }
}
getData();
