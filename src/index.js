class PizzaEntry {
	constructor(diameter, price) {
		this.diameter = diameter;
		this.price = price;
		this.area = diameter * diameter * Math.PI / 4;
		this.pricePerArea = price / this.area;
	}

}
var elements = [];

function sortElements() {
	elements.sort(function(a, b) {
		return a.diameter - b.diameter;
	});
}

function updateTable() {
	var table = document.getElementById("myTable");
	// clear table
	while (table.firstChild) {
		table.removeChild(table.firstChild);
	}
	// add header
	var header = table.createTHead();
	var headerRow = header.insertRow(0);
	var j = 0;
	headerRow.insertCell(j++).innerHTML = "Diameter";
	headerRow.insertCell(j++).innerHTML = "Price";
	headerRow.insertCell(j++).innerHTML = "Area";
	headerRow.insertCell(j++).innerHTML = "Price per area";
	headerRow.insertCell(j++).innerHTML = "";

	// add entries
	var body = table.createTBody();
	for (var i = 0; i < elements.length; i++) {
		var row = body.insertRow(-1);
		var j = 0;
		row.insertCell(j++).innerHTML = elements[i].diameter;
		row.insertCell(j++).innerHTML = elements[i].price;
		row.insertCell(j++).innerHTML = elements[i].area.toFixed(2);
		row.insertCell(j++).innerHTML = elements[i].pricePerArea.toFixed(4);

		var span = document.createElement("SPAN");
		var txt = document.createTextNode("\u00D7");
		span.appendChild(txt);
		span.onclick = function() {
			// remove from elements and update table
			var rowIndex = this.parentNode.parentNode.rowIndex;
			console.log(`now removing ${rowIndex}`);
			document.getElementById("myTable").deleteRow(rowIndex);
			elements.splice(rowIndex-1, 1);
			console.log('elements after removal:')
			console.log(elements);
			updateTable();
		}
		row.insertCell(j++).appendChild(span);

		table.appendChild(row);
	}

}

// Create a new list item when clicking on the "Add" button
function newElement() {
	
	var diameter = document.getElementById("diameterInput").value;
	var price    = document.getElementById("priceInput").value;
	if (diameter === '' || price === '') {
		alert("Please fill in all fields");
		return;
	}
	diameter = parseFloat(diameter);
	price    = parseFloat(price);
	if (isNaN(diameter) || isNaN(price)) {
		alert("Please enter valid numbers");
		return;
	}

	// clear input fields
	document.getElementById("diameterInput").value = '';
	document.getElementById("priceInput").value = '';


	const entry = new PizzaEntry(diameter, price);
	elements.push(entry);
	sortElements();
	updateTable();
} 

updateTable();