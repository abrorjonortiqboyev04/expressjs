const express=require('express')
const fs=require('fs')
const path=require('path')
const router=express.Router()

router.get('/all-book',(req,res)=>{
    fs.readFile(path.join(__dirname,'book.json'),'utf8',(er,data)=>{
        if(er) res.send(er)
        res.send(data)
    })
})

router.get('/id',(req,res)=>{
      res.send(`
      <h1>Id bo'yicha qidirish, kitob id raqamini kiriting!!! </h1>
      <form action="/book/book-id" method="POST">
      <input type="number" name="id">
      <button type="submit">Send</button>
      </form>
      `)
})
router.post('/book-id',(req,res)=>{
    fs.readFile(path.join(__dirname,'book.json'),'utf8',(er,data)=>{
        const malumot=JSON.parse(data)
        const id=req.body.id
        if(malumot[id]==undefined){res.send("<h1>Malumot topilmadi!!!</h1>") }
        else { res.send(malumot[id])}
    })
})
router.get('/add',(req,res)=>{
    res.send(`
          <h1>Yangi kitob qo'shish!!!</h1>
          <form action="/book/add-book" method="POST">
          <h3>Id: </h3>
          <input type="number" name="id">
          <h3>Author: </h3>
          <input type="text" name="author">
          <h3>Title: </h3>
          <input type="text" name="title">
          <button type="submit">Send</button>
          </form>
    `)
})
router.post('/add-book',(req,res)=>{
    const data=fs.readFileSync(path.join(__dirname,'book.json'),'utf8')
    const malumot=JSON.parse(data)
    malumot.push(req.body)
    fs.writeFileSync(path.join(__dirname,'book.json'),JSON.stringify(malumot))
    res.send("<h1>Malumotlar qabul qilindi!!!</h1>")
})

router.get('/book-delete',(req,res)=>{
    res.send(`
    <h1>O'chirmoqchi bo'lganm kitobni idsini kiriting: </h1>
    <form action="/book/delete" method="POST">
    <input type="number" name="id">
    <button type="submit">Send</button>
    </form>
    `)
})
router.post('/delete',(req,res)=>{
    const data=fs.readFileSync(path.join(__dirname,'book.json'))
    const malumot=JSON.parse(data)
    const Id=req.body.id
    let a;
    for(let i=0; malumot[i]!=undefined; i++){
        if(malumot[i].id==Id)
        a=i;
    }
    console.log(a)
    const delet=malumot.splice(a,1)
    fs.writeFileSync(path.join(__dirname,'book.json'),JSON.stringify(malumot))
    res.send("<h1>Malumot o'chirildi!!!</h1>")
})

module.exports=router 
