let url = "http://universities.hipolabs.com/search?country=India";

let btn = document.querySelector("button");

btn.addEventListener("click", async () => {
    let state = document.querySelector("input").value;
    console.log(state);

    let uniArr = await getUniversities(state);
    show(uniArr);
});

function show(uniArr) {
    let list = document.querySelector("#list");
    list.innerHTML = ""; // clear the list before adding new ones
    if (uniArr.length === 0) {
        let li = document.createElement("li");
        li.innerText = "No universities found in this state.";
        list.appendChild(li);
        return;
    }
    for (uni of uniArr) {
        console.log(uni.name);
        let li = document.createElement("li");
        li.innerText = uni.name;
        list.appendChild(li);
    }
}

async function getUniversities(state) {
    try {
        let res = await axios.get(url);
        let universities = res.data;

        // Filter the universities based on the state entered by the user
        let filteredUniversities = universities.filter(uni => {
            return uni['state-province'] && uni['state-province'].toLowerCase().includes(state);
        });

        return filteredUniversities;
    } catch (err) {
        console.error("Error: ", err);
        return [];
    }
}
