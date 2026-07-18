import { useState, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { clientEnv } from '../../config/env';

const SUPABASE_URL = clientEnv.supabaseUrl;
const SUPABASE_ANON_KEY = clientEnv.supabaseAnonKey;
const BUCKET = process.env.REACT_APP_SUPABASE_BUCKET;

const supabase =
  SUPABASE_URL && SUPABASE_ANON_KEY
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

const UploadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);

const FileIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
  </svg>
);

const formatBytes = (bytes) => {
  if (!bytes) return '';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

/**
 * FileUpload component for uploading non-image files (PDFs, DOCs, etc.)
 * to Supabase Storage.
 *
 * Props:
 *   onUploadComplete(result) — called with { url, name, size, type }
 *   initialFile — { url, name } if editing an existing record
 *   disabled — boolean
 */
const FileUpload = ({ onUploadComplete, initialFile, disabled }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [uploaded, setUploaded] = useState(initialFile || null);
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;
    if (!supabase) {
      setError('Supabase is not configured. Check REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY.');
      return;
    }

    const MAX_MB = 20;
    if (file.size > MAX_MB * 1024 * 1024) {
      setError(`File too large. Maximum size is ${MAX_MB} MB.`);
      return;
    }

    setUploading(true);
    setError('');
    setProgress(10);

    try {
      const ext = file.name.split('.').pop();
      const filename = `resource_${Date.now()}_${Math.random().toString(36).substr(2, 7)}.${ext}`;
      const filePath = `${BUCKET}/${filename}`;

      setProgress(30);

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type,
        });

      if (uploadError) throw new Error(uploadError.message);

      setProgress(80);

      const { data: urlData } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(filePath);

      if (!urlData?.publicUrl) throw new Error('Could not get public URL.');

      setProgress(100);

      const result = {
        url: urlData.publicUrl,
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
    onUploadComplete({ url: '', name: '', size: '', type: '' });
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="file-upload">
      {uploaded ? (
        <div className="file-upload__preview">
          <div className="file-upload__preview-icon">
            <FileIcon />
          </div>
          <div className="file-upload__preview-info">
            <div className="file-upload__preview-name">{uploaded.name || 'Uploaded file'}</div>
            {uploaded.size && <div className="file-upload__preview-size">{uploaded.size}</div>}
          </div>
          <div className="file-upload__preview-actions">
            {uploaded.url && (
              <a href={uploaded.url} target="_blank" rel="noopener noreferrer" className="file-upload__view-btn">
                View
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
            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar,.txt,.csv"
            onChange={onInputChange}
            disabled={disabled}
          />
          <div className="file-upload__icon">
            <UploadIcon />
          </div>
          <div className="file-upload__text">
            {uploading ? (
              <>
                <span>Uploading...</span>
                <div className="file-upload__progress-bar">
                  <div className="file-upload__progress-fill" style={{ width: progress + '%' }} />
                </div>
              </>
            ) : (
              <>
                <span className="file-upload__primary">Click or drag file here</span>
                <span className="file-upload__secondary">PDF, DOC, XLSX, PPT, ZIP — max 20 MB</span>
              </>
            )}
          </div>
        </div>
      )}
      {error && <p className="file-upload__error">{error}</p>}
    </div>
  );
};

export default FileUpload;
