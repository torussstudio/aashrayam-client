import { createClient } from '@supabase/supabase-js';
import { clientEnv, validateClientEnv } from '../config/env';

const API_URL = clientEnv.apiUrl;
const SUPABASE_URL = clientEnv.supabaseUrl;
const SUPABASE_ANON_KEY = clientEnv.supabaseAnonKey;
const SUPABASE_BUCKET = clientEnv.supabaseBucket;
const SERVER_URL = API_URL.replace(/\/api$/, '');

const supabase =
  SUPABASE_URL && SUPABASE_ANON_KEY
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

const getToken = () => localStorage.getItem('orbit_token');

const headers = (auth = false) => {
  const h = { 'Content-Type': 'application/json' };
  if (auth) h['Authorization'] = `Bearer ${getToken()}`;
  return h;
};

/**
 * Resolve a stored image path/URL to a fully-qualified URL for display.
 *
 * Cases handled:
 *  - Full https:// URL (Supabase Storage, Unsplash, etc.) → returned as-is
 *  - Legacy /uploads/... path (old local uploads) → prepend backend URL
 *  - null / undefined → null
 */
export const resolveImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path.startsWith('/uploads/')) return `${SERVER_URL}${path}`;
  return path;
};

/**
 * Upload an image file to Supabase Storage and return the public URL.
 *
 * WHY: Supabase Storage is used because it provides permanent, reliable
 * image hosting with a global CDN. This ensures images persist across
 * deployments and server restarts.
 *
 * The returned URL is a full https:// URL that works everywhere — locally,
 * in production, and in the browser — with no path resolution needed.
 *
 * @param {File} file - The image File object from the input/drop event
 * @param {string} bucket - Supabase Storage bucket name (default: 'gallery')
 * @returns {Promise<string>} - Public CDN URL of the uploaded image
 */
export const uploadImageToSupabase = async (file, bucket = SUPABASE_BUCKET) => {
  if (!supabase) {
    const missing = validateClientEnv();
    throw new Error(
      `Supabase is not configured. Missing: ${missing.join(', ')}`
    );
  }

  const ext      = file.name.split('.').pop();
  const filename = `${bucket}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${ext}`;
  const filePath = `${bucket}/${filename}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type,
    });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  if (!urlData?.publicUrl) {
    throw new Error('Failed to get public URL after upload.');
  }

  return urlData.publicUrl;
};

export const api = {
  // Auth
  login:  (data) => fetch(`${API_URL}/auth/login`, { method: 'POST', headers: headers(), body: JSON.stringify(data) }).then(r => r.json()),
  me:     ()     => fetch(`${API_URL}/auth/me`,    { headers: headers(true) }).then(r => r.json()),

  // News
  getNews:         ()        => fetch(`${API_URL}/news`).then(r => r.json()),
  getNewsById:     (id)      => fetch(`${API_URL}/news/${id}`).then(r => r.json()),
  getAllNews:       ()        => fetch(`${API_URL}/news/all`, { headers: headers(true) }).then(r => r.json()),
  createNews:      (data)    => fetch(`${API_URL}/news`,      { method: 'POST', headers: headers(true), body: JSON.stringify(data) }).then(r => r.json()),
  updateNews:      (id, data)=> fetch(`${API_URL}/news/${id}`,{ method: 'PUT',  headers: headers(true), body: JSON.stringify(data) }).then(r => r.json()),
  deleteNews:      (id)      => fetch(`${API_URL}/news/${id}`,{ method: 'DELETE', headers: headers(true) }).then(r => r.json()),

  // Events
  getEvents:       ()        => fetch(`${API_URL}/events`).then(r => r.json()),
  getAllEvents:     ()        => fetch(`${API_URL}/events/all`, { headers: headers(true) }).then(r => r.json()),
  createEvent:     (data)    => fetch(`${API_URL}/events`,       { method: 'POST', headers: headers(true), body: JSON.stringify(data) }).then(r => r.json()),
  updateEvent:     (id, data)=> fetch(`${API_URL}/events/${id}`, { method: 'PUT',  headers: headers(true), body: JSON.stringify(data) }).then(r => r.json()),
  deleteEvent:     (id)      => fetch(`${API_URL}/events/${id}`, { method: 'DELETE', headers: headers(true) }).then(r => r.json()),

  // Programs
  getPrograms:     ()        => fetch(`${API_URL}/programs`).then(r => r.json()),
  getAllPrograms:   ()        => fetch(`${API_URL}/programs/all`, { headers: headers(true) }).then(r => r.json()),
  createProgram:   (data)    => fetch(`${API_URL}/programs`,       { method: 'POST', headers: headers(true), body: JSON.stringify(data) }).then(r => r.json()),
  updateProgram:   (id, data)=> fetch(`${API_URL}/programs/${id}`, { method: 'PUT',  headers: headers(true), body: JSON.stringify(data) }).then(r => r.json()),
  deleteProgram:   (id)      => fetch(`${API_URL}/programs/${id}`, { method: 'DELETE', headers: headers(true) }).then(r => r.json()),

  // Gallery
  getGallery:      ()        => fetch(`${API_URL}/gallery`).then(r => r.json()),
  getAllGallery:    ()        => fetch(`${API_URL}/gallery/all`, { headers: headers(true) }).then(r => r.json()),
  createGallery:   (data)    => fetch(`${API_URL}/gallery`,       { method: 'POST', headers: headers(true), body: JSON.stringify(data) }).then(r => r.json()),
  updateGallery:   (id, data)=> fetch(`${API_URL}/gallery/${id}`, { method: 'PUT',  headers: headers(true), body: JSON.stringify(data) }).then(r => r.json()),
  deleteGallery:   (id)      => fetch(`${API_URL}/gallery/${id}`, { method: 'DELETE', headers: headers(true) }).then(r => r.json()),

  // Testimonials
  getTestimonials:    ()        => fetch(`${API_URL}/testimonials`).then(r => r.json()),
  getAllTestimonials:  ()        => fetch(`${API_URL}/testimonials/all`, { headers: headers(true) }).then(r => r.json()),
  createTestimonial:  (data)    => fetch(`${API_URL}/testimonials`,       { method: 'POST', headers: headers(true), body: JSON.stringify(data) }).then(r => r.json()),
  updateTestimonial:  (id, data)=> fetch(`${API_URL}/testimonials/${id}`, { method: 'PUT',  headers: headers(true), body: JSON.stringify(data) }).then(r => r.json()),
  deleteTestimonial:  (id)      => fetch(`${API_URL}/testimonials/${id}`, { method: 'DELETE', headers: headers(true) }).then(r => r.json()),

  // Resources
  getResources:       ()         => fetch(`${API_URL}/resources`).then(r => r.json()),
  getAllResources:     ()         => fetch(`${API_URL}/resources/all`, { headers: headers(true) }).then(r => r.json()),
  createResource:     (data)     => fetch(`${API_URL}/resources`,        { method: 'POST',   headers: headers(true), body: JSON.stringify(data) }).then(r => r.json()),
  updateResource:     (id, data) => fetch(`${API_URL}/resources/${id}`,  { method: 'PUT',    headers: headers(true), body: JSON.stringify(data) }).then(r => r.json()),
  deleteResource:     (id)       => fetch(`${API_URL}/resources/${id}`,  { method: 'DELETE', headers: headers(true) }).then(r => r.json()),
};