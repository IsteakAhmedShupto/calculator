const screen = document.querySelector(".cal-screen");
const allBtns = document.querySelectorAll(".cal-cell");
const equalSign = document.querySelector(".cal-equal-sign");

let string_arr = [];

allBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let eqn = "";

    if (!btn.classList.contains("cal-equal-sign")) {
      if (btn.classList.contains("cal-plus-sign")) {
        string_arr.push("plus");
        eqn += btn.innerHTML;
      } else if (btn.classList.contains("cal-minus-sign")) {
        string_arr.push("minus");
        eqn += btn.innerHTML;
      } else if (btn.classList.contains("cal-times-sign")) {
        string_arr.push("times");
        eqn += btn.innerHTML;
      } else if (btn.classList.contains("cal-divide-sign")) {
        string_arr.push("div");
        eqn += btn.innerHTML;
      } else if (btn.classList.contains("cal-clearscreen")) {
        string_arr = [];
        eqn = "";
      } else {
        string_arr.push(btn.innerHTML);
        eqn += btn.innerHTML;
      }

      screen.innerHTML = eqn;
    }
  });
});

equalSign.addEventListener("click", () => {
  screen.innerHTML = "";

  for (let i = 0; i < string_arr.length - 1; i++) {
    if (string_arr[i].length > 1 && string_arr[i + 1].length > 1) {
      alert("You can't use any two signs one after another 😅");
      screen.innerHTML = "";
      string_arr = [];
      return;
    }
  }

  if (string_arr[string_arr.length - 1].length > 1) {
    alert("You can't enter signs at the end of equation 😅");
    screen.innerHTML = "";
    string_arr = [];
    return;
  }

  for (let i = 0; i < string_arr.length; i++) {
    if (string_arr[i] == "plus") {
      screen.innerHTML += "&plus;";
    } else if (string_arr[i] == "minus") {
      screen.innerHTML += "&minus;";
    } else if (string_arr[i] == "times") {
      screen.innerHTML += "&times;";
    } else if (string_arr[i] == "div") {
      screen.innerHTML += "&divide;";
    } else {
      screen.innerHTML += string_arr[i];
    }
  }

  let new_string_arr = [];

  let string_num = "";

  for (let i = 0; i < string_arr.length; i++) {
    if (string_arr[i].length > 1) {
      new_string_arr.push(string_num);
      string_num = "";
      new_string_arr.push(string_arr[i]);
    } else {
      string_num += string_arr[i];
    }
  }

  new_string_arr.push(string_num);

  let result = Number(new_string_arr[0]);

  let new_str_len = new_string_arr.length;

  for (let i = 1; i < new_str_len; i++) {
    if (new_string_arr[i] == "plus") {
      if (i + 1 < new_str_len) result += Number(new_string_arr[i + 1]);
    } else if (new_string_arr[i] == "minus") {
      if (i + 1 < new_str_len) result -= Number(new_string_arr[i + 1]);
    } else if (new_string_arr[i] == "times") {
      if (i + 1 < new_str_len) result *= Number(new_string_arr[i + 1]);
    } else if (new_string_arr[i] == "div") {
      if (i + 1 < new_str_len) result /= Number(new_string_arr[i + 1]);
    }
  }

  screen.innerHTML += "=";
  screen.innerHTML += result;
});
