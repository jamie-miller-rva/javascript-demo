// Assign the data from data.js (in the static/js folder) to a variable
// See ES6 Referecne Guide
var tableData = data;

// Get table refereces
var tbody = d3.select("tbody");

// Create the buildTable function
function buildTable(data) {
    // Clear the table of any existing data
    tbody.html("");

    // Loop through each object in the data
    // append a row (tr) and cells (td) for each value in the row
    data.forEach((dataRow) => {

        // Append a row to the table
        const row = tbody.append("tr");

        // Loop through each field in the dataRow 
        // add each value as a table cell (td)
        Object.values(dataRow).forEach((value) => {
            let cell = row.append("td");
                cell.text(value);
            }
        );
    });
}

//---------------------------------------------------------------------------//
// Collect All the Filters in a Dictionary
var filters = {};

function updateFilters() {

    // Save the element, value and id of the filter that was changed
    var changedElement = d3.select(this).select("input");
    var elementValue = changedElement.property("value");
    var filterId = changedElement.attr("id");

    // If filter value was entered then add that filterId and value to the filters list.
    // Otherwise clear that filter fromt he filters object
    if (elementValue) {
        filters[filterId] = elementValue;
    } else {
        delete filters[filterId];
    }

    // Call function to apply all filters and rebuild the table
    filterTable();
    console.log(filters);

}

function filterTable() {

    // Set the filteredData to the tableData (from data.js)
    let filteredData = tableData;

    // Loop through filters and keep rows where entires match (all) filters
    Object.entries(filters).forEach(([key, value]) => {
        filteredData = filteredData.filter(row => row[key] === value);
    });

    //Rebuild the table using the filtereData
    buildTable(filteredData);
    console.log(filteredData);
}

function resetFilters() {
    filters = {};
    buildTable(tableData);
}


// Attach an event listener for changes to each filter (since there is no filter button)
d3.selectAll(".filter").on("change", updateFilters);

// Attach an event listener for the form button "#filter-btn"
d3.select("#filter-btn").on("click", resetFilters);

// Build the table using tableData for when the page loads
buildTable(tableData);
console.log(tableData);


// function to handleClick with single filter and button
// function handleClick() {
//     // get datetime value from the filter
//     const date = d3.select("#datetime").property("value");
//     let filteredData = tableData;

//     // Check if date was entered and filter the data using the date
//     if(date) {
//         // Filter tableData keeping only the rows where 'datetime' matches filer value
//         filteredData = filteredData.filter(row => row.datetime === date);
//     }

//     // Build table using the filtered data
//     // If no date was entered (to filter by) the result is tableData
//     buildTable(filteredData);
//     console.log(filteredData);
// }



// Build the table when the page loads using tableData





// Prevent the page from refreshing
// d3.event.preventDefault();
