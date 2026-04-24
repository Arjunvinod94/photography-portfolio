"use client";

import { useState } from 'react';
import Image from 'next/image';
import styles from './PhotoCard.module.css';

export default function PhotoCard({ photo, onClick }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={styles.card} onClick={() => onClick(photo)}>
      <div className={styles.imageWrapper}>
        <Image
          src={photo.url}
          alt={photo.title || 'Portfolio Photo'}
          width={photo.width}
          height={photo.height}
          className={`${styles.image} ${isLoaded ? styles.imageLoaded : styles.imageLoading}`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onLoad={() => setIsLoaded(true)}
          quality={85}
        />
      </div>
      {photo.title && (
        <div className={styles.overlay}>
          <span className={styles.title}>{photo.title}</span>
        </div>
      )}
    </div>
  );
}
