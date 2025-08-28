import express from 'express';

import supabase from '../db/db.js';

const router = express.Router();



// Upload only video to Cloudinary



// Create material
// router.post('/materials', async (req, res) => {
//   try {
//     const {
//       course_id,
//       instructor_id,
//       title,
//       type,
//       video_url, // 👈 directly use video_url
//       file_name,
//       file_size
//     } = req.body;

//     // Required fields check
//     if (!course_id || !instructor_id || !title || !video_url) {
//       return res.status(400).json({ error: 'course_id, instructor_id, title, video_url required' });
//     }

//     // Insert into Supabase
//     const { data, error } = await supabase
//       .from('course_materials')
//       .insert([{
//         course_id: Number(course_id),
//         instructor_id: Number(instructor_id),
//         title,
//         type: type || 'other',
//         file_url: video_url, // 👈 save video_url in file_url column
//         file_name: file_name || null,
//         file_size: file_size || null
//       }])
//       .select()
//       .single();
//       console.log("the",error)

//     if (error) return res.status(500).json({ error: error.message });
//   console.log("saved successfully",data)
//     res.status(201).json({
//       message: '✅ Material saved successfully!',
//       data
//     });

//   } catch (e) {
//     console.error("Error saving material:", e);
//     res.status(500).json({ error: e.message || 'Server error' });
//   }
// });
router.post('/materials', async (req, res) => {
  try {
    console.log("the body",req.body)
    let { course_id, instructor_id, title, type, video_url,file_size,banner_url,module_id } = req.body;

    if (!course_id || !instructor_id || !title)
      return res.status(400).json({ error: 'course_id, instructor_id, title required' });

    // Agar direct Cloudinary URL hai
    let file_url = video_url || null;

    // Extract file_name from URL
    let file_name = null;
    if (file_url) {
      try {
        const parts = file_url.split('/');
        file_name = parts[parts.length - 1]; // last segment as file name
      } catch (err) {
        file_name = "video_from_cloudinary.mp4";
      }
    }

    // Default type
    type = type || 'video';

    // Ensure file_name is never null
    if (!file_name) file_name = "video_from_cloudinary.mp4";

    const { data, error } = await supabase
      .from('course_materials')
      .insert([{
        course_id: Number(course_id),
        instructor_id: Number(instructor_id),
        title,
        type,
        file_url,
        file_name,
        file_size: file_size ,
        banner_url:banner_url,
        module_id:module_id// kyunki URL upload, size unknown
      }])
      .select()
      .single();
   console.log(error)
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json({ message: '✅ Material saved successfully', data });

  } catch (e) {
    console.error("Error creating material:", e);
    res.status(500).json({ error: e.message || 'Server error' });
  }
});




 // your Supabase client

// routes/materialsRoutes.js
// your Supabase client



// Define the route and controller inline (no export needed)
router.get("/module/:moduleId", async (req, res) => {
  const { moduleId } = req.params;
  console.log("Fetching materials for module:", moduleId);

  try {
    const { data, error } = await supabase
      .from("course_materials")
      .select("*")
      .eq("module_id", moduleId)
     

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching module materials:", err);
    res.status(500).json({ error: "Failed to fetch materials for this module" });
  }
});

export default router;


