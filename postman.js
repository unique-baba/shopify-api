const express = require("express");
const app = express();
const axios = require("axios");
const ExcelJS = require("exceljs");
const fileUpload = require("express-fileupload");

app.use(fileUpload());

async function readExcelFile(file) {
  const data = [];
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(file.data); 

  const sheet = workbook.getWorksheet(1);
  sheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      const rowData = {
        title: row.getCell(1).value,
        body_html: row.getCell(2).value,
        tags: row.getCell(3).value,
        author: row.getCell(4).value,
        metafields_global_title_tag: row.getCell(5).value,
        metafields_global_description_tag: row.getCell(6).value,
      };
      data.push(rowData);
    }
  });

  return data;
}

app.post("/createArticlesFromExcel", async (req, resp) => {
  if (!req.files || !req.files.excelFile) {
    return resp.status(400).json({ error: "Excel file is required" });
  }

  const excelFile = req.files.excelFile;
  const articleData = await readExcelFile(excelFile);

//   const apiKey = req.header("apikey"); 
  const password = req.header("password")
  const shop = "himanshu-trends";
  const createdArticles = [];

  for (const article of articleData) {
    const options = {
      method: "POST",
      url: `https://${shop}.myshopify.com/admin/api/2021-07/blogs/91094090010/articles.json`,
      headers: {
        'X-Shopify-Access-Token': `${password}`,
        'Content-Type': 'application/json'
      },

      data: {
        article: {
          title: article.title,
          body_html: article.body_html,
          tags: article.tags,
          author: article.author,
          metafields_global_title_tag: article.metafields_global_title_tag,
          metafields_global_description_tag: article.metafields_global_description_tag,
          published: true,
        },
      },
    };

    try {
      const response = await axios(options);
      const createdArticle = response.data.article;
      createdArticles.push(createdArticle);
    } catch (error) {
      console.error(`Error creating article: ${error}`);
    }
  }

  resp.status(201).json({ articles: createdArticles });
});

app.get("/",(req,resp)=>{
    resp.send("hello api")
    
})

app.listen(2700, () => {
  console.log("Server is running on port 2700");
});
