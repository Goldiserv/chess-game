//if you need to scrape a site, that is rendered client side, or has some specific functionality that needs to execute before you can scrape the data, you should look at a different library, such as PhantomJS

// Import the modules we need
const rp = require("request-promise");
const otcsv = require("objects-to-csv");
const cheerio = require("cheerio");
const fs = require('fs');

// Define the URLS we will be scraping
const baseURL = "https://en.wikipedia.org";
const countriesURL = "/wiki/List_of_European_countries_by_population";

// Define the method for collecting the data
const getCountriesData = async () => {
    const html = await rp(baseURL + countriesURL);
    saveStrToFile(`${Math.floor(Date.now() / 1000)}.html`, html)
    // console.log(html);
};

const saveStrToFile = (fileName, str) => {
    fs.writeFile(fileName, str, function (err) {
        if (err) return console.log(err);
        console.log('Saved ' + fileName);
    });
};

const getStrFromFile = () => {
    // using the readFileSync() function
    // and passing the path to the file
    const buffer = fs.readFileSync("wiki.html");
    //console.log(buffer.toString());
    return buffer.toString();
}

// Define the method for collecting the data
const cheerioReadLocal = async () => {
    const html = getStrFromFile("wiki.html");
    const $ = cheerio.load(html);
    // const y = $.html();
    // console.log({y});

    // const countriesMap = $("tr").html();

    $('tr').each(function(i, elm) {
        console.log($(this).text()) // for testing do text() 
    });

    // console.log({ countriesMap });
};

const cheerioExample = async () => {
    const cheerio = require('cheerio');
    const $ = cheerio.load('<h2 class="title">Hello world</h2>');
    $('h2.title').text('Hello there!');
    $('h2').addClass('welcome');
    const y = $.html();
    console.log({ y });
}

const jsDomExample = () => {
    const jsdom = require("jsdom");
    const dom = new jsdom.JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
    const res = dom.window.document.querySelector("p").textContent; // 'Hello world'
    console.log({ res });
}

// Call the method
cheerioReadLocal()