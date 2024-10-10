import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const VideoModal2 = ({ isOpen, onClose, videoUrl }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="react-modal-content"
            overlayClassName="react-modal-overlay"
        >
            <video src={videoUrl} controls autoPlay style={{ width: '100%' }} />
            <button onClick={onClose}>Close</button>
        </Modal>
    );
};

export default VideoModal2;