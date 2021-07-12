const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

console.log(__dirname);
// console.log(path.join(__dirname, "../public"));
const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Andrew Mead",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "Andrew Mead",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help section",
        message: "help center",
        name: "Andrew Mead",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address",
        });
    }
    geocode(
        req.query.address,
        (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({
                    error,
                });
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error,
                    });
                }

                res.send({
                    address: req.query.address,
                    forecast: forecastData,
                    location: location,
                });
            });
        }
    );
});
app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term",
        });
    }
    console.log(req.query.search);
    res.send({
        products: [],
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Andrew Mead",
        erroMessage: "Help article not found",
    });
});

app.get("/404", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Andrew Mead",
        erroMessage: "Page not found",
    });
});

app.get("*", (req, res) => {
    res.send("My 404 page");
});
// app.get("/help", (req, res) => {
//     res.send([
//         {
//             name: "Andrew",
//         },
//         {
//             name: "Sarah",
//         },
//     ]);
// });

/* app.get("/about", (req, res) => {
    res.send("abobbbut");
});

app.get("/weather", (req, res) => {
    res.send({
        city: "nanjing",
        weather: "sunny",
    });
}); */

// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
    console.log("Sever is up on port 3000");
});
