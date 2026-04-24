import cloudinary from './cloudinary';

export async function getAllPhotos() {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'portfolio/',
      max_results: 100,
      context: true,
      tags: true,
    });

    // Map the Cloudinary response to our expected format
    const photos = result.resources.map((res) => ({
      id: res.public_id, // Use public_id as the unique identifier
      public_id: res.public_id,
      url: res.secure_url,
      width: res.width,
      height: res.height,
      title: res.context?.custom?.title || '',
      created_at: res.created_at,
    }));

    // Sort by created_at descending
    return photos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  } catch (error) {
    console.error('Error fetching photos from Cloudinary:', error);
    return [];
  }
}
