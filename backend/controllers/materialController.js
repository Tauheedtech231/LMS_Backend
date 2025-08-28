import { supabase } from '../db/supabase.js';

// Get all materials
export const getMaterials = async (req, res) => {
  try {
    const { data: materials, error } = await supabase
      .from('course_materials')
      .select(`
        *,
        courses:course_id (
          id,
          title
        ),
        instructors:instructor_id (
          id,
          name
        )
      `)
      .order('upload_date', { ascending: false });

    if (error) throw error;

    res.json(materials || []);
  } catch (err) {
    console.error('Error fetching materials:', err);
    res.status(500).json({ error: 'Failed to fetch materials' });
  }
};

// Get single material by ID
export const getMaterialById = async (req, res) => {
  try {
    const { materialId } = req.params;
    
    const { data: material, error } = await supabase
      .from('course_materials')
      .select(`
        *,
        courses:course_id (
          id,
          title
        ),
        instructors:instructor_id (
          id,
          name
        )
      `)
      .eq('id', materialId)
      .single();

    if (error) throw error;

    if (!material) {
      return res.status(404).json({ error: 'Material not found' });
    }

    res.json(material);
  } catch (err) {
    console.error('Error fetching material:', err);
    res.status(500).json({ error: 'Failed to fetch material' });
  }
};

// Create new material
export const createMaterial = async (req, res) => {
  try {
    const {
      course_id,
      instructor_id,
      title,
      description,
      type,
      file_url,
      file_name,
      file_size,
      duration
    } = req.body;

    if (!course_id || !instructor_id || !title || !type || !file_url || !file_name || !file_size) {
      return res.status(400).json({ 
        error: 'Course ID, Instructor ID, Title, Type, File URL, File Name, and File Size are required' 
      });
    }

    const { data, error } = await supabase
      .from('course_materials')
      .insert([{
        course_id,
        instructor_id,
        title,
        description,
        type,
        file_url,
        file_name,
        file_size,
        duration
      }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    console.error('Error creating material:', err);
    res.status(500).json({ error: 'Failed to create material' });
  }
};

// Update material
export const updateMaterial = async (req, res) => {
  try {
    const { materialId } = req.params;
    const {
      title,
      description,
      type,
      file_url,
      file_name,
      file_size,
      duration,
      is_active
    } = req.body;
    
    const { data, error } = await supabase
      .from('course_materials')
      .update({
        title,
        description,
        type,
        file_url,
        file_name,
        file_size,
        duration,
        is_active
      })
      .eq('id', materialId)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error('Error updating material:', err);
    res.status(500).json({ error: 'Failed to update material' });
  }
};

// Delete material
export const deleteMaterial = async (req, res) => {
  try {
    const { materialId } = req.params;
    
    const { error } = await supabase
      .from('course_materials')
      .delete()
      .eq('id', materialId);

    if (error) throw error;

    res.json({ message: 'Material deleted successfully' });
  } catch (err) {
    console.error('Error deleting material:', err);
    res.status(500).json({ error: 'Failed to delete material' });
  }
};