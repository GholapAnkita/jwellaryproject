import React, { useState, useRef, useEffect } from 'react';

const ImageCropModal = ({ show, imageSrc, onCropComplete, onCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0, width: 100, height: 100 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (imageSrc && imageRef.current) {
      const img = new Image();
      img.onload = () => {
        setImageSize({ width: img.width, height: img.height });
        // Set initial crop to center 80% of image
        const initialCrop = {
          x: img.width * 0.1,
          y: img.height * 0.1,
          width: img.width * 0.8,
          height: img.height * 0.8
        };
        setCrop(initialCrop);
      };
      img.src = imageSrc;
    }
  }, [imageSrc]);

  const handleMouseDown = (e) => {
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setCrop({ x, y, width: 0, height: 0 });
    
    const handleMouseMove = (e) => {
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;
      
      setCrop(prev => ({
        ...prev,
        width: currentX - prev.x,
        height: currentY - prev.y
      }));
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const getCroppedImage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = crop.width;
    canvas.height = crop.height;
    
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(
        img,
        crop.x, crop.y, crop.width, crop.height,
        0, 0, crop.width, crop.height
      );
      
      canvas.toBlob((blob) => {
        const file = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });
        onCropComplete(file);
      }, 'image/jpeg');
    };
    img.src = imageSrc;
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[90vh] overflow-auto">
        <h3 className="text-xl font-bold mb-4">Crop Image</h3>
        
        <div className="mb-4">
          <div className="relative inline-block">
            <img
              ref={imageRef}
              src={imageSrc}
              alt="Crop preview"
              className="max-w-full max-h-[400px] cursor-crosshair"
              onMouseDown={handleMouseDown}
            />
            
            {/* Crop overlay */}
            <div
              className="absolute border-2 border-blue-500 bg-blue-200 bg-opacity-30 pointer-events-none"
              style={{
                left: `${crop.x}px`,
                top: `${crop.y}px`,
                width: `${crop.width}px`,
                height: `${crop.height}px`
              }}
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={getCroppedImage}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Crop & Save
          </button>
        </div>
        
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};

export default ImageCropModal;
