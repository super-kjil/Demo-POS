const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extends:false}));
app.use(cors({ origin: "*"}));

app.get("/",(req,res) => {
    const list = [
        {id: 1, name: "A"},
        {id: 2, name: "B"},
    ];
    res.json({
        list,
    });
});
app.get("/api/home", (req, res) => {
    const data = [
      {
        title: "Customer",
        obj: {
          total: 100,
          totla_m: 50,
          total_f: 50,
        },
      },
      {
        title: "Sale",
        obj: {
          total: 1000,
          due: 100,
        },
      },
      {
        title: "Expense",
        obj: {
          total: 1000,
        },
      },
      {
        title: "Employe",
        obj: {
          total: 1000,
        },
      },
      {
        title: "Purchase",
        obj: {
          total: 1000,
        },
      },
    ];
    res.json({
      list: data,
    });
  });

require("./src/route/category.route")(app);
//require("./src/route/auth.route")(app);

const PORT = 8081;
app.listen(PORT,() => {
    console.log("http://localhost:"+PORT);
});