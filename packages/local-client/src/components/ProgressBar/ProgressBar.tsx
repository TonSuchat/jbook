import { FC } from "react";
import "./ProgressBar.css";

const ProgressBar: FC = () => {
  return (
    <div className="progress-cover">
      <progress className="progress is-small is-primary" max="100">
        Loading
      </progress>
    </div>
  );
};

export default ProgressBar;
