import { BugIcon } from "../icons";

const ReportButton = () => {
  const show = process.env.NODE_ENV !== "development";
  if (!show) return null;
  return (
    <div className="chatbot-bug-report-btn tooltip-container">
      <button className="chat-button">
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://forms.clickup.com/9015599350/f/8cny87p-9875/B32IRS4PP4H5FMSYDM"
        >
          <BugIcon />
        </a>
      </button>
      <div className="tooltip align-left tooltip-dark">Report Bug</div>
    </div>
  );
};

export default ReportButton;
