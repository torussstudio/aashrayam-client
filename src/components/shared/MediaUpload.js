import { useState, useRef } from 'react';
import './MediaUpload.css';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;   // 5MB
const MAX_VIDEO_SIZE = 50 * 1024 * 1024;  // 50MB

const MediaUpload = ({ onMediaSelect, initialImage = null, initialMediaType = 'image', disabled = false }) => {
  const [preview, setPreview] = useState(initialImage);
  const [previewType, setPreviewType] = useState(initialMediaType);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;

    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (!isImage && !isVideo) {
      alert('Please select an image or video file.');
      return;
    }

    const maxSize = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;
    if (file.size > maxSize) {
      alert(`File size should be less than ${isVideo ? '50MB' : '5MB'}.`);
      return;
    }

    setUploading(true);
    const mediaType = isVideo ? 'video' : 'image';

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        setPreview(dataUrl);
        setPreviewType(mediaType);
        onMediaSelect(file, dataUrl, mediaType);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Error processing media:', err);
      alert('Error processing file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDragEnter = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); };
  const handleDragOver = (e) => { e.preventDefault(); e.stopPropagation(); };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) handleFile(files[0]);
  };

  const handleFileInput = (e) => {
    const files = e.target.files;
    if (files.length > 0) handleFile(files[0]);
  };

  const handleRemoveMedia = () => {
    setPreview(null);
    setPreviewType('image');
    if (fileInputRef.current) fileInputRef.current.value = '';
    onMediaSelect(null, null, 'image');
  };

  return (
    <div className="image-upload">
      {!preview ? (
        <div
          className={`image-upload__dropzone ${isDragging ? 'image-upload__dropzone--active' : ''} ${disabled ? 'image-upload__dropzone--disabled' : ''}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleFileInput}
            className="image-upload__input"
            disabled={disabled || uploading}
            aria-label="Upload image or video"
          />

          <div className="image-upload__content">
            <svg className="image-upload__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>

            <div className="image-upload__text">
              <p className="image-upload__title">
                {isDragging ? 'Drop your file here' : 'Drag and drop an image or video here'}
              </p>
              <p className="image-upload__subtitle">or click to browse from your device</p>
            </div>

            <p className="image-upload__hint">Images: JPG, PNG, GIF, WebP (max 5MB) • Videos: MP4, WebM, MOV (max 50MB)</p>

            {uploading && (
              <div className="image-upload__progress">
                <div className="progress-spinner"></div>
                <span>Processing file...</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="image-upload__preview-wrapper">
          <div className="image-upload__preview">
            {previewType === 'video' ? (
              <video src={preview} className="image-upload__preview-img" controls muted playsInline />
            ) : (
              <img src={preview} alt="Preview" className="image-upload__preview-img" />
            )}
            <div className="image-upload__preview-overlay">
              <button
                type="button"
                className="image-upload__preview-btn image-upload__preview-btn--change"
                onClick={() => fileInputRef.current?.click()}
                disabled={disabled || uploading}
                title="Change file"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Change
              </button>
              <button
                type="button"
                className="image-upload__preview-btn image-upload__preview-btn--remove"
                onClick={handleRemoveMedia}
                disabled={disabled || uploading}
                title="Remove file"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Remove
              </button>
            </div>
          </div>
          <p className="image-upload__preview-info">
            {previewType === 'video' ? 'Video selected and ready to upload' : 'Image selected and ready to upload'}
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleFileInput}
            className="image-upload__input"
            style={{ display: 'none' }}
            disabled={disabled || uploading}
          />
        </div>
      )}
    </div>
  );
};

export default MediaUpload;