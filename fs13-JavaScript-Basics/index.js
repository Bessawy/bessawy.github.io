/*
1. Fix the bugs in the codes below, to make the console print out different numbers
from 0 to 100
 */
const printNum = () => {
  for (let i = 0; i <= 100; i++) {
    setTimeout(() => console.log(i), 1000);
  }
};

printNum();

/*
2. Given the array below:
myArr = ['12-24-2014', '09-2022-23', '12-30-2021', '08-02-2021', '07-15-2018', '2019-12-14', '2022-14-12']
the array above has serveral dates, written in order month-day-year
Write the code inside function fixDate(array) below to transform the array to new
format dates day-month-year
expected result: ['24-12-2014', '23-09-2022', '30-12-2021', '08-02-2021', '15-07-2018', '14-12-2019', '14-12-2022'] . 
You only need to produce the same array as expected result, no need to consider other 
possibility.
 */

let myArr = [
  "12-24-2014",
  "09-2022-23",
  "12-30-2021",
  "08-02-2021",
  "07-15-2018",
  "2019-12-14",
  "2022-14-12",
];
const fixDate = (array) => {
  /* provide your code here */
  let new_array = array.map((e) => {
    let date = e.split("=");
    date.sort((a, b) => {
      return a - b;
    });

    // change the first two elements
    let temp = date[0];
    date[0] = date[1];
    date[1] = date[0];

    return date.join("-");
  });
  return new_array;
};
let newArr = fixDate(myArr);
console.log(newArr);

/*
3. Counter function
Write a counter funtion to print out in console the time difference between 2 given date
Expected result in the console: 11 days - 13 hours - 38 minutes - 20 seconds
*/
const dateFrom = new Date(500000);
const dateTo = new Date(1000000000);
const counter = (from, to) => {
  /* provide your code here */

  // diff_date in seconds
  let diff_date = Math.abs(dateTo - dateFrom) / 1000;

  // No of days
  let days = Math.floor(diff_date / (60 * 60 * 24));
  diff_date -= days * 60 * 60 * 24;

  // No of hours
  let hours = Math.floor(diff_date / (60 * 60));
  diff_date -= hours * 60 * 60;

  // No of minutes
  let minutes = Math.floor(diff_date / 60);
  diff_date -= minutes * 60;

  // seconds
  let seconds = diff_date;
  return (
    days +
    " days - " +
    hours +
    " hours - " +
    minutes +
    " minutes - " +
    seconds +
    " seconds"
  );
};
const timer = counter();
console.log(timer);

const CountryTemplate = document.querySelector("[data-country-template]");
const CountryContainer = document.querySelector("[country-container]");
const searchInput = document.querySelector("[data-search]");
let countries = [];

const filterCountries = () => {
  /* provide your code here */
  const value = document.getElementById("filter").value.toLowerCase();
  countries.forEach((country) => {
    const isVisible = country.name.toLowerCase().includes(value);
    country.element.classList.toggle("hide", !isVisible);
  });

  return false;
};

const container = document.querySelector("[single-country-contaienr]");
const header = container.querySelector("[country-name]");
const region_label = container.querySelector("[country__region__label]");
const region_name = container.querySelector("[country__region__name]");
const capital_label = container.querySelector("[country__capital__label]");
const capital_name = container.querySelector("[country__capital__name]");

region_label.textContent = "Region: ";
region_name.textContent = "??";
capital_label.textContent = "Capital: ";
capital_name.textContent = "??";
header.textContent = "?????";

const getSingleCountry = () => {
  //--- take the first country found, otherwise give nothing.
  const value = document.getElementById("search").value;
  fetch("https://restcountries.com/v3.1/name/" + value)
    .then((res) => res.json())
    .then((country) => {
      region_label.textContent = "Region: ";
      region_name.textContent = country[0].region;
      capital_label.textContent = "Capital: ";
      capital_name.textContent = country[0].capital;
      header.textContent = country[0].name.official;
    })
    .catch((error) => {
      region_label.textContent = "Region: ";
      region_name.textContent = "??";
      capital_label.textContent = "Capital: ";
      capital_name.textContent = "??";
      header.textContent = "?????";
    });

  return false;
};

const getAllCountries = () => {
  fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => {
      sorted_countries = data.sort(function (a, b) {
        if (a.name.official < b.name.official) {
          return -1;
        }
        if (a.name.official > b.name.official) {
          return 1;
        }
        return 0;
      });

      countries = sorted_countries.map((country) => {
        const card = CountryTemplate.content.cloneNode(true).children[0];
        const header = card.querySelector("[country-name]");
        const region_label = card.querySelector("[country__region__label]");
        const region_name = card.querySelector("[country__region__name]");
        const capital_label = card.querySelector("[country__capital__label]");
        const capital_name = card.querySelector("[country__capital__name]");
        region_label.textContent = "Region: ";
        region_name.textContent = country.region;
        capital_label.textContent = "Capital: ";
        capital_name.textContent = country.capital;
        header.textContent = country.name.official;
        CountryContainer.append(card);
        return { name: country.name.official, element: card };
      });
    });
};

getAllCountries();

/*
5. Provide logic for function generateNewFolderName, which receive an array as argument. Everytime the function gets called,
it should check for folder name. If the folder named 'New Folder' does not exist, it should add the name 'New Folder' to array.
If folder 'New Folder' exists, it should add 'New Folder (1)' to array. If 'New Folder (1)' exists, it should add 'New Folder (2)'
to array, and so on.
*/

const generateNewFolderName = (existingFolders) => {
  /*  provide your code here */

  let folder_name = "New Folder";
  let counter = 0;
  while (true) {
    let condition = existingFolders.includes(folder_name);
    if (condition) {
      counter++;
      folder_name = "New Folder (" + counter + ")";
    } else {
      return existingFolders.push(folder_name);
    }
  }
};

let folder = [];
generateNewFolderName(folder);
generateNewFolderName(folder);
generateNewFolderName(folder);
generateNewFolderName(folder);
console.log(folder); //expect to see ['New Folder', 'New Folder (1)', 'New Folder (2)', 'New Folder (3)']

/* 
6. Complete class Book:
- class Book should have 3 properties: title (read-only, must be a string but cannot be empty), cost (private, must be positive number) and profit (private, positive number > 0 and =< 0.5)
(error should be thrown if data is not valid)
- give the logic to get book's price and profit separately.
- give the logics to increase and decrease the price with a certain amount 
- give the logic to calculate price based on cost and profit. For example: cost 14, profit 0.3 => expected price is 20.

Complete class TaxableBook: 
- inherit Book, but have 1 more private parameter in the constructor: taxRate. 
- give the logic to calculate price with taxRate. For example: 
cost 14, profit 0.3 , tax 24% => expected price is 30.43
*/
class Book {
  #_title;
  #_cost;
  #_profit;

  constructor(title, cost, profit) {
    if (title == "" || this.check_prices(cost, profit)) {
      throw "data is not valid!";
    }
    this.price = this.set_price();
    this.#_title = title;
    this.#_cost = cost;
    this.#_profit = profit;
  }

  check_prices(cost, profit) {
    return cost < 0 || profit <= 0 || profit > 0.5;
  }

  getcost() {
    return this.cost;
  }

  getprice() {
    return this.price;
  }

  getprofit() {
    return this.#_profit;
  }

  set_price() {
    this.price = this.#_cost / (1 - this.#_profit);
  }
}

class TaxableBook extends Book {
  /* provide your code here */
  constructor(title, cost, profit, taxRate) {
    super(title, cost, profit);

    this._taxRate = taxRate;
  }

  set_price() {
    this.price = this.getcost() / (1 - this.getprofit() - 0.01 * this._taxRate);
  }
}

const book1 = new Book("The Power of Habits", 14, 0.3);
const book2 = new TaxableBook("The Power of Habits", 14, 0.3, 24);
