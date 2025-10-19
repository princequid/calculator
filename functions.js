
  const display = document.querySelector(".display");
  const buttons = document.querySelectorAll(".calc button");

  let justEvaluated = false; // tracks if "=" was just pressed

  // --- Handle button clicks ---
  buttons.forEach(button => {
    button.addEventListener("click", () => handleInput(button.textContent.trim()));
  });

  // --- Handle keyboard input ---
  document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (!isNaN(key) || ["+", "-", "*", "/", "."].includes(key)) {
      // If key is a number or operator
      handleInput(key);
    } else if (key === "Enter" || key === "=") {
      e.preventDefault(); // prevent form submission
      handleInput("=");
    } else if (key === "Backspace") {
      handleInput("←");
    } else if (key === "Escape") {
      handleInput("C");
    }
  });

  // --- Main logic handler for both click and keyboard input ---
  function handleInput(value) {
    if (value === "C") {
      display.value = "";
      justEvaluated = false;
    } 
    else if (value === "←") {
      display.value = display.value.slice(0, -1);
      justEvaluated = false;
    } 
    else if (value === "=") {
      try {
        const expression = display.value
          .replace(/×/g, "*")
          .replace(/÷/g, "/")
          .replace(/·/g, ".");
        
        display.value = eval(expression);
        justEvaluated = true;
      } catch {
        display.value = "Error";
        justEvaluated = true;
      }
    } 
    else {
      // If "=" was just pressed, reset before adding new input
      if (justEvaluated) {
        display.value = "";
        justEvaluated = false;
      }

      // Replace × and ÷ if typed from keyboard (* and / are valid)
      const sanitized = value.replace(/\*/g, "×").replace(/\//g, "÷");
      display.value += sanitized;
    }
  }
