const express=require('express')
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

const book= require('./book.js')
app.use('/book',book)

app.listen(3000,()=>{
    console.log("Server running on port: 3000")
})
