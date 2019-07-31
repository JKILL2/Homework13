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

// define variable and store data
var tbody = d3.select("tbody");
var store_data = (ufo_data) => {
    tbody.html("");
    ufo_data.forEach(sightings_data => {
      var row = tbody.append("tr");
      columns.forEach(column => row.append("td").text(sightings_data[column]))
    });
  }

store_data(tableData);

// store table
function store_table(array){
    tbody.html("");
    
    // go through the data and append for each value
    array.forEach((data_row) => {
        var row = tbody.append("tr");
        
        // go through each field and add values as a <td>
        Object.values(data_row).forEach((val) => {
            var field = row.append("td");
            field.text(val);
        });
    });
};

store_table(tableData);

// build date filter
var filter_button = d3.select("#filter-btn");
filter_button.on("click",() => {
    
    // prevent refreshing 
    d3.event.preventDefault();

    // pickup data from input fields
    var date_input = d3.select("#datetime");
    var date_search = date_input.property("value").trim();

    // match the input value with the date
    var response_date = tableData.filter(fdata => fdata.datetime === date_search);

    // display the filtered results or give a message if not found
    tbody.html("");
    let response = {response_date}
    if(response.response_date.length !== 0){store_data(response_date)}
    else {tbody.append("tr").append("td").text("No results. Try a different date.");}
})

// build reset button and set it to work on a click
var reset_button = d3.select("#reset_btn");
reset_button.on("click", () => {
    tbody.html("");
    store_data(tableData);
  })
