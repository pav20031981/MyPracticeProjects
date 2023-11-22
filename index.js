// const express = require("express");
// const app = express();
// const port = 3000;

// app.use(express.static("public"));

// app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
// });

const express = require("express");
const path = require("path"); // Add this line to use the 'path' module
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
