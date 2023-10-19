const { json } = require('body-parser');
const express = require('express')
const app = express();
let request = require('request')
//let apiKey = '9e24c7ad5b7891937e0ae9e58e0d8454';
//let password = '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';
// let endPoint = 'products';

let options = {
    'method': 'POST',
    'url': `https://himanshu-trends.myshopify.com/admin/api/2023-07/orders.json`,
    'headers': {
        'Content-Type' : 'application/json',
        'x-shopify-access-token':'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' 
    },
    body:JSON.stringify({
        "order":{
            "line_items":[
               {
                "title":"test",
                "price":150,
                "quantity": 2,
                "tax_lines":[
                    {
                        "price":120,
                        "rate":1,
                        "title":"tax demo"
                    }
                ],
                "email":"himanshu@ens.enterprises"
               } 
            ]
        }
    })
};

app.get('/getdata',(req,resp)=>{
    request(options, function (error,response) {
        if (error) throw new Error(error);
        console.log(response.body);
        resp.send(response.body)
    });
})



app.listen(3400);

