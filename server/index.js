const express = require("express");
const app = express();
//const mysql = require("mysql");
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"Stick9122003.",
  database:"Empleados_crud"
})

//Datos que se envian desde el formulario;
app.post("/create",(req,res)=>{
  const Name = req.body.Name;
  const FechaN = req.body.FechaN;
  const Pais = req.body.Pais;
  const Cargo = req.body.Cargo;
  const Fecha = req.body.Fecha;

  //con query hacemos una consulta
  db.query('INSERT INTO Empleados( Name, FechaN, Pais, Cargo, Fecha) VALUES ( ?,?,?,?,? )',
    [ Name, FechaN, Pais, Cargo, Fecha ],
    (err,result)=>{
      if (err) {
        console.log(err);
      }else{
        res.send("¡Empleado registrado exitosamnete!");
      }
    });
  });

//Mostrar datos 
app.get("/empleados",(req,res)=>{
  db.query('SELECT * FROM Empleados',
    (err,result)=>{
      if (err) {
        console.log(err);
      }else{
        res.send(result);
      }
    });
  });

//Actualizar 
app.put("/update", (req, res) => {
  const id = req.body.id;
  const Name = req.body.Name;
  const FechaN = req.body.FechaN;
  const Pais = req.body.Pais;
  const Cargo = req.body.Cargo;
  const Fecha = req.body.Fecha;

  // Con query hacemos una consulta
  db.query(
    'UPDATE `Empleados` SET Name=?, FechaN=?, Pais=?, Cargo=?, Fecha=? WHERE id=?',
    [Name, FechaN, Pais, Cargo, Fecha, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("¡Empleado actualizado exitosamente!");
      }
    }
  );
});

app.put("/delete", (req, res) => {
  const id = req.body.id;
  // Con query hacemos una consulta
  db.query(
    'DELETE FROM Empleados WHERE id=?',[id],
    (err, result) => {
      if (err) {
        console.log(err);
        //Establece un codigo de http 
        //que indica que huvo un error en el servidor de forma interna 
        res.status(500).send("Error al eliminar el empleado");
      } else {
        res.send("¡Empleado exitosamente!");
      }
    }
  );
});


app.listen(3001,()=>{
  console.log("Corrinedo en el puerto 3001");
});