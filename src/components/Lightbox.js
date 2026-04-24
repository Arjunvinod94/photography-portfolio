"use client";

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import styles from './Lightbox.module.css';

export default function Lightbox({ photo, onClose }) {
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!photo) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <button 
        className={styles.closeButton} 
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <X size={24} />
      </button>
      
      <div className={styles.container}>
        <div className={styles.imageWrapper} onClick={(e) => e.stopPropagation()}>
          <Image
            src={photo.url}
            alt={photo.title || 'Fullscreen Photo'}
            width={photo.width}
            height={photo.height}
            className={styles.image}
            priority
            quality={100}
          />
          {photo.title && <div className={styles.title}>{photo.title}</div>}
        </div>
      </div>
    </div>
  );
}
