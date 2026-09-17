const taskNames = ["Load Users", "Load Posts", "Load Comments"];

const taskList = document.getElementById("taskList");
const resultMessage = document.getElementById("resultMessage");
const executionTime = document.getElementById("executionTime");
const runAllBtn = document.getElementById("runAllBtn");
const runSequentialBtn = document.getElementById("runSequentialBtn");
const runEventLoopBtn = document.getElementById("runEventLoopBtn");
const actualOutput = document.getElementById("actualOutput");
const eventLoopExplanation = document.getElementById("eventLoopExplanation");

const tasks = taskNames.map(createTask);

function createTask(name) {
  let count = 0;
  let status = "Не запущено";
  let delay = 0;

  function run() {
    count = count + 1;
    status = "Загрузка...";
    delay = getRandomTime(500, 2000);
    const isSuccess = Math.random() > 0.35;

    return new Promise((resolve) => {
      setTimeout(() => {
        status = isSuccess ? "Готово" : "Ошибка";
        resolve({
          name,
          status,
          count,
          delay,
        });
      }, delay);
    });
  }

  function reset() {
    count = 0;
    status = "Не запущено";
    delay = 0;
  }

  return {
    name,
    run,
    reset,
    getCount: () => count,
    getStatus: () => status,
    getDelay: () => delay,
  };
}

function getRandomTime(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function renderTasks() {
  taskList.innerHTML = tasks
    .map((task) => {
      const status = task.getStatus();
      const itemClass =
        status === "Готово"
          ? "completed"
          : status === "Ошибка"
          ? "failed"
          : status === "Загрузка..."
          ? "loading"
          : "";

      return `
        <div class="task-card ${itemClass}">
          <h3>${task.name}</h3>
          <p><strong>Статус:</strong> ${status}</p>
          <p><strong>Количество запусков:</strong> ${task.getCount()}</p>
          <p><strong>Время ожидания:</strong> ${task.getDelay() ? `${task.getDelay()} ms` : "—"}</p>
        </div>
      `;
    })
    .join("");
}

function updateMessage(message) {
  resultMessage.textContent = message;
}

function updateExecutionTime(time) {
  executionTime.textContent = `${time} ms`;
}

function resetAllTasks() {
  tasks.forEach((task) => task.reset());
  renderTasks();
}

async function runSequentially() {
  resetAllTasks();
  updateMessage("Запускаем задачи по очереди...");

  const start = performance.now();

  for (const task of tasks) {
    await task.run();
    renderTasks();
  }

  const totalTime = Math.round(performance.now() - start);
  updateExecutionTime(totalTime);
  updateMessage("Все задачи завершены по очереди.");
}

async function runAllTasks() {
  resetAllTasks();
  updateMessage("Запускаем все задачи сразу...");

  const start = performance.now();
  const results = await Promise.all(tasks.map((task) => task.run()));
  const totalTime = Math.round(performance.now() - start);

  renderTasks();
  updateExecutionTime(totalTime);

  const completedTasks = results.filter((item) => item.status === "Готово").length;
  const failedTasks = results.filter((item) => item.status === "Ошибка").length;

  updateMessage(
    `Все задачи завершились за ${totalTime} мс. Успешно: ${completedTasks} | Ошибок: ${failedTasks}`
  );
}

async function runEventLoopDemo() {
  const output = [];
  const originalConsoleLog = console.log;

  console.log = (...args) => {
    output.push(args.join(" "));
    originalConsoleLog(...args);
  };

  try {
    updateMessage("Запускаем демонстрацию Event Loop...");

    console.log("1. Начало стека");
    setTimeout(() => console.log("5. Таймер 1"), 0);
    setTimeout(() => console.log("6. Таймер 2"), 0);

    Promise.resolve().then(() => console.log("2. Promise 1"));
    Promise.resolve().then(() => console.log("3. Promise 2"));

    async function demo() {
      console.log("7. Функция started");
      await Promise.resolve();
      console.log("4. После await");
    }

    demo();
    console.log("8. Конец стека");

    await new Promise((resolve) => setTimeout(resolve, 50));
  } finally {
    console.log = originalConsoleLog;
  }

  actualOutput.textContent = output.join("\n");

 
  updateExecutionTime(0);
  updateMessage("Демонстрация Event Loop завершена. Проверьте вывод в блоке.");
}

runAllBtn.addEventListener("click", runAllTasks);
runSequentialBtn.addEventListener("click", runSequentially);
runEventLoopBtn.addEventListener("click", runEventLoopDemo);

renderTasks();
