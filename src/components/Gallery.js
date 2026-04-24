"use client";

import { useState } from 'react';
import PhotoCard from './PhotoCard';
import Lightbox from './Lightbox';
import styles from './Gallery.module.css';

export default function Gallery({ photos }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <div className={styles.galleryContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <span className={styles.name}>Arjun Vinod</span>
          <span className={styles.category}>Photography</span>
        </h1>
        <p className={styles.subtitle}>Capturing moments, emotions, and stories through the lens.</p>
      </header>

      {photos.length === 0 ? (
        <div className={styles.emptyState}>
          No photos available yet. Check back soon.
        </div>
      ) : (
        <div className={styles.masonry}>
          {photos.map((photo) => (
            <PhotoCard 
              key={photo.id} 
              photo={photo} 
              onClick={(p) => setSelectedPhoto(p)} 
            />
          ))}
        </div>
      )}

      {selectedPhoto && (
        <Lightbox 
          photo={selectedPhoto} 
          onClose={() => setSelectedPhoto(null)} 
        />
      )}
    </div>
  );
}
