export default function EventLoopAnimation() {
  return (
    <div className="loopSim" role="img" aria-label="One event loop turn, step by step">
      <div className="loopLanes">
        <div className="loopLane loopLaneStack">
          <h4>Call Stack</h4>
          <p>Runs current synchronous work first.</p>
          <div className="loopToken">run(currentTask)</div>
        </div>

        <div className="loopLane loopLaneMicrotask">
          <h4>Microtask Queue</h4>
          <p>Drained fully before moving on.</p>
          <div className="loopChipRow">
            <span className="loopChip">promise.then</span>
            <span className="loopChip">queueMicrotask</span>
          </div>
        </div>

        <div className="loopLane loopLaneRender">
          <h4>Render Opportunity</h4>
          <p>Browser may paint if frame is ready.</p>
          <div className="loopFrame">paint()</div>
        </div>

        <div className="loopLane loopLaneTask">
          <h4>Task Queue</h4>
          <p>Next timer or I/O callback is selected.</p>
          <div className="loopToken loopTokenNext">next macrotask</div>
        </div>
      </div>

      <ol className="loopOrder">
        <li>1. Run current call stack work.</li>
        <li>2. Drain all queued microtasks.</li>
        <li>3. Give the browser a render chance.</li>
        <li>4. Pull the next macrotask.</li>
      </ol>
    </div>
  );
}
