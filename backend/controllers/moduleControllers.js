// controllers/moduleController.js
import {supabase} from '../db/supabase.js'

// ✅ Get all modules
export const getModules = async (req, res) => {
  try {
    const { data, error } = await supabase.from("coursemodules").select("id, title, description, estimated_time");
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//get module+materials by id
export const getModuleById = async (req, res) => {
  try {
    const { id } = req.params; //ya module_id ha
    console.log("the id",id)

    const { data: moduleData, error: moduleError } = await supabase
      .from("coursemodules")
      .select("id, title, description, estimated_time")
      .eq("id", id)
      .single();

    if (moduleError) throw moduleError;

    // fetch materials for this module
    const { data: materials, error: materialError } = await supabase
      .from("materials")
      .select("*")
      .eq("module_id", id);

    if (materialError) throw materialError;
    const { data: progressData, error: progressError } = await supabase
      .from("student_progress")
      .select("progress,last_accessed")
       .eq("studentmodule_id",id)
       .order('last_accessed', { ascending: false })
       .limit(1)
      if(progressError){
        console.log("No progress data found",progressError)
      }
     
    
     

    res.json({ ...moduleData, materials ,  progress: progressData?.[0]?.progress || 0, 
  last_accessed: progressData?.[0]?.last_accessed || null });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
};


