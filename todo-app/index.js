const app = require("./app");
const PORT=process.env.PORT || 3001;
app.listen(3001, () => {
    console.log("Started express server at port 3001");
});
