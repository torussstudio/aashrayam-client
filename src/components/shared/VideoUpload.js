import { useState, useRef } from 'react';
import { uploadImageToSupabase } from '../../utils/api';

const VideoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="15" height="14" rx="2"/>
    <polygon points="17 8 22 12 17 16 17 8"/>
  </svg>
);

const formatBytes = (bytes) => {
  if (!bytes) return '';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

const VideoUpload = ({ onUploadComplete, initialFile, disabled }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [uploaded, setUploaded] = useState(initialFile || null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;

    const allowed = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'];
    if (!allowed.includes(file.type)) {
      setError('Please upload a valid video file (MP4, WebM, MOV).');
      return;
    }

    const MAX_MB = 100;
    if (file.size > MAX_MB * 1024 * 1024) {
      setError(`File too large. Maximum size is ${MAX_MB} MB.`);
      return;
    }

    setUploading(true);
    setError('');
    setProgress(30);

    try {
      // Reuse the same uploadImageToSupabase utility — it works for any file type
      const publicUrl = await uploadImageToSupabase(file);

      setProgress(100);

      const result = {
        url: publicUrl,
        name: file.name,
        size: formatBytes(file.size),
        type: file.type,
      };

      setUploaded(result);
      onUploadComplete(result);
    } catch (err) {
      setError('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 800);
    }
  };

  const onInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const clearFile = () => {
    setUploaded(null);
    onUploadComplete({ url: '', name: '' });
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="file-upload">
      {uploaded ? (
        <div className="file-upload__preview">
          <div className="file-upload__preview-icon">
            <VideoIcon />
          </div>
          <div className="file-upload__preview-info">
            <div className="file-upload__preview-name">{uploaded.name || 'Uploaded video'}</div>
            {uploaded.size && <div className="file-upload__preview-size">{uploaded.size}</div>}
          </div>
          <div className="file-upload__preview-actions">
            {uploaded.url && (
              <a href={uploaded.url} target="_blank" rel="noopener noreferrer" className="file-upload__view-btn">
                Preview
              </a>
            )}
            {!disabled && (
              <button type="button" className="file-upload__remove-btn" onClick={clearFile}>
                Remove
              </button>
            )}
          </div>
        </div>
      ) : (
        <div
          className={`file-upload__dropzone ${dragging ? 'file-upload__dropzone--drag' : ''} ${disabled ? 'file-upload__dropzone--disabled' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => !disabled && inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            style={{ display: 'none' }}
            accept="video/mp4,video/webm,video/quicktime"
            onChange={onInputChange}
            disabled={disabled}
          />
          <div className="file-upload__icon">
            <VideoIcon />
          </div>
          <div className="file-upload__text">
            {uploading ? (
              <>
                <span>Uploading video...</span>
                <div className="file-upload__progress-bar">
                  <div className="file-upload__progress-fill" style={{ width: progress + '%' }} />
                </div>
              </>
            ) : (
              <>
                <span className="file-upload__primary">
                  {dragging ? 'Drop video here' : 'Drag and drop video here'}
                </span>
                <span className="file-upload__secondary">or click to browse from your device</span>
                <span className="file-upload__secondary" style={{ marginTop: 4 }}>
                  MP4, WebM, MOV — max 100 MB
                </span>
              </>
            )}
          </div>
        </div>
      )}
      {error && <p className="file-upload__error">{error}</p>}
    </div>
  );
};

export default VideoUpload;