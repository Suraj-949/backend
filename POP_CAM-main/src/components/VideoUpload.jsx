import React, { useState } from 'react';

const VideoUpload = ({ onVideoUpload }) => {
    const [videoFile, setVideoFile] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);

    const handleVideoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setVideoFile(file);
            const url = URL.createObjectURL(file);
            setVideoUrl(url);
        }
    };

    const handleSubmit = () => {
        if (videoFile) {
            onVideoUpload(videoFile);
            setVideoFile(null);
            setVideoUrl(null);
        }
    };

    return (
        <div className="video-upload">
            <input type="file" accept="video/*" onChange={handleVideoChange} />
            {videoUrl && (
                <div className="video-preview-container">
                    <video src={videoUrl} className="video-preview" controls />
                </div>
            )}
            <button onClick={handleSubmit}>Upload Video</button>
        </div>
    );
};

export default VideoUpload;