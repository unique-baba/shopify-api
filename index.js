const express = require('express');
const app = express();
const cors = require('cors');
const xlsx = require('xlsx');

app.get("/readexcelfile",(req,resp)=>{
    // let fileName = req.query.filename;
    // let data = [];
    try {
        const workbook = xlsx.readFile("./student_data.xlsx");
        const sheetNames = workbook.SheetNames;
        const xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);
        
        xlData.forEach(function(data){
            const name = data['Name'];
            const branch = data['Branch'];
            console.log('name',name,',branch',branch)
        })

        resp.send(xlData)
    } catch (error) {
        console.log('error',error)
        resp.send(error);
    }
})

app.listen(2200, () => {
  console.log('App is running on Port 2200');
});