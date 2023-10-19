const axios = require('axios');
const { query } = require('express');
const password = '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';
const store = 'https://himanshu-trends.myshopify.com';
const blogId = process.env.BlogId;
let article_id;
let data;
let config1;

const article = async(new_exl,req) => {
    article_id = new_exl.article_id;
    const metaobjects1 = new_exl.metaobjects;
    console.log('metaobjects1',new_exl);
    const key = req.query.key;
    const type = req.query.type;
    console.log('1.....',metaobjects1)
    data = JSON.stringify({ 
    "article": {
        "id": article_id,
        "metafields": [
        {
            "key": key,
            "value": metaobjects1,
            "type": type,
            "namespace": "custom"
        }
        ]
    }
    });
    console.log('2.....')
    config1 = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `${store}/admin/api/2023-07/blogs/${blogId}/articles/${article_id}.json`,
        headers: {
            'Content-Type': 'application/json', 
            'X-Shopify-Access-Token': password, 
            // 'Cookie': '_landing_page=%2Fpassword; orig_referrer=https%3A%2F%2Fmy-shop-my-job.myshopify.com%2F%2Fshopify%2FOnlineStoreArticle%2F605873144112; shopify_y=678b0a8f-9267-4a9c-b945-1643776526e9; _y=678b0a8f-9267-4a9c-b945-1643776526e9; localization=IN; secure_customer_sig='
        },
        data : data
    };
    console.log('3.....')
    await axios.request(config1)
    .then((response) => {
        console.log(response.data);
        // res.status(200).send(response.data);
    })
    .catch((error) => {
        console.log('error3',error.data);
        // res.status(500).send(error); 
    });
};

module.exports = article;