const main = document.querySelector("main");
const root = document.querySelector(":root");
const input = document.getElementById("input");
const resultInput = document.getElementById("result");

const allowedKeys = [
  "(",
  ")",
  "/",
  "*",
  "-",
  "+",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "1",
  "0",
  ".",
  "%",
  " ",
];

//Código abaixo serve para clicar em número e caracteres e aparecer no input
document.querySelectorAll(".charKey").forEach(function (charKeyBtn) {
  charKeyBtn.addEventListener("click", function () {
    const value = charKeyBtn.dataset.value;
    input.value += value;
  });
});

//Código abaixo serve para botão de limpar tudo.
document.getElementById("clear").addEventListener("click", function () {
  input.value = "";
  input.focus();
});

input.addEventListener("keydown", function (ev) {
  //Código abaixo serve para não deixar que o usuário digite letras, somente oque tem nada calculadora
  ev.preventDefault();
  if (allowedKeys.includes(ev.key)) {
    input.value += ev.key;
    return;
  }
  //código abaixo serve para quando o usuário apertar o backspace apagar
  if (ev.key === "Backspace") {
    input.value = input.value.slice(0, -1);
  }
  //código abaixo serve para quando o usuário apertar o enter mostrar o resultado
  if (ev.key === "Enter") {
    calculate();
  }
});

//Código abaixo serve para quando o usuário clicar no botão de igual(=)
document.getElementById("equal").addEventListener("click", calculate);

//Código abaixo serve para fazer o calculo e mostrar no input do resultado(caixa de texto)
function calculate() {
  resultInput.value = "ERROR";
  resultInput.classList.add("error");
  const result = eval(input.value);
  resultInput.value = result;
  resultInput.classList.remove("error");
}

//Código abaixo serve para copiar resultado que aparece no ResultInput (input de resultado)
document
  .getElementById("copyToClipboard")
  .addEventListener("click", function (ev) {
    const button = ev.currentTarget;
    if (button.innerText === "Copy") {
      button.innerText = "Copied!";
      button.classList.add("success");
      navigator.clipboard.writeText(resultInput.value);
    } else {
      button.innerText = "Copy";
      button.classList.remove("success");
    }
  });

//Código abaixo serve para mudança de tema de dark para light
document.getElementById("themeSwitcher").addEventListener("click", function () {
  if (main.dataset.theme === "dark") {
    root.style.setProperty("--bg-color", "#f1f5f9");
    root.style.setProperty("--border-color", "#aaa");
    root.style.setProperty("--font-color", "#212529");
    root.style.setProperty("--primary-color", "#4b32bd");
    main.dataset.theme = "light";
  } else {
    root.style.setProperty("--bg-color", "#212529");
    root.style.setProperty("--border-color", "#666");
    root.style.setProperty("--font-color", "#f1f5f9");
    root.style.setProperty("--primary-color", "#7665c0");
    main.dataset.theme = "dark";
  }
});
