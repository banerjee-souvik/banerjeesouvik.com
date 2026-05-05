export const blogPosts = [
  {
    slug: "rum-instrumentation-pitfalls",
    title: "When Your Performance Dashboard Lies: RUM Pitfalls to Avoid",
    excerpt:
      "A practical deep dive into RUM sampling bias, percentile traps, and why your numbers may disagree with CrUX.",
    publishedAt: "2026-05-05",
    readingMinutes: 11,
    tags: ["Web Performance", "RUM", "Core Web Vitals"],
    references: [
      {
        label: "web.dev — Metrics",
        href: "https://web.dev/metrics/",
      },
      {
        label: "web.dev — Defining Core Web Vitals thresholds",
        href: "https://web.dev/articles/defining-core-web-vitals-thresholds",
      },
      {
        label: "web.dev — Chrome UX Report",
        href: "https://web.dev/articles/chrome-ux-report",
      },
      {
        label: "DebugBear — Field data vs lab data",
        href: "https://www.debugbear.com/docs/lab-data-vs-real-user-data",
      },
      {
        label: "Google Search Central — Core Web Vitals and page experience",
        href: "https://developers.google.com/search/docs/appearance/core-web-vitals",
      },
      {
        label: "W3C — Navigation Timing Level 2",
        href: "https://www.w3.org/TR/navigation-timing-2/",
      },
    ],
    blocks: [
      {
        type: "paragraph",
        content:
          "A familiar story: dashboards look green, release goes out, and users still complain the app feels slow. Most of the time, this is not because RUM is useless. It is because we are reading it incorrectly.",
      },
      {
        type: "paragraph",
        content:
          "I have seen this happen after seemingly successful launches: p75 LCP looked stable on the main dashboard, but support tickets spiked from Android users on weaker networks. The issue was real, the dashboard just did not represent that segment well.",
      },
      {
        type: "paragraph",
        content:
          "RUM is only as good as the population you capture and the way you aggregate it. Small mistakes in sampling and percentiles can make a healthy graph hide a bad user experience.",
      },
      {
        type: "heading",
        content: "Pitfall 1: Sampling bias hides the users who struggle most",
      },
      {
        type: "paragraph",
        content:
          "Many teams unintentionally sample the easiest sessions: fast devices, stable networks, and logged-in users who stay longer. The slow edge cases are often underrepresented or completely missing.",
      },
      {
        type: "paragraph",
        content:
          "A classic example is consent-gated analytics. Users who accept quickly are often from faster devices and stronger connections. Users who bounce early, struggle with heavy first-load JS, or never complete consent are the same users most likely to have poor performance, and they disappear from the dataset.",
      },
      {
        type: "list",
        items: [
          "Script blocked by ad blockers, consent flows, or strict network policies.",
          "Users bounce before your RUM SDK initializes.",
          "Low-end phones drop events due to memory pressure.",
          "Sampling rates differ between pages or environments.",
          "Only authenticated traffic is measured, while anonymous traffic is ignored.",
        ],
      },
      {
        type: "paragraph",
        content:
          "If your worst users are the least likely to be measured, your p75 will look artificially good.",
      },
      {
        type: "paragraph",
        content:
          "On one storefront migration, we tracked LCP only after user authentication because that was where product analytics already existed. Homepage and category pages looked fine in RUM, but revenue dropped. Later we discovered anonymous traffic on landing pages had much worse load performance and was never being measured.",
      },
      {
        type: "heading",
        content: "Pitfall 2: Percentile traps",
      },
      {
        type: "paragraph",
        content:
          "Median (p50) is usually too optimistic for UX decisions. Core Web Vitals are evaluated at p75 for a reason: the slow quarter of your users matters.",
      },
      {
        type: "paragraph",
        content:
          "Another common issue is averaging page-level percentiles. Percentiles are not additive. Averaging p75 values across routes can create numbers that have no statistical meaning.",
      },
      {
        type: "code",
        language: "js",
        code: `// ❌ Wrong: averaging p75 from each page
const dashboardLcp = average([
  p75(homeLcp),
  p75(searchLcp),
  p75(productLcp),
]);

// ✅ Better: combine all page samples first, then compute p75
const dashboardLcp = p75([
  ...homeLcpSamples,
  ...searchLcpSamples,
  ...productLcpSamples,
]);`,
      },
      {
        type: "paragraph",
        content:
          "If one route has 10x traffic, it should contribute 10x weight. Sample-level aggregation handles that naturally. Route-level averaging does not.",
      },
      {
        type: "paragraph",
        content:
          "Another trap is mixing very different journeys into one line. Imagine home page, search results, and checkout all bundled into one p75. A checkout regression can be severe but invisible because homepage traffic dominates volume.",
      },
      {
        type: "code",
        language: "txt",
        code: `Example:
- Home: p75 INP = 140ms, 900k samples
- Checkout: p75 INP = 420ms, 40k samples

Global blended line may still look "acceptable",
while the revenue-critical path is clearly degraded.`,
      },
      {
        type: "heading",
        content: "Pitfall 3: CrUX and internal RUM disagree (and both can still be correct)",
      },
      {
        type: "paragraph",
        content:
          "Teams panic when CrUX p75 LCP is worse than internal RUM. Usually this is a scope mismatch, not a data bug.",
      },
      {
        type: "list",
        items: [
          "Population: CrUX is Chrome users with eligible data; your RUM depends on your SDK coverage.",
          "Scope: CrUX can be origin-level or URL-level; your dashboard may be route templates.",
          "Window: CrUX uses a rolling 28-day window; your chart might be last 24h or 7d.",
          "Filtering: country/device/network filters may differ by default.",
          "Instrumentation: custom LCP handling may not match standard definitions.",
        ],
      },
      {
        type: "paragraph",
        content:
          "If you compare non-equivalent populations, every conclusion after that is shaky.",
      },
      {
        type: "paragraph",
        content:
          "In practice, I treat CrUX as an external truth signal and internal RUM as operational detail. If CrUX worsens but internal RUM looks flat, that is usually a hint that your internal coverage is missing a segment, not that CrUX is wrong.",
      },
      {
        type: "heading",
        content: "A practical reconciliation framework",
      },
      {
        type: "paragraph",
        content:
          "Before comparing numbers, force both views into the same shape. This removes 80% of confusion in performance reviews.",
      },
      {
        type: "list",
        items: [
          "Compare p75 to p75 only.",
          "Use similar time windows (or annotate when they differ).",
          "Segment by device class, country, and connection type.",
          "Separate high-traffic routes from long-tail routes.",
          "Track both inclusion rate and metric values.",
        ],
      },
      {
        type: "heading",
        content: "Frontend RUM metrics that are worth tracking",
      },
      {
        type: "list",
        items: [
          "LCP (p75): loading speed of the main content for real users.",
          "INP (p75): responsiveness under real interaction pressure.",
          "CLS (p75): visual stability during page lifecycle.",
          "TTFB (p75): backend + network delay as seen by the browser.",
          "Navigation type split: fresh load vs bfcache restore vs back/forward.",
          "Long tasks count and total blocking time per session.",
          "Resource timing outliers (largest JS/CSS/image contributors).",
          "Coverage metric: % sessions where vitals were successfully captured.",
        ],
      },
      {
        type: "paragraph",
        content:
          "Alongside vitals, attach context fields at capture time: route group, device class, connection type, country, and release version. Without these dimensions, debugging is mostly guesswork.",
      },
      {
        type: "code",
        language: "js",
        code: `import { onLCP, onINP, onCLS, onTTFB } from "web-vitals";

function sendRum(metricName, value, id) {
  const nav = performance.getEntriesByType("navigation")[0];
  const payload = {
    metricName,
    value,
    id,
    path: window.location.pathname,
    routeGroup: getRouteGroup(window.location.pathname),
    releaseVersion: window.__APP_VERSION__,
    deviceMemory: navigator.deviceMemory ?? null,
    connectionType: navigator.connection?.effectiveType ?? "unknown",
    navigationType: nav?.type ?? "unknown",
  };

  navigator.sendBeacon("/rum", JSON.stringify(payload));
}

onLCP((metric) => sendRum("LCP", metric.value, metric.id));
onINP((metric) => sendRum("INP", metric.value, metric.id));
onCLS((metric) => sendRum("CLS", metric.value, metric.id));
onTTFB((metric) => sendRum("TTFB", metric.value, metric.id));`,
      },
      {
        type: "paragraph",
        content:
          "This quickly exposes where the pain actually is. In many products, desktop p75 is fine while low-end Android in specific regions is severely degraded.",
      },
      {
        type: "paragraph",
        content:
          "One useful ritual is to review vitals by business-critical slice every week: first-time visitors, checkout funnel, and low-end mobile. This catches issues earlier than a single blended dashboard.",
      },
      {
        type: "heading",
        content: "Instrumentation checklist that prevents misleading dashboards",
      },
      {
        type: "list",
        items: [
          "Record a lightweight event as early as possible to estimate RUM script coverage.",
          "Log sample inclusion/exclusion reason (blocked, consent denied, no vitals event, etc.).",
          "Store context: route, device class, effective connection type, country, and release version.",
          "Keep metric definitions stable; version them when you change calculation logic.",
          "Alert on both metric regression and sudden drop in sample volume.",
        ],
      },
      {
        type: "paragraph",
        content:
          "A dashboard should answer two questions at once: “How fast are we?” and “Who are we missing?” If you only answer the first, you can still ship regressions confidently.",
      },
      {
        type: "paragraph",
        content:
          "If I had to pick one change with the highest ROI: add an explicit coverage panel next to vitals. Show how many sessions were eligible, measured, excluded, and why. Teams make better performance decisions when uncertainty is visible.",
      },
      {
        type: "heading",
        content: "How frontend teams can apply this in practice",
      },
      {
        type: "paragraph",
        content:
          "For frontend engineers, this becomes most useful when it is part of delivery workflow instead of a separate analytics exercise. A simple operating model works well in most teams:",
      },
      {
        type: "list",
        items: [
          "Instrument vitals early in page lifecycle, especially on anonymous and landing routes.",
          "Track measurement coverage with explicit exclusion reasons (blocked script, consent, early bounce, runtime error).",
          "Use p75 by segment (device class, country, route group) instead of one blended global chart.",
          "Keep business-critical journeys isolated in dashboards (signup, checkout, payment success path).",
          "Attach release version to RUM events so regressions map to deploys quickly.",
          "Review CrUX and internal RUM together on a fixed cadence, with aligned time windows and filters.",
        ],
      },
      {
        type: "paragraph",
        content:
          "In code reviews, it helps to include a short performance note: expected LCP/INP/CLS impact, likely affected segment, and rollout guardrails. This habit keeps performance ownership close to feature work.",
      },
      {
        type: "heading",
        content: "Closing note",
      },
      {
        type: "paragraph",
        content:
          "RUM is one of the best tools we have for real-user performance, but only if we treat it as measurement science, not just pretty charts. Good sampling and correct percentile math turn performance work from debate into engineering.",
      },
    ],
  },
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
