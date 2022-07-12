
const wrapper = document.querySelector(".wrapper"),
searchInput = wrapper.querySelector("input"),
synonyms = wrapper.querySelector(".synonym .list"),
volume = wrapper.querySelector(".word i"),
removeIcon = wrapper.querySelector(".search span"),
infoText = wrapper.querySelector(".info-text");
clearIcon = wrapper.querySelector(".search span");

let audio;
synonyms.innerHTML = "";

function fetchApi(word) {
infoText.style.color = "#000";
wrapper.classList.remove("active");
infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
fetch(url)
  .then((res) => res.json())
  .then((result) => data(result, searchInput.value))
  .catch((err) => console.log(err));
}
console.log(searchInput.value);

const data = (result, input) => {
if (result.title) {
  infoText.innerHTML = `Error! ,${word} cannot be found`;
} else {
  wrapper.classList.add("active");
  let wordFromAPI = result[0].word;
  let def = result[0].meanings[0].definitions[0];
  //  console.log(result[0].phonetics[0].text)
  phonetics = `Commonly pronounced as : ${result[0].phonetics[0].text}`;
  document.querySelector(".word span").innerText = phonetics;
  document.querySelector(".word p").innerText =
    wordFromAPI.charAt(0).toUpperCase() + wordFromAPI.slice(1);
  document.querySelector(".meaning span").innerText = def.definition;
  document.querySelector(".example span").innerText =
    def.example ?? "No example to illustrate";
  result[0].meanings[0].synonyms.map((ele) => {
    let span = document.createElement("span");
    synonyms.appendChild(span);
    span.innerHTML = ele;
  });
}
};
clearIcon.addEventListener("click", () => {
searchInput.value = "";
searchInput.focus();
wrapper.classList.remove("active");
infoText.style.color = "#9a9a9a";
infoText.innerHTML = `Type any existing word and press enter to get meaning, example,
synonyms, etc.`;
});

searchInput.addEventListener("keydown", (e) => {
if (e.key === "Enter") {
  fetchApi(searchInput.value);
}
});