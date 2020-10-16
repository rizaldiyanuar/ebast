const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json()) // => req.body


//ROUTES//

//get all ebast

app.get("/ebast", async(req, res) => {
    try {
        const allEbast = await pool.query("SELECT * FROM ebast");
        res.json(allEbast.rows);
    } catch (err) {
        console.error(err.message)
    }
});

//get a ebast

app.get("/ebast/:id", async(req,res) => {
    const {id} = req.params;
try {
    const ebast = await pool.query("SELECT * FROM ebast WHERE ebast_id = $1", [id]);
    res.json(ebast.rows[0]);
} catch (err) {
    console.error(err.message)
}
});

//crete ebast

app.post("/ebast", async(req, res) => {
    try {
        const {description} = req.body
        const newEbast = await  pool.query(
            "INSERT INTO ebast (description) VALUES ($1) RETURNING *",
            [description]
        );
        res.json(newEbast.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
});

//update ebast

app.put("/ebast/:id", async(req, res) => {
try {
    const {id} = req.params; //WHERE
    const {description} = req.body; //SET

    const updateEbast = await pool.query("UPDATE ebast SET description = $1 WHERE ebast_id = $2", 
    [description,id]
    );
    res.json("Ebast was updated!");
} catch (err) {
    console.error(err.message)
}
});

//delete ebast

app.delete("/ebast/:id", async(req, res) =>{
try {
    const {id} = req.params;
    const deleteEbast = await pool.query("DELETE FROM ebast WHERE ebast_id = $1", [id]);
    res.json("Ebast was successfully deleted!");
} catch (err) {
    console.error(err.message)
    }
});

app.listen(5000, () =>{
    console.log("server is listening on port 5000");
});
