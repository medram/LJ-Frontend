import SpinnerGrow from "../SpinnerGrow";
import AIAvatar from "@images/playground/AI-avatar.png";

export default function PlaceholderMessage({
  content = "Thinking...",
}: {
  content?: string;
}) {
  return (
    <div className="message-container">
      <img src={AIAvatar} className="avatar" />
      <div className="message ai-message placeholder">
        <div className="typing-indicator">
          <SpinnerGrow size="sm" />
          <span className="ms-2">{content}</span>
        </div>
      </div>
    </div>
  );
}
