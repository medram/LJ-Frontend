interface UserMessageProps {
  content: string;
}

export default function UserMessage({ content }: UserMessageProps) {
  return (
    <div className="message-container user">
      <div className="message user-message">
        <div className="message-content">{content}</div>
      </div>
    </div>
  );
}
