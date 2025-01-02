function Message({ messages }) {
  return (
    <div className="space-y-4 grow">
      {messages.map(({ role, content }, idx) => (
        <div
          key={idx}
          className={`flex items-start gap-4 py-4 px-3 rounded-xl ${
            role === 'user'
              ? 'bg-primary-blue/10 justify-end text-right text-primary-blue dark:text-white'
              : 'justify-start text-left bg-gray-100 dark:bg-gray-800 text-black dark:text-gray-200'
          }`}
        >
          <div className="message-content">
            {/* Render the message content */}
            <div className="whitespace-pre-line">{content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Message;
