// Write your demo code here, section by section.
// The HTML file has matching ids/classes for each topic:
//
// 1. Selecting Elements   -> #main-title, .submit-btn, .task
console.log(document.getElementById("main-title").textContext);

// 2. Modifying Content    -> .label, #msg, #card
console.log(document.querySelector(".label").textContent);

// 3. classList            -> #themeBtn, .card
console.log(document.querySelector("#themeBtn").classList);

// 4. Create & Remove      -> #addTaskBtn, #resetTasksBtn, #tasks
console.log(document.querySelector("#addTaskBtn").parentElement);

// 5. Events               -> #click-me, #list, #signupForm, #email, .error
//อีกวิธี
// console.log(document.querySelector("#click-me").addEventListener("click", () => {
//   console.log("Button clicked!");
// }));

const btn = document.querySelector("#click-me");
let count = 0;
btn.addEventListener("click", () => {
  count++;
  btn.textContent = "clicked" + " " + count;
});

// 6. Pokémon Card Fetcher -> #fetchBtn, #resetBtn, #gallery
console.log(document.querySelector("#fetchBtn").addEventListener("click", () => {
  fetch("https://pokeapi.co/api/v2/pokemon/1")
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
}));

