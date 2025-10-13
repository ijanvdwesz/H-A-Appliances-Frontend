import React from "react";
import "../styles/StageTracker.css";

function StageTracker({ stage }) {
  const stages = ["Cart", "Delivery", "Payment", "Confirm"];

  return (
    <div className="stage-tracker">
      {stages.map((s, i) => (
        <div
          key={i}
          className={`stage ${stage === i + 1 ? "active" : ""} ${
            stage > i + 1 ? "completed" : ""
          }`}
        >
          <span className="stage-number">{i + 1}</span>
          <span>{s}</span>
        </div>
      ))}
    </div>
  );
}

export default StageTracker;
