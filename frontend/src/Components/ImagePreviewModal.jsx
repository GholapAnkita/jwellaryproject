import React from 'react';

const ImagePreviewModal = ({ show, imageSrc, alt, onClose }) => {
  if (!show) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div className="relative max-w-4xl max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-300 text-2xl font-bold"
        >
          ✕
        </button>
        <img
          src={imageSrc}
          alt={alt}
          className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
        />
        <div className="text-center mt-4 text-white text-sm">
          Click anywhere to close
        </div>
      </div>
    </div>
  );
};

export default ImagePreviewModal;
