const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "foodch.kaseamsanth.tk",
    user: "plan",
    password: "Koo112234#",
    database: "fooddb",
    port: 3306,

    // host: "localhost",
    // user: "root",
    // password: "",
    // database: "fooddb",
})


app.get('/product', (req, res) => {
    db.query("SELECT * FROM product_100", (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.get('/foodgroup', (req, res) => {
    db.query("SELECT * FROM food_group", (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})
app.get('/foodgroupsub/', (req, res) => {
    db.query("SELECT * FROM food_group_sub", (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})
app.get('/foodgroupsub/:group_id', (req, res) => {
    db.query("SELECT * FROM food_group_sub WHERE group_id=?", [req.params.group_id], (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})
app.get('/packageunit', (req, res) => {
    db.query("SELECT * FROM package_unit", (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})
app.get('/packageperunit', (req, res) => {
    db.query("SELECT * FROM package_per_unit", (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})
app.get('/weightunit/:weight_unit_id', (req, res) => {
    db.query("SELECT * FROM weight_unit  WHERE weight_unit_id=?", [req.params.weight_unit_id], (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.post('/add', (req, res) => {
    const name_th = req.body.name_th;
    const name_en = req.body.name_en;
    const foodGroupId = req.body.foodGroupId;
    const foodGroupsubId = req.body.foodGroupsubId;
    const packageUnitId = req.body.packageUnitId;
    const packageServingsizeId = req.body.packageServingsizeId;
    const quantity = req.body.quantity;
    const energy = req.body.energy;
    const energyFat = req.body.energyFat;
    const fat = req.body.fat;
    const saturatedFat = req.body.saturatedFat;
    const cholesterol = req.body.cholesterol;
    const protein = req.body.protein;
    const carbohydrates = req.body.carbohydrates;
    const sugar = req.body.sugar;
    const dietaryFibar = req.body.dietaryFibar;
    const sodium = req.body.sodium;
    const calcium = req.body.calcium;
    const vitaminA = req.body.vitaminA;
    const vitaminB1 = req.body.vitaminB1;
    const vitaminB2 = req.body.vitaminB2;
    const iron = req.body.iron;


    db.query(
        // "INSERT INTO product100 (name_th, name_en, foodGroupId, foodGroupsubId, packageUnitId, packageServingsizeId, quantity, energy, eneryFat, fat, saturatedFat, cholesterol, protein, carbohydrates, sugar, dietaryFibar, sodium, calcium, vitaminA, vitaminB1, vitaminB2,  iron) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
        // [name_th, name_en, foodGroupId, foodGroupsubId, packageUnitId, packageServingsizeId, quantity, energy, energyFat, fat, saturatedFat, cholesterol, protein, carbohydrates, sugar, dietaryFibar, sodium, calcium, vitaminA, vitaminB1, vitaminB2, iron],

        "INSERT INTO product100 (name_th, name_en) VALUES (?, ?)", 
        [name_th, name_en],


        
    (err, result) => {
        if(err) {
            consol.log("ERRRRRRRRRRRRROR")
            consol.log(err)
        } else {
            res.send("Value Inserted !")
        }
    }
    );
})


app.listen('3001', () => {
    console.log('Server is running on port 3001')
})