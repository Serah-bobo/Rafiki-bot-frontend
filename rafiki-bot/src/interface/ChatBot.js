import { useState, useEffect, useRef } from 'react';
import Message from './Message';
import InputField from './InputField';

function Chatbot({ isDarkMode }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever new message is added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Simulate the process of submitting a message
  const submitNewMessage = async () => {
    const trimmedMessage = newMessage.trim();
    if (!trimmedMessage) return;

    // Add the user message and the assistant's loading state
    setMessages(prevMessages => [
      ...prevMessages,
      { role: 'user', content: trimmedMessage },
      { role: 'assistant', content: '', loading: true },
    ]);
    setNewMessage(''); // Clear the input after message submission

    // Simulate generating a response (replace this with real backend logic)
    try {
      setTimeout(() => {
        setMessages(prevMessages => {
          const newMessages = [...prevMessages];
          newMessages[newMessages.length - 1].content = `Here's the assistant's response to: ${trimmedMessage}`; // Simulated response
          newMessages[newMessages.length - 1].loading = false;
          return newMessages;
        });
      }, 1000); // Simulate async behavior
    } catch (err) {
      console.error(err);
    }
  };

  // Function to start a new conversation
  const startNewConversation = () => {
    setMessages([]); // Clear the messages array
    setNewMessage(''); // Clear the input field
  };

  return (
    <div className={`flex flex-col h-screen ${isDarkMode ? 'dark' : ''}`}>
      {/* "Start New Conversation" button at the top left */}
      <div className="absolute z-50 top-4 left-4">
        <button
          onClick={startNewConversation}
          className="px-4 py-2 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-400 focus:outline-none"
        >
          Start New Conversation
        </button>
      </div>

      {/* Messages container with scroll */}
      <div className="flex-grow p-4 overflow-auto bg-white dark:bg-gray-900">
        {messages.length === 0 && (
          <div className="mt-3 space-y-2 text-xl font-light font-urbanist text-primary-blue dark:text-gray-300">
            <p>👋 Welcome! I'm here to help. Ask me anything.</p>
          </div>
        )}
        <Message messages={messages} />
        {/* This will help with auto-scrolling to the last message */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input field fixed at the bottom */}
      <div className="p-4 bg-white border-t dark:bg-gray-800 dark:border-gray-700">
        <InputField
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          submitNewMessage={submitNewMessage}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
}

export default Chatbot;
