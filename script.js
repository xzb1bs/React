function show(text, note) {
  console.clear();
  console.log(text);
  document.getElementById("output").textContent = text;

  if (note) {
    let cleanNote = note.replace(/<br>/g, "\n").replace(/<[^>]+>/g, "");
    console.log("\n--- Примечание ---");
    console.log(cleanNote);
    document.getElementById("note").textContent = cleanNote;
  }
}

function showTask1() {
  let name = "Aigerim";
  let age = 20;
  let isActive = true;
  let courses = ["JS", "React", "CSS"];
  let address = { city: "Almaty", street: "Abay" };
  let myNull = null;
  let myUndefined;

  let text = "";
  text += "name: " + name + " → " + typeof name + "\n";
  text += "age: " + age + " → " + typeof age + "\n";
  text += "isActive: " + isActive + " → " + typeof isActive + "\n";
  text += "courses: " + courses + " → " + typeof courses + "\n";
  text += "address: " + JSON.stringify(address) + " → " + typeof address + "\n";
  text += "null: " + myNull + " → " + typeof myNull + "\n";
  text += "undefined: " + myUndefined + " → " + typeof myUndefined + "\n\n";
  text += "Student " + name + " is " + age + " years old.";

  show(text, "Ответы:\n• let можно менять, const нельзя\n• typeof null → \"object\" (баг JS)\n• Примитивы: string, number, boolean, null, undefined, symbol, bigint");
}

function showTask2() {
  let numbers = [3, 7, 2, 10, 5];

  let doubled = numbers.map(function(n) { return n * 2; });
  let greater = numbers.filter(function(n) { return n > 5; });
  let firstBig = numbers.find(function(n) { return n > 5; });
  let sum = numbers.reduce(function(total, n) { return total + n; }, 0);
  let has10 = numbers.includes(10);

  let text = "";
  text += "Original: " + numbers + "\n";
  text += "map * 2: " + doubled + "\n";
  text += "filter > 5: " + greater + "\n";
  text += "find first > 5: " + firstBig + "\n";
  text += "sum: " + sum + "\n";
  text += "includes 10: " + has10 + "\n";
  text += "Original not changed: " + numbers;

  show(text, "map, filter, find, reduce не меняют исходный массив");
}

function showTask3() {
  let students = [
    { name: "Anna", id: 1, grade: 85 },
    { name: "John", id: 2, grade: 62 },
    { name: "Sara", id: 3, grade: 91 },
    { name: "Mike", id: 4, grade: 55 }
  ];

  let good = students.filter(function(s) { return s.grade >= 70; });
  let names = students.map(function(s) { return s.name; });
  let student3 = students.find(function(s) { return s.id === 3; });

  let best = students[0];
  for (let i = 1; i < students.length; i++) {
    if (students[i].grade > best.grade) best = students[i];
  }

  let total = 0;
  for (let i = 0; i < students.length; i++) {
    total += students[i].grade;
  }
  let avg = total / students.length;

  let withPassed = students.map(function(s) {
    return { name: s.name, id: s.id, grade: s.grade, passed: s.grade >= 70 };
  });

  let text = "";
  text += "grade >= 70:\n" + JSON.stringify(good, null, 2) + "\n\n";
  text += "Names: " + names + "\n";
  text += "id = 3: " + JSON.stringify(student3) + "\n";
  text += "Best: " + JSON.stringify(best) + "\n";
  text += "Average: " + avg + "\n";
  text += "With passed:\n" + JSON.stringify(withPassed, null, 2);

  show(text, "Оригинальные объекты не меняли");
}

function showTask4() {
  let user = {
    id: 1,
    name: "Dana",
    age: 22,
    address: { city: "Astana", street: "Republic" }
  };

  let text = "";
  text += "Name: " + user.name + "\n";
  text += "City: " + user.address.city + "\n\n";

  user.age = 23;
  user.email = "dana@mail.com";
  delete user.address.street;

  text += "After changes:\n" + JSON.stringify(user, null, 2) + "\n\n";
  text += "name: " + user.name + "\n";
  text += "age: " + user.age + "\n";
  text += "city: " + user.address.city;

  show(text, "Деструктуризация: берём name, age и city из объекта");
}

function showTask5() {
  let original = { name: "Alice", score: 10 };
  let copy = original;
  copy.score = 99;

  let text = "";
  text += "copy.score = 99\n";
  text += "original.score = " + original.score + "\n";
  text += "Потому что это одна ссылка\n\n";

  let original2 = { name: "Alice", score: 10 };
  let copy2 = Object.assign({}, original2);
  copy2.score = 50;

  text += "Object.assign:\n";
  text += "original2.score = " + original2.score + "\n";
  text += "copy2.score = " + copy2.score + "\n\n";

  let user2 = { name: "Alice", address: { city: "Almaty" } };
  let copy3 = Object.assign({}, user2);
  copy3.address.city = "Astana";

  text += "Shallow copy (nested):\n";
  text += "original city = " + user2.address.city + "\n\n";

  let user3 = { name: "Alice", address: { city: "Almaty" } };
  let copy4 = {
    name: user3.name,
    address: { city: user3.address.city }
  };
  copy4.address.city = "Shymkent";

  text += "Правильная копия:\n";
  text += "original city = " + user3.address.city + "\n";
  text += "copy city = " + copy4.address.city;

  show(text, "Обычный copy = original — одна ссылка. Вложенный объект нужно копировать отдельно.");
}

function showTask6() {
  function isEven(number) {
    return number % 2 === 0;
  }
  let isEvenArrow = function(number) {
    return number % 2 === 0;
  };
  function getFullName(first, last) {
    return first + " " + last;
  }
  function calculatePrice(price, quantity) {
    return price * quantity;
  }
  function calculateDiscount(price, percent) {
    return price - (price * percent / 100);
  }
  function getMax(a, b) {
    if (a > b) return a;
    else return b;
  }

  let text = "";
  text += "isEven(4) = " + isEven(4) + "\n";
  text += "isEvenArrow(5) = " + isEvenArrow(5) + "\n";
  text += "getFullName = " + getFullName("Aigerim", "K.") + "\n";
  text += "calculatePrice(100, 3) = " + calculatePrice(100, 3) + "\n";
  text += "calculateDiscount(200, 15) = " + calculateDiscount(200, 15) + "\n";
  text += "getMax(12, 8) = " + getMax(12, 8);

  show(text, "Обычная function и function как переменная");
}

function showTask7() {
  function add(a, b) { return a + b; }
  function multiply(a, b) { return a * b; }
  function calculate(a, b, operation) {
    return operation(a, b);
  }

  let text = "";
  text += "calculate(5, 3, add) = " + calculate(5, 3, add) + "\n";
  text += "calculate(5, 3, multiply) = " + calculate(5, 3, multiply);

  show(text, "• Функции можно хранить в переменных — да\n• Функции можно передавать в другие функции — да\n• add — сама функция, add() — её вызов");
}

function showTask8() {
  let message = "global";
  let text = "";

  function showMessages() {
    let message = "function";
    text += "function: " + message + "\n";

    if (true) {
      let message = "block";
      text += "block: " + message + "\n";
    }
    text += "function after if: " + message + "\n";
  }
  showMessages();
  text += "global: " + message + "\n\n";

  if (true) {
    var x = "var";
  }
  text += "var outside: " + x + "\n";
  text += "let и const снаружи блока не видны";

  show(text, "Global — видно везде\nFunction — только внутри функции\nBlock — let/const только внутри { }\nvar видна во всей функции, let/const — только в блоке");
}

function showTask9() {
  function createCounter() {
    let count = 0;
    return function() {
      count = count + 1;
      return count;
    };
  }

  let counter = createCounter();
  let counter2 = createCounter();

  function createAdder(value) {
    return function(number) {
      return value + number;
    };
  }
  let addFive = createAdder(5);

  let text = "";
  text += "counter() = " + counter() + "\n";
  text += "counter() = " + counter() + "\n";
  text += "counter() = " + counter() + "\n";
  text += "counter2() = " + counter2() + "\n";
  text += "counter2() = " + counter2() + "\n";
  text += "addFive(10) = " + addFive(10) + "\n";
  text += "addFive(20) = " + addFive(20);

  show(text, "Внутренняя функция помнит переменные внешней — это замыкание (closure)");
}

function showTask10() {
  let numbers2 = [10, 20, 30, 40];
  let first = numbers2[0];
  let second = numbers2[1];

  let user4 = { id: 1, name: "Anna", age: 21 };
  let n = user4.name;
  let a = user4.age;

  let newNumbers = numbers2.concat([50]);
  let newUser = Object.assign({}, user4, { age: 22 });
  let userWithEmail = Object.assign({}, user4, { email: "anna@mail.com" });
  let combined = numbers2.concat([50, 60]);

  function sum() {
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
      total += arguments[i];
    }
    return total;
  }

  let text = "";
  text += "first = " + first + ", second = " + second + "\n";
  text += "name = " + n + ", age = " + a + "\n";
  text += "new array: " + newNumbers + "\n";
  text += "new user: " + JSON.stringify(newUser) + "\n";
  text += "user + email: " + JSON.stringify(userWithEmail) + "\n";
  text += "combined: " + combined + "\n";
  text += "sum(1, 2) = " + sum(1, 2) + "\n";
  text += "sum(1, 2, 3, 4) = " + sum(1, 2, 3, 4);

  show(text, "Spread — разворачивает. Rest — собирает оставшиеся значения в массив.");
}

function showTask11() {
  let userA = { name: "Bob", address: { city: "Almaty" } };
  let userB = { name: "Kate" };

  let cityA = userA.address ? userA.address.city : undefined;
  let cityB = userB.address ? userB.address.city : undefined;

  let displayA = (userA.address && userA.address.city) || "City not specified";
  let displayB = (userB.address && userB.address.city) || "City not specified";

  let text = "";
  text += "userA city: " + cityA + "\n";
  text += "userB city: " + cityB + "\n";
  text += "display A: " + displayA + "\n";
  text += "display B: " + displayB + "\n\n";
  text += "|| vs ?? :\n";
  text += "0 || 'fallback' = " + (0 || "fallback") + "\n";
  text += "0 ?? 'fallback' = " + (0 ?? "fallback") + "\n";
  text += "'' || 'fallback' = " + ("" || "fallback") + "\n";
  text += "'' ?? 'fallback' = " + ("" ?? "fallback") + "\n";
  text += "null || 'fallback' = " + (null || "fallback") + "\n";
  text += "null ?? 'fallback' = " + (null ?? "fallback");

  show(text, "|| считает пустыми 0, '', false, null, undefined.\n?? только null и undefined.");
}

function showFinal() {
  let allStudents = [
    { id: 1, name: "Anna", age: 20, grades: [85, 90, 78] },
    { id: 2, name: "John", age: 22, grades: [62, 55, 70] },
    { id: 3, name: "Sara", age: 19, grades: [91, 88, 95] },
    { id: 4, name: "Mike", age: 21, grades: [55, 60, 48] },
    { id: 5, name: "Lena", age: 20, grades: [77, 82, 80] }
  ];

  function getAverage(grades) {
    let total = 0;
    for (let i = 0; i < grades.length; i++) total += grades[i];
    return total / grades.length;
  }

  function getStudentAverage(student) {
    return getAverage(student.grades);
  }

  function getPassedStudents(list) {
    let result = [];
    for (let i = 0; i < list.length; i++) {
      if (getStudentAverage(list[i]) >= 70) result.push(list[i]);
    }
    return result;
  }

  function getStudentNames(list) {
    let result = [];
    for (let i = 0; i < list.length; i++) result.push(list[i].name);
    return result;
  }

  function findStudent(list, id) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return null;
  }

  function getTopStudent(list) {
    let top = list[0];
    for (let i = 1; i < list.length; i++) {
      if (getStudentAverage(list[i]) > getStudentAverage(top)) top = list[i];
    }
    return top;
  }

  let summary = [];
  for (let i = 0; i < allStudents.length; i++) {
    let s = allStudents[i];
    let avg = getStudentAverage(s);
    summary.push({
      id: s.id,
      name: s.name,
      average: avg.toFixed(1),
      passed: avg >= 70
    });
  }

  let text = "";
  text += "getAverage([85, 90, 78]) = " + getAverage([85, 90, 78]).toFixed(1) + "\n";
  text += "Anna average = " + getStudentAverage(allStudents[0]).toFixed(1) + "\n";
  text += "Passed: " + getStudentNames(getPassedStudents(allStudents)) + "\n";
  text += "All names: " + getStudentNames(allStudents) + "\n";
  text += "Find id=3: " + JSON.stringify(findStudent(allStudents, 3)) + "\n";
  text += "Top student: " + getTopStudent(allStudents).name + "\n\n";
  text += "Summary:\n" + JSON.stringify(summary, null, 2);

  show(text, "Все функции не меняют исходные данные");
}