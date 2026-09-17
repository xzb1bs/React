## What this app shows

- Closures with `createTask()`
- Private counter using closure variables
- `Promise` + `setTimeout()` for loading
- `async/await` for waiting
- Sequential vs concurrent execution
- Event loop order with microtasks and tasks

## How the closure keeps the counter private

The `createTask()` function creates a new `count` variable every time it is called.

```js
function createTask(name) {
  let count = 0;

  function run() {
    count += 1;
    return count;
  }

  return { run, getCount: () => count };
}
```

Each task gets its own `count`, so different tasks do not share the same counter.

## How the call stack works in one example

When the app runs `task.run()`, JavaScript first executes the function on the Call Stack.
It sees `setTimeout(...)`, so it sends the timer to the Task Queue and keeps going.
When the timer finishes, the browser moves that callback back to the Call Stack.

## How JavaScript can continue while `setTimeout` is waiting

`setTimeout()` does not block the whole program. It only waits in the background.
JavaScript can continue running other code until the timer finishes and the callback is ready.

## Predicted and actual Event Loop output

output:

```text
1. Call stack: start
7. Async function starts
8. Call stack: end
2. Microtask: promise callback 1
3. Microtask: promise callback 2
4. Async/await resumes
5. Task queue: timer 1
6. Task queue: timer 2
```

Actual output in this app will usually be the same order because:

- the Call Stack runs first
- Promise callbacks go to the Microtask Queue
- timers go to the Task Queue
- the Event Loop checks the Microtask Queue before the Task Queue

## Difference between tasks and microtasks

- Task Queue: used for timer callbacks and other browser events.
- Microtask Queue: used for Promise callbacks and async/await continuation.

Microtasks run before the next task from the Task Queue.

## How multiple Promises and errors are handled

Each task uses `Promise` and `setTimeout()` to simulate loading. Some tasks randomly fail.
The app stores the result as `Completed` or `Failed`, then updates the UI.

## Difference between sequential and concurrent execution

Sequential execution:

```js
await task1.run();
await task2.run();
await task3.run();
```

This waits for each task to finish before starting the next one.

Concurrent execution:

```js
await Promise.all([task1.run(), task2.run(), task3.run()]);
```

This starts all tasks together. The browser waits for all of them, so the total time is usually shorter.

## Notes

The app uses random delays and random failures to make the demo feel real and to show how async code behaves in practice.
