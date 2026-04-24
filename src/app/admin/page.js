"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

export default function AdminPage() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const res = await fetch('/api/photos');
      if (res.ok) {
        const data = await res.json();
        setPhotos(data);
      }
    } catch (error) {
      console.error('Failed to fetch photos', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);

    try {
      const res = await fetch('/api/photos', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setTitle('');
        setFile(null);
        e.target.reset();
        await fetchPhotos();
      } else {
        alert('Upload failed');
      }
    } catch (error) {
      console.error('Upload error', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this photo?')) return;

    try {
      const res = await fetch(`/api/photos?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      if (res.ok) {
        setPhotos(photos.filter(p => p.id !== id));
      } else {
        alert('Delete failed');
      }
    } catch (error) {
      console.error('Delete error', error);
      alert('Delete failed');
    }
  };

  return (
    <div className={styles.container}>
      <section>
        <h2 className={styles.sectionTitle}>Upload Photo</h2>
        <form className={styles.uploadForm} onSubmit={handleUpload}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Photo File</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={e => setFile(e.target.files[0])}
              className={styles.fileInput}
              required 
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Title (Optional)</label>
            <input 
              type="text" 
              value={title}
              onChange={e => setTitle(e.target.value)}
              className={styles.input}
              placeholder="e.g. Sunset in the mountains"
            />
          </div>
          <button type="submit" className={styles.button} disabled={uploading || !file}>
            {uploading ? 'Uploading...' : 'Upload to Gallery'}
          </button>
        </form>
      </section>

      <section>
        <h2 className={styles.sectionTitle}>Manage Gallery</h2>
        {loading ? (
          <p>Loading photos...</p>
        ) : photos.length === 0 ? (
          <p>No photos in gallery yet.</p>
        ) : (
          <div className={styles.gallery}>
            {photos.map(photo => (
              <div key={photo.id} className={styles.photoCard}>
                <Image 
                  src={photo.url} 
                  alt={photo.title || 'Gallery photo'} 
                  fill
                  className={styles.photoImage}
                  sizes="200px"
                />
                <div className={styles.photoInfo}>
                  {photo.title || 'Untitled'}
                </div>
                <div className={styles.photoOverlay}>
                  <button 
                    onClick={() => handleDelete(photo.id)}
                    className={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
