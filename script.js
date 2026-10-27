// 6. TOGGLE LOGIC: one boolean (yearly or not) drives everything
const sw = document.getElementById("switch");
const lblM = document.getElementById("lblMonthly");
const lblY = document.getElementById("lblYearly");
const cards = document.querySelectorAll(".card");
let yearly = false;

function render() {
  sw.setAttribute("aria-checked", String(yearly));
  lblM.classList.toggle("on", !yearly);
  lblY.classList.toggle("on", yearly);

  cards.forEach(card => {
    const price = card.querySelector(".price");
    const note = card.querySelector(".note");
    const m = Number(card.dataset.monthly);
    const y = Number(card.dataset.yearly);

    price.textContent = "$" + (yearly ? y : m);
    note.textContent = yearly ? "Billed $" + (y * 12) + " once a year" : "Billed monthly, cancel anytime";

    // restart the CSS animation: remove the class, force a reflow, add it back
    price.classList.remove("swap");
    void price.offsetWidth;
    price.classList.add("swap");
  });
}

sw.addEventListener("click", () => { yearly = !yearly; render(); });
lblM.addEventListener("click", () => { yearly = false; render(); });
lblY.addEventListener("click", () => { yearly = true; render(); });
render();