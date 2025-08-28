import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import cloudinary from '../utils/cloudinary.js';

// Multer + Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'videos',
    resource_type: 'video',
  },
});

const upload = multer({ storage });

// Single video upload middleware
export const uploadVideoMiddleware = upload.single('video');

// Controller function
export const uploadVideo = (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No video uploaded' });

  res.json({
    url: req.file.path,
    public_id: req.file.filename,
  });
};
