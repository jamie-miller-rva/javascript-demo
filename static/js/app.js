// Assign the data from data.js (in the static/js folder) to a variable
var tableData = data;

// Use d3.select to select the location for the table in the DOM
// between <tbody> and </tbody>
var tbody = d3.select("tbody");

//------------------------------------------------------------------------
// This project will require three functions
// 1. buildTable function to create an html table
// 2. updateFilters function to collect the filter inputs made by the user
// 3. filterTable function to select only those rows that match the filter criteria selected by the user
// 4. resetFilter function to clear out the "old" filter inputs and reload the complete dataset

// 1. buildTable function to create an html table within the table body (tbody)
function buildTable(data) {
    // Clear the table of any existing data
    tbody.html("");

    // Loop through each object in the data
    // append the tbody with a tr for each row)
    // append the tdody with a td for each value (column) in the row
    data.forEach((dataRow) => {

        // Append a row to the table
        var row = tbody.append("tr");

        // Use forEach to Loop through each field in the dataRow 
        // add each value as a table cell (td)
        Object.values(dataRow).forEach((value) => {
            let cell = row.append("td");
                cell.text(value);
            }
        );
    });
}

//---------------------------------------------------------------------------//
// Use a Dictionary to collect all the key: value combinations of the filters
var filters = {};

// 2. updateFilters function to collect the filter inputs made by the user
function updateFilters() {

    // Save the element, value and id of the filter(this) that was changed
    var changedElement = d3.select(this).select("input");
    var elementValue = changedElement.property("value");
    var filterId = changedElement.attr("id");

    // If filter value was entered then add that filterId and value to the filters object.
    // Otherwise clear that filter from the filters object
    if (elementValue) {
        filters[filterId] = elementValue;
    } else {
        delete filters[filterId];
    }

    // Call function to apply all filters and rebuild the table
    filterTable();
    console.log(filters); // not required but good for testing

}

// 3. filterTable function to select only those rows that match the filter criteria selected by the user
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

// 4. resetFilter function to clear out the "old" filter inputs and reload the complete dataset
function resetFilters() {
    filters = {};
    buildTable(tableData);
}


// Attach an event listener for changes to each filter (since there is no filter button)
d3.selectAll(".filter").on("change", updateFilters);

// Attach an event listener for the Reset Filters form button "#filter-btn"
d3.select("#filter-btn").on("click", resetFilters);

// Build the table using tableData for when the page loads
buildTable(tableData);
console.log(tableData);

