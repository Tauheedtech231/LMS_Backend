import { supabase } from '../db/supabase.js';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import fs from 'fs';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter for allowed types
const fileFilter = (req, file, cb) => {
  const allowedVideoTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/flv'];
  const allowedDocTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
  const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  
  const allAllowedTypes = [...allowedVideoTypes, ...allowedDocTypes, ...allowedImageTypes];
  
  if (allAllowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only videos, documents, and images are allowed.'), false);
  }
};

// Configure multer with size limits
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 200 * 1024 * 1024, // 200MB max file size
  }
});

// Upload course material
export const uploadCourseMaterial = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { course_id, instructor_id, title, description, type } = req.body;
    const file = req.file;

    // Validate file size based on type
    const isVideo = file.mimetype.startsWith('video/');
    const isDocument = file.mimetype.startsWith('application/') || file.mimetype.startsWith('text/');
    
    const minVideoSize = 100 * 1024 * 1024; // 100MB
    const maxVideoSize = 200 * 1024 * 1024; // 200MB
    const minDocSize = 50 * 1024 * 1024; // 50MB

    if (isVideo && file.size < minVideoSize) {
      fs.unlinkSync(file.path); // Clean up uploaded file
      return res.status(400).json({ error: 'Video files must be at least 100MB' });
    }

    if (isDocument && file.size < minDocSize) {
      fs.unlinkSync(file.path); // Clean up uploaded file
      return res.status(400).json({ error: 'Document files must be at least 50MB' });
    }

    // Log upload start
    const { data: uploadLog, error: logError } = await supabase
      .from('file_upload_logs')
      .insert({
        instructor_id,
        file_name: file.originalname,
        file_size: file.size,
        file_type: file.mimetype,
        upload_status: 'uploading'
      })
      .select()
      .single();

    if (logError) throw logError;

    try {
      // Upload to Cloudinary
      const uploadOptions = {
        folder: `course_materials/${course_id}`,
        resource_type: isVideo ? 'video' : 'auto',
        public_id: `${Date.now()}_${path.parse(file.originalname).name}`,
      };

      const result = await cloudinary.uploader.upload(file.path, uploadOptions);

      // Save to database
      const { data: material, error: materialError } = await supabase
        .from('course_materials')
        .insert({
          course_id,
          instructor_id,
          title: title || file.originalname,
          description,
          type: type || (isVideo ? 'video' : 'document'),
          file_url: result.secure_url,
          file_name: file.originalname,
          file_size: file.size,
          duration: result.duration ? `${Math.floor(result.duration / 60)}:${String(Math.floor(result.duration % 60)).padStart(2, '0')}` : null
        })
        .select()
        .single();

      if (materialError) throw materialError;

      // Update upload log
      await supabase
        .from('file_upload_logs')
        .update({
          upload_status: 'completed',
          upload_progress: 100,
          completed_at: new Date().toISOString()
        })
        .eq('id', uploadLog.id);

      // Clean up local file
      fs.unlinkSync(file.path);

      res.status(201).json({
        message: 'File uploaded successfully',
        material,
        cloudinary_url: result.secure_url
      });

    } catch (uploadError) {
      // Update upload log with error
      await supabase
        .from('file_upload_logs')
        .update({
          upload_status: 'failed',
          error_message: uploadError.message
        })
        .eq('id', uploadLog.id);

      // Clean up local file
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }

      throw uploadError;
    }

  } catch (err) {
    console.error('Error uploading course material:', err);
    res.status(500).json({ error: 'Failed to upload course material' });
  }
};

// Get course materials
export const getCourseMaterials = async (req, res) => {
  try {
    const { courseId } = req.params;
    
    const { data: materials, error } = await supabase
      .from('course_materials')
      .select('*')
      .eq('course_id', courseId)
      .eq('is_active', true)
      .order('upload_date', { ascending: false });

    if (error) throw error;

    res.json(materials);
  } catch (err) {
    console.error('Error fetching course materials:', err);
    res.status(500).json({ error: 'Failed to fetch course materials' });
  }
};

// Delete course material
export const deleteCourseMaterial = async (req, res) => {
  try {
    const { materialId } = req.params;
    
    // Get material details first
    const { data: material, error: fetchError } = await supabase
      .from('course_materials')
      .select('*')
      .eq('id', materialId)
      .single();

    if (fetchError) throw fetchError;

    // Extract public_id from Cloudinary URL
    const urlParts = material.file_url.split('/');
    const publicIdWithExtension = urlParts.slice(-2).join('/'); // folder/filename
    const publicId = publicIdWithExtension.split('.')[0]; // remove extension

    // Delete from Cloudinary
    try {
      await cloudinary.uploader.destroy(publicId, {
        resource_type: material.type === 'video' ? 'video' : 'image'
      });
    } catch (cloudinaryError) {
      console.error('Error deleting from Cloudinary:', cloudinaryError);
      // Continue with database deletion even if Cloudinary deletion fails
    }

    // Soft delete from database
    const { error: deleteError } = await supabase
      .from('course_materials')
      .update({ is_active: false })
      .eq('id', materialId);

    if (deleteError) throw deleteError;

    res.json({ message: 'Course material deleted successfully' });
  } catch (err) {
    console.error('Error deleting course material:', err);
    res.status(500).json({ error: 'Failed to delete course material' });
  }
};

// Get upload progress
export const getUploadProgress = async (req, res) => {
  try {
    const { instructorId } = req.params;
    
    const { data: uploads, error } = await supabase
      .from('file_upload_logs')
      .select('*')
      .eq('instructor_id', instructorId)
      .order('started_at', { ascending: false })
      .limit(10);

    if (error) throw error;

    res.json(uploads);
  } catch (err) {
    console.error('Error fetching upload progress:', err);
    res.status(500).json({ error: 'Failed to fetch upload progress' });
  }
};

// Upload assignment submission (for students)
export const uploadAssignmentSubmission = async (req, res) => {
  try {
    const { assignment_id, student_id, submission_text } = req.body;

    // Validate required fields
    if (!assignment_id || !student_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get assignment details to check submission format
    const { data: assignment, error: assignmentError } = await supabase
      .from('assignments')
      .select('submission_format, allow_late_submission, late_penalty, due_date')
      .eq('id', assignment_id)
      .single();

    if (assignmentError) throw assignmentError;

    // Check submission format requirements
    if (assignment.submission_format === 'file' && !req.file) {
      return res.status(400).json({ error: 'File submission is required' });
    }
    if (assignment.submission_format === 'text' && !submission_text) {
      return res.status(400).json({ error: 'Text submission is required' });
    }
    if (assignment.submission_format === 'both' && !req.file && !submission_text) {
      return res.status(400).json({ error: 'Either file or text submission is required' });
    }

    let file_url = null;
    let file_name = null;
    let file_size = null;

    // Handle file upload if present
    if (req.file) {
      const uploadOptions = {
        folder: `assignment_submissions/${assignment_id}`,
        resource_type: 'auto',
        public_id: `${student_id}_${Date.now()}_${path.parse(req.file.originalname).name}`,
      };

      const result = await cloudinary.uploader.upload(req.file.path, uploadOptions);
      file_url = result.secure_url;
      file_name = req.file.originalname;
      file_size = req.file.size;

      // Clean up local file
      fs.unlinkSync(req.file.path);
    }

    // Determine submission status
    let status = 'Submitted';
    const now = new Date();
    const dueDate = new Date(assignment.due_date);

    if (now > dueDate) {
      if (!assignment.allow_late_submission) {
        status = 'Missing';
      } else {
        status = 'Late';
      }
    }

    // Save submission to database
    const { data: submission, error: submissionError } = await supabase
      .from('assignment_submissions')
      .insert({
        assignment_id,
        student_id,
        submission_text,
        file_url,
        file_name,
        file_size,
        status
      })
      .select()
      .single();

    if (submissionError) throw submissionError;

    res.status(201).json({
      message: 'Assignment submitted successfully',
      submission
    });

  } catch (err) {
    console.error('Error uploading assignment submission:', err);
    
    // Clean up local file on error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({ error: 'Failed to upload assignment submission' });
  }
};

// Get file upload statistics
export const getUploadStatistics = async (req, res) => {
  try {
    const { instructorId } = req.params;
    
    const { data: stats, error } = await supabase
      .rpc('get_upload_statistics', {
        p_instructor_id: instructorId
      });

    if (error) throw error;

    res.json(stats);
  } catch (err) {
    console.error('Error fetching upload statistics:', err);
    res.status(500).json({ error: 'Failed to fetch upload statistics' });
  }
};