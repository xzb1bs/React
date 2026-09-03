let name = "Aigerim";
let age = 20;
let isActive = true;
let courses = ["JS", "React", "CSS"];
let address = { city: "Almaty", street: "Abay" };
let myNull = null;
let myUndefined;

let sentence = "Student " + name + " is " + age + " years old.";

let text1 = "";
text1 += "name: " + name + " → " + typeof name + "\n";
text1 += "age: " + age + " → " + typeof age + "\n";
text1 += "isActive: " + isActive + " → " + typeof isActive + "\n";
text1 += "courses: " + courses + " → " + typeof courses + "\n";
text1 += "address: " + JSON.stringify(address) + " → " + typeof address + "\n";
text1 += "null: " + myNull + " → " + typeof myNull + "\n";
text1 += "undefined: " + myUndefined + " → " + typeof myUndefined + "\n";
text1 += "\n" + sentence;

document.getElementById("out1").textContent = text1;

let numbers = [3, 7, 2, 10, 5];

let doubled = numbers.map(function(num) {
  return num * 2;
});

let greater = numbers.filter(function(num) {
  return num > 5;
});

let firstBig = numbers.find(function(num) {
  return num > 5;
});

let sum = numbers.reduce(function(total, num) {
  return total + num;
}, 0);

let has10 = numbers.includes(10);

let text2 = "";
text2 += "Original: " + numbers + "\n";
text2 += "map * 2: " + doubled + "\n";
text2 += "filter > 5: " + greater + "\n";
text2 += "find first > 5: " + firstBig + "\n";
text2 += "sum: " + sum + "\n";
text2 += "includes 10: " + has10 + "\n";
text2 += "Original not changed: " + numbers;

document.getElementById("out2").textContent = text2;

let students = [
  { name: "Anna", id: 1, grade: 85 },
  { name: "John", id: 2, grade: 62 },
  { name: "Sara", id: 3, grade: 91 },
  { name: "Mike", id: 4, grade: 55 }
];

let goodStudents = students.filter(function(s) {
  return s.grade >= 70;
});

let studentNames = students.map(function(s) {
  return s.name;
});

let student3 = students.find(function(s) {
  return s.id === 3;
});

let bestStudent = students[0];
for (let i = 1; i < students.length; i++) {
  if (students[i].grade > bestStudent.grade) {
    bestStudent = students[i];
  }
}

let totalGrade = 0;
for (let i = 0; i < students.length; i++) {
  totalGrade = totalGrade + students[i].grade;
}
let average = totalGrade / students.length;

let withPassed = students.map(function(s) {
  return {
    name: s.name,
    id: s.id,
    grade: s.grade,
    passed: s.grade >= 70
  };
});

let text3 = "";
text3 += "grade >= 70:\n" + JSON.stringify(goodStudents, null, 2) + "\n\n";
text3 += "Names: " + studentNames + "\n";
text3 += "id = 3: " + JSON.stringify(student3) + "\n";
text3 += "Best: " + JSON.stringify(bestStudent) + "\n";
text3 += "Average: " + average + "\n";
text3 += "With passed:\n" + JSON.stringify(withPassed, null, 2);

document.getElementById("out3").textContent = text3;

let user = {
  id: 1,
  name: "Dana",
  age: 22,
  address: {
    city: "Astana",
    street: "Republic"
  }
};

let text4 = "";
text4 += "Name: " + user.name + "\n";
text4 += "City: " + user.address.city + "\n";

user.age = 23;
user.email = "dana@mail.com";
delete user.address.street;

text4 += "After changes:\n" + JSON.stringify(user, null, 2) + "\n";

let userName = user.name;
let userAge = user.age;
let userCity = user.address.city;

text4 += "name: " + userName + "\n";
text4 += "age: " + userAge + "\n";
text4 += "city: " + userCity;

document.getElementById("out4").textContent = text4;

let original = { name: "Alice", score: 10 };
let copy = original;
copy.score = 99;

let text5 = "";
text5 += "copy.score = 99\n";
text5 += "original.score = " + original.score + "\n";
text5 += "Потому что это одна ссылка\n\n";

let original2 = { name: "Alice", score: 10 };
let copy2 = Object.assign({}, original2);
copy2.score = 50;

text5 += "Object.assign copy:\n";
text5 += "original2.score = " + original2.score + "\n";
text5 += "copy2.score = " + copy2.score + "\n\n";

let user2 = {
  name: "Alice",
  address: { city: "Almaty" }
};
let copy3 = Object.assign({}, user2);
copy3.address.city = "Astana";

text5 += "Shallow copy (nested):\n";
text5 += "original city = " + user2.address.city + "\n\n";

let user3 = {
  name: "Alice",
  address: { city: "Almaty" }
};
let copy4 = {
  name: user3.name,
  address: {
    city: user3.address.city
  }
};
copy4.address.city = "Shymkent";

text5 += "Правильная копия nested:\n";
text5 += "original city = " + user3.address.city + "\n";
text5 += "copy city = " + copy4.address.city;

document.getElementById("out5").textContent = text5;

function isEven(number) {
  return number % 2 === 0;
}

let isEvenArrow = function(number) {
  return number % 2 === 0;
};

function getFullName(firstName, lastName) {
  return firstName + " " + lastName;
}

function calculatePrice(price, quantity) {
  return price * quantity;
}

function calculateDiscount(price, percent) {
  return price - (price * percent / 100);
}

function getMax(a, b) {
  if (a > b) {
    return a;
  } else {
    return b;
  }
}

let text6 = "";
text6 += "isEven(4) = " + isEven(4) + "\n";
text6 += "isEvenArrow(5) = " + isEvenArrow(5) + "\n";
text6 += "getFullName = " + getFullName("Aigerim", "K.") + "\n";
text6 += "calculatePrice(100, 3) = " + calculatePrice(100, 3) + "\n";
text6 += "calculateDiscount(200, 15) = " + calculateDiscount(200, 15) + "\n";
text6 += "getMax(12, 8) = " + getMax(12, 8);

document.getElementById("out6").textContent = text6;

function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

function calculate(a, b, operation) {
  return operation(a, b);
}

let text7 = "";
text7 += "calculate(5, 3, add) = " + calculate(5, 3, add) + "\n";
text7 += "calculate(5, 3, multiply) = " + calculate(5, 3, multiply);

document.getElementById("out7").textContent = text7;

let message = "global";
let text8 = "";

function showMessages() {
  let message = "function";
  text8 += "function: " + message + "\n";

  if (true) {
    let message = "block";
    text8 += "block: " + message + "\n";
  }

  text8 += "function after if: " + message + "\n";
}
showMessages();
text8 += "global: " + message + "\n\n";

if (true) {
  var x = "var";
}
text8 += "var outside block: " + x + "\n";
text8 += "let и const снаружи блока не видны";

document.getElementById("out8").textContent = text8;

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

let text9 = "";
text9 += "counter() = " + counter() + "\n";
text9 += "counter() = " + counter() + "\n";
text9 += "counter() = " + counter() + "\n";
text9 += "counter2() = " + counter2() + "\n";
text9 += "counter2() = " + counter2() + "\n";
text9 += "addFive(10) = " + addFive(10) + "\n";
text9 += "addFive(20) = " + addFive(20);

document.getElementById("out9").textContent = text9;

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
    total = total + arguments[i];
  }
  return total;
}

let text10 = "";
text10 += "first = " + first + ", second = " + second + "\n";
text10 += "name = " + n + ", age = " + a + "\n";
text10 += "new array: " + newNumbers + "\n";
text10 += "new user: " + JSON.stringify(newUser) + "\n";
text10 += "user + email: " + JSON.stringify(userWithEmail) + "\n";
text10 += "combined: " + combined + "\n";
text10 += "sum(1, 2) = " + sum(1, 2) + "\n";
text10 += "sum(1, 2, 3, 4) = " + sum(1, 2, 3, 4);

document.getElementById("out10").textContent = text10;

let userA = {
  name: "Bob",
  address: { city: "Almaty" }
};

let userB = {
  name: "Kate"
};

let cityA = userA.address ? userA.address.city : undefined;
let cityB = userB.address ? userB.address.city : undefined;

let displayA = (userA.address && userA.address.city) || "City not specified";
let displayB = (userB.address && userB.address.city) || "City not specified";

let text11 = "";
text11 += "userA city: " + cityA + "\n";
text11 += "userB city: " + cityB + "\n";
text11 += "display A: " + displayA + "\n";
text11 += "display B: " + displayB + "\n\n";
text11 += "|| vs ?? :\n";
text11 += "0 || 'fallback' = " + (0 || "fallback") + "\n";
text11 += "0 ?? 'fallback' = " + (0 ?? "fallback") + "\n";
text11 += "'' || 'fallback' = " + ("" || "fallback") + "\n";
text11 += "'' ?? 'fallback' = " + ("" ?? "fallback") + "\n";
text11 += "null || 'fallback' = " + (null || "fallback") + "\n";
text11 += "null ?? 'fallback' = " + (null ?? "fallback");

document.getElementById("out11").textContent = text11;

let allStudents = [
  { id: 1, name: "Anna", age: 20, grades: [85, 90, 78] },
  { id: 2, name: "John", age: 22, grades: [62, 55, 70] },
  { id: 3, name: "Sara", age: 19, grades: [91, 88, 95] },
  { id: 4, name: "Mike", age: 21, grades: [55, 60, 48] },
  { id: 5, name: "Lena", age: 20, grades: [77, 82, 80] }
];

function getAverage(grades) {
  let total = 0;
  for (let i = 0; i < grades.length; i++) {
    total = total + grades[i];
  }
  return total / grades.length;
}

function getStudentAverage(student) {
  return getAverage(student.grades);
}

function getPassedStudents(list) {
  let result = [];
  for (let i = 0; i < list.length; i++) {
    if (getStudentAverage(list[i]) >= 70) {
      result.push(list[i]);
    }
  }
  return result;
}

function getStudentNames(list) {
  let result = [];
  for (let i = 0; i < list.length; i++) {
    result.push(list[i].name);
  }
  return result;
}

function findStudent(list, id) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      return list[i];
    }
  }
  return null;
}

function getTopStudent(list) {
  let top = list[0];
  for (let i = 1; i < list.length; i++) {
    if (getStudentAverage(list[i]) > getStudentAverage(top)) {
      top = list[i];
    }
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

let textFinal = "";
textFinal += "getAverage([85, 90, 78]) = " + getAverage([85, 90, 78]).toFixed(1) + "\n";
textFinal += "Anna average = " + getStudentAverage(allStudents[0]).toFixed(1) + "\n";
textFinal += "Passed: " + getStudentNames(getPassedStudents(allStudents)) + "\n";
textFinal += "All names: " + getStudentNames(allStudents) + "\n";
textFinal += "Find id=3: " + JSON.stringify(findStudent(allStudents, 3)) + "\n";
textFinal += "Top student: " + getTopStudent(allStudents).name + "\n\n";
textFinal += "Summary:\n" + JSON.stringify(summary, null, 2);

document.getElementById("outFinal").textContent = textFinal;