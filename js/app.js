document.addEventListener("DOMContentLoaded", () => {
  const encryptButton = document.querySelector("#encrypt");
  const decryptButton = document.querySelector("#decrypt");
  const copyButton = document.querySelector("#copy");
  const outputElement = document.querySelector("#output");
  const textInputElement = document.querySelector(".text");

  const rulesEncrypt = {
    e: "enter",
    i: "imes",
    a: "ai",
    o: "ober",
    u: "ufat",
  };

  const rulesDecrypt = {
    enter: "e",
    imes: "i",
    ai: "a",
    ober: "o",
    ufat: "u",
  };

  const encryptText = (text) => {
    return text
      .split("")
      .map((char) => rulesEncrypt[char] || char)
      .join("");
  };

  const decryptText = (text) => {
    let decryptedText = text;
    for (const [key, value] of Object.entries(rulesDecrypt)) {
      const regex = new RegExp(key, "g");
      decryptedText = decryptedText.replace(regex, value);
    }
    return decryptedText;
  };

  const showMessage = (message) => {
    document.querySelector(".icon-find").classList.add("none");
    document.querySelector(".box_message").setAttribute("hidden", "");
    copyButton.removeAttribute("hidden");
    outputElement.textContent = message;
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Contenido copiado");
    } catch (error) {
      console.error("Error al copiar:", error);
    }
  };

  encryptButton.addEventListener("click", () => {
    const text = textInputElement.value.trim();
    if (!text) {
      console.log("no entro");
      return;
    }
    const encryptedMessage = encryptText(text);
    showMessage(encryptedMessage);
  });

  decryptButton.addEventListener("click", () => {
    const text = textInputElement.value.trim();
    if (!text) {
      return;
    }
    const decryptedMessage = decryptText(text);
    showMessage(decryptedMessage);
  });

  copyButton.addEventListener("click", async () => {
    const text = outputElement.textContent;
    await copyToClipboard(text);
  });
});
