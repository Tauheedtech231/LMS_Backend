import {supabase} from  '../db/supabase.js'// apna supabase client import karo

// Get all payments
export const getPayments = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("payments")
      .select(`
        id,
        amount,
        date,
        status,
        students (id, name, email),
        courses (id, title)
      `);

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get single payment by ID
export const updatePaymentStatusByStudent = async (req, res) => {
  try {
    console.log(req.body)
    console.log("r",req.params.id)
    const id = req.params.id;

    const { status } = req.body;
    console.log("cal",status)

    if (!status) {
      return res.status(400).json({ success: false, message: "Status is required" });
    }

    const { data, error } = await supabase
      .from("payments")
      .update({ status })
      .eq("id",id)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({ success: false, message: "No payments found for this student" });
    }

    res.status(200).json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to update payment status" });
  }
};



