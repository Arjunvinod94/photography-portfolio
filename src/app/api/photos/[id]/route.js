import { NextResponse } from 'next/server';
import { getPhotoById, deletePhoto } from '@/lib/db';
import cloudinary from '@/lib/cloudinary';

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const photo = getPhotoById(id);
    if (!photo) {
      return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(photo.public_id);

    // Delete from SQLite
    deletePhoto(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
