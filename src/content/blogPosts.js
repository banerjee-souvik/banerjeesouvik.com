export const blogPosts = [
  {
    slug: "javascript-event-loop-deep-dive",
    title: "JavaScript Event Loop: A Practical Deep Dive",
    excerpt:
      "A grounded walkthrough of call stack, microtasks, macrotasks, and the rendering cycle with examples you can run.",
    publishedAt: "2026-04-20",
    readingMinutes: 8,
    tags: ["JavaScript", "Runtime", "Performance"],
    references: [
      {
        label: "MDN — Event loop",
        href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop",
      },
      {
        label: "javascript.info — Event loop: microtasks and macrotasks",
        href: "https://javascript.info/event-loop",
      },
      {
        label: "Jake Archibald — Tasks, microtasks, queues and schedules",
        href: "https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/",
      },
      {
        label: "Node.js docs — Understanding process.nextTick()",
        href: "https://nodejs.org/en/learn/asynchronous-work/understanding-processnexttick",
      },
      {
        label: "Animation concept inspired by MDN and Jake Archibald explanations",
        href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop",
      },
    ],
    blocks: [
      {
        type: "paragraph",
        content:
          "When people say JavaScript is single-threaded, they usually stop there. In practice, what matters is how the runtime schedules work around that single thread. That’s where the event loop becomes the real story.",
      },
      {
        type: "paragraph",
        content:
          "If you understand the event loop clearly, debugging async bugs gets less mysterious. You can predict execution order instead of guessing.",
      },
      {
        type: "paragraph",
        content:
          "A useful way to think about it: each loop turn has a strict order. JavaScript finishes what is currently running, then clears high-priority follow-up work (microtasks), then gives the browser a chance to paint, and only after that moves to the next queued task.",
      },
      {
        type: "heading",
        content: "Mental model in one screen",
      },
      {
        type: "list",
        items: [
          "Call stack runs synchronous code immediately.",
          "Web APIs (or Node internals) handle async work like timers, network, and IO.",
          "Completed callbacks are queued as tasks.",
          "Before moving to the next task, all microtasks are drained.",
          "Browser may render between tasks.",
        ],
      },
      {
        type: "heading",
        content: "Microtasks vs macrotasks",
      },
      {
        type: "paragraph",
        content:
          "The most common surprise: Promise callbacks run before setTimeout callbacks, even with 0ms delay. Promise callbacks go to the microtask queue. Timers go to the task (macrotask) queue.",
      },
      {
        type: "paragraph",
        content:
          "That 0ms timer does not mean 'run immediately'. It means 'eligible in a future turn'. If microtasks keep getting queued, they continue to run before the runtime pulls the next macrotask.",
      },
      {
        type: "code",
        language: "js",
        code: `console.log("A");

setTimeout(() => {
  console.log("B: timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("C: promise");
});

console.log("D");`,
      },
      {
        type: "paragraph",
        content: "Output order:",
      },
      {
        type: "code",
        language: "txt",
        code: `A
D
C: promise
B: timeout`,
      },
      {
        type: "heading",
        content: "The starvation trap",
      },
      {
        type: "paragraph",
        content:
          "Microtasks are drained fully before the runtime takes the next task. So if you keep scheduling microtasks recursively, timers and rendering can get delayed.",
      },
      {
        type: "code",
        language: "js",
        code: `function flood() {
  Promise.resolve().then(flood);
}

flood();

setTimeout(() => {
  console.log("I may be delayed for a long time");
}, 0);`,
      },
      {
        type: "paragraph",
        content:
          "In real apps, this shows up as UI feeling frozen even though “async” code is running.",
      },
      {
        type: "paragraph",
        content:
          "This is also why adding more Promises is not always a performance fix. You might move work out of sync code, but still block rendering if the microtask queue never gets a break.",
      },
      {
        type: "heading",
        content: "A better pattern for heavy work",
      },
      {
        type: "paragraph",
        content:
          "If you need to process a big list, chunk the work and yield back to the event loop. That keeps the page responsive.",
      },
      {
        type: "code",
        language: "js",
        code: `function processInChunks(items, chunkSize = 200) {
  let index = 0;

  function runChunk() {
    const end = Math.min(index + chunkSize, items.length);
    for (; index < end; index += 1) {
      // expensive work
      items[index] = items[index] * 2;
    }

    if (index < items.length) {
      setTimeout(runChunk, 0); // yield
    }
  }

  runChunk();
}`,
      },
      {
        type: "event-loop-animation",
        title: "Event loop in motion",
        description:
          "Step-by-step cycle: current task runs, microtasks drain, browser may render, then next macrotask is picked.",
      },
      {
        type: "heading",
        content: "Browser vs Node nuance",
      },
      {
        type: "paragraph",
        content:
          "In browsers, Promise callbacks are microtasks and timers are tasks. In Node.js, there are additional phases and `process.nextTick()` runs with even higher priority than Promise microtasks. So exact ordering can differ by environment.",
      },
      {
        type: "paragraph",
        content:
          "Rule of thumb: when order matters, test in the exact runtime you deploy to.",
      },
      {
        type: "paragraph",
        content:
          "For frontend code, this model helps answer practical questions: Why did this spinner not paint yet? Why is click handling delayed? Why does a Promise callback run before a timeout? Most of those bugs are event-loop ordering issues, not framework issues.",
      },
      {
        type: "heading",
        content: "Closing note",
      },
      {
        type: "paragraph",
        content:
          "The event loop is not just interview theory. It explains UI jank, delayed timers, and strange log orders. Once this model clicks, async JavaScript feels much more deterministic.",
      },
    ],
  },
];

export function getAllBlogPosts() {
  return blogPosts;
}

export function getBlogPostBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug);
}
