import { getAllPhotos } from '@/lib/photos';
import Gallery from '@/components/Gallery';

// Ensure the page is revalidated or dynamically rendered if data changes
export const revalidate = 0;

export default async function Home() {
  const photos = await getAllPhotos();
  
  return (
    <main>
      <Gallery photos={photos} />
    </main>
  );
}
