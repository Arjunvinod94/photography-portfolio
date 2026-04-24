import { getAllPhotos } from '@/lib/db';
import Gallery from '@/components/Gallery';

// Ensure the page is revalidated or dynamically rendered if data changes
export const revalidate = 0;

export default function Home() {
  const photos = getAllPhotos();
  
  return (
    <main>
      <Gallery photos={photos} />
    </main>
  );
}
