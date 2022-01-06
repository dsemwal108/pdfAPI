const express = require('express')
const app = express();
const port=3000;
const bodyparser=require('body-parser');

const PDFDocument = require('pdfkit');
const fs = require('fs');
const { json } = require('body-parser');
const { output } = require('pdfkit');


app.use(express.json());
app.use(bodyparser.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send("hiii");
})

app.post("/",(req,res)=>{
    console.log(req.body);
    const doc = new PDFDocument();
doc.pipe(fs.createWriteStream('output.pdf'));
doc
  .fontSize(25)
  .text(JSON.stringify(req.body), 100, 100);
    doc.end();
    res.download("./output.pdf");
})

app.listen(port, () => {
    console.log(`PDF api listening at port 3000`)
  })