const express = require("express");
const app = express();
const request = require("request");
const axios = require("axios");
const ExcelJS = require("exceljs");
const workbook = new ExcelJS.Workbook();

async function readExcelFile(filePath) {
  const data = [];
  const worksheet = await workbook.xlsx.readFile(filePath);
  const sheet = worksheet.getWorksheet(1); 
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
    const excelFilePath = "./student_data.xlsx";
    const articleData = await readExcelFile(excelFilePath);
    const apiKey = "9e24c7ad5b7891937e0ae9e58e0d8454";
    const password = "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";
    const shop = "himanshu-trends";
    const createdArticles = [];
  
    for (const article of articleData) {
      const options = {
        method: "POST",
        url: `https://${shop}.myshopify.com/admin/api/2021-07/blogs/91094090010/articles.json`,
        auth: {
          username: apiKey,
          password: password,
        },
        headers: {
          "Content-Type": "application/json",
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
        console.log(createdArticle,'createdArticle');
        createdArticles.push(createdArticle);
      } catch (error) {
        console.error(`Error creating article: ${error.message}`);
      }
    }
  
    resp.status(201).json({ articles: createdArticles });
  
  });

app.listen(2300, () => {
    console.log("Server is running on port 2000")
});
  