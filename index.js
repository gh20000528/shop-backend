// const express = require('express')
import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'

const app = express()
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Gh890528",
    database: "shop"
})

app.use(express.json())
app.use(cors())

app.get("/" , (req, res)=>{
    res.json('shop server running')
})

app.get("/commobity", (req, res) => {
    const q = "SELECT * FROM commobity"
    db.query(q, (err, data) => {
        if(err) return console.log(err)
        return res.json(data)
    })
})

app.post("/commobity" , (req, res) => {
    const q = "INSERT INTO commobity (`title`, `price`, `number`) VALUE (?)"
    const value = [
        req.body.title,
        req.body.price,
        req.body.number
    ]
    db.query(q, [value], (err, data) => {
        if(err) return console.log(err)
        return res.json(data)
    })
})

app.delete("/commobity/:id", (req, res) => {
    const commobityId = req.params.id
    const q = "DELETE FROM commobity WHERE id = ?"
    db.query(q, [commobityId], (err, data) => {
        if(err) return console.log(err)
        return res.json(data)
    })
})
app.put("/commobity/:id" , (req, res) => {
    const commobityId = req.params.id
    const q = "UPDATE commobity SET `title` = ?, `price` = ?, `number` = ? WHERE id = ?"
    const value = [
        req.body.title,
        req.body.price,
        req.body.number
    ]
    db.query(q, [...value, commobityId], (err, data) => {
        if(err) return console.log(err)
        return res.json(data)
    })
})

app.listen(8800 , () => {
    console.log('shop app running');
})