import React, { useState } from "react";
import axios from "axios";

const ChatGPT = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/chat", { message });
      setResponse(data.response);
    } catch (error) {
      console.error("Chat error", error);
    }
  };

  return (
    <div>
      <h2>Chat with GPT</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <div>
        <strong>Response:</strong> {response}
      </div>
    </div>
  );
};

export default ChatGPT;
