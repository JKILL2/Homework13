// from data.js
var tableData = data;

// YOUR CODE HERE!
// by John Kill, KU Data Analytics, July 2019

// define columns variable for columns in tableData
var columns = ["datetime", 
                "city", 
                "state", 
                "country", 
                "shape", 
                "durationMinutes", 
                "comments"];

// define variables and load data
var tbody = d3.select("tbody");
var load_data = (data_input) => {
    tbody.html("");
    data_input.forEach(ufo_sightings => {
      var row = tbody.append("tr");
      columns.forEach(column => row.append("td").text(ufo_sightings[column]))
    });
  }

load_data(tableData);

// load table
function load_table(array){
    tbody.html("");
    
    // go through the data and append for each value
    array.forEach((data_row) => {
        var row = tbody.append("tr");

        // go through each field and add each value as a <td>
        Object.values(data_row).forEach((val) => {
            var field = row.append("td");
            field.text(val);
        });
    });
};

load_table(tableData);

// build date filter
var filter_button = d3.select("#filter-btn");
filter_button.on("click",() => {
    // prevent the page from refreshing
    d3.event.preventDefault();

    // pickup data from input fields
    var input_date_time = d3.select("#datetime");
    var filter_date = input_date_time.property("value").trim();

    // match the input value with the date
    var filtered_date = tableData.filter(fdata => fdata.datetime === filter_date);

    // add filtered results to the table
    tbody.html("");

    // display the filtered results or give a message if not found
    let response = {filtered_date}
    if(response.filtered_date.length !== 0){load_data(filtered_date)}
    else {tbody.append("tr").append("td").text("No results found!");}
})

// build reset button and set it to work on a click
var reset_button = d3.select("#reset_btn");
reset_button.on("click", () => {
    tbody.html("");
    load_data(tableData);
  })
