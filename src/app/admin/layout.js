"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Camera } from 'lucide-react';
import styles from './layout.module.css';

export default function AdminLayout({ children }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    router.push('/login');
    router.refresh();
  };

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <Camera size={24} />
          <span>Portfolio Admin</span>
        </div>
        <nav className={styles.nav}>
          <Link href="/" className={styles.link}>View Site</Link>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Logout
          </button>
        </nav>
      </header>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
