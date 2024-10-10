import React, { useState } from "react";
import ChatBox from "./components/ChatBox";
import VideoModal from "./components/VideoModal";
import "./App.css";

function App() {
  
  const [messages, setMessages] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const addMessage = (message, videoBlob) => {
    const videoUrl = URL.createObjectURL(videoBlob);
    setMessages([...messages, { message, videoUrl }]);
  };

  const openVideoModal = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="app">
      <h1>React Chat Application with Video Capture</h1>
      <ChatBox addMessage={addMessage} messages={messages} onVideoClick={openVideoModal} />
      {selectedVideo && <VideoModal videoUrl={selectedVideo} onClose={closeVideoModal} />}
    </div>
  );
}

export default App;
