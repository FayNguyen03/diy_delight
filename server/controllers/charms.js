import { pool } from "../config/database.js";
//GET /stones
const getAllCharms = async (req, res) =>{
    try{
        const results = await pool.query("SELECT * FROM charms ORDER BY id ASC;");
        res.status(200).json(results.rows); 
    }
    catch(err){
        res.status(409).json({error: err.message});
    }
};

export default {getAllCharms};