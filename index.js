// const express = require('express')
import express from 'express'
import mysql from 'mysql2'

const app = express()
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Gh890528",
    database: "shop"
})

app.use(express.json())

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
    const q = "INSERT INTO commpbity (`title`, `price`, `number`) VALUE (?)"
    const value = []
    db.query(q, [value], (err, data) => {
        if(err) return console.log(err)
        return res.json(data)
    })
})

app.listen(8800 , () => {
    console.log('shop app running');
})