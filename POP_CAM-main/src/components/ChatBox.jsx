import React, { useState, useRef } from "react";
import "./ChatBox.css";

function ChatBox({ addMessage, messages, onVideoClick }) {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [videoBlob, setVideoBlob] = useState(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(null); // Added for preview

  const handleRecordClick = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ 
      video: true, 
      audio: true 
    });
    videoRef.current.srcObject = stream;

    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setVideoBlob(event.data);
        const url = URL.createObjectURL(event.data);
        setVideoPreviewUrl(url); // Set the preview URL
      }
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const handleStopClick = () => {
    mediaRecorderRef.current.stop();
    videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    setIsRecording(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message || videoBlob) {
      addMessage(message, videoBlob);
      setMessage("");
      setVideoBlob(null);
      setVideoPreviewUrl(null); // Reset preview URL
      videoRef.current.srcObject = null; // Reset video
    }
  };

  return (
    <div className="chatbox">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="button" onClick={isRecording ? handleStopClick : handleRecordClick}>
          {isRecording ? "Stop Recording" : "Record Video"}
        </button>
        <button type="submit" disabled={!message && !videoBlob}>Send</button>
      </form>
      {videoPreviewUrl && (
        <div className="video-preview-container">
          <p>Video Preview:</p>
          <video src={videoPreviewUrl} width="200" controls />
        </div>
      )}
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <p>{msg.message}</p>
            {msg.videoUrl && (
              <div className="video-preview" onClick={() => onVideoClick(msg.videoUrl)}>
                <p>Video: Click to play</p>
                <video src={msg.videoUrl} width="200" controls />
              </div>
            )}
          </div>
        ))}
      </div>
      <video ref={videoRef} autoPlay style={{ display: 'none' }} />
    </div>
  );
}

export default ChatBox;
