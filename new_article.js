const express = require("express");
const app = express();
const request = require("request");
app.post("/createArticle", async (req, resp) => {
  const apiKey = "9e24c7ad5b7891937e0ae9e58e0d8454";
  const password = "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";
  const shop = "himanshu-trends";

  const articleToCreate = [
    {
      title: "Article 5",
      body_html: "This is a new article.",
      tags: "hair-doctors",
      published: true,
    }
  ];
  let respon = articleToCreate.forEach((e) => {
    const options = {
      method: "POST",
      url: `https://${shop}.myshopify.com/admin/api/2021-07/blogs/91094090010/articles.json`,
      auth: {
        user: apiKey,
        pass: password,
      },
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ article: e }),
    };

    request(options, function (error, response) {
      if (error) {
        console.error(error);
        resp.status(500).send("Error creating article");
      } else {
        const createdArticle = JSON.parse(response.body).article;
        console.log("Created article:", createdArticle);
        return createdArticle;
      }
    });
  });
  resp.send({
    response: respon
  })
});

app.listen(2000, () => {
  console.log("Server is running on port 2000");
});
