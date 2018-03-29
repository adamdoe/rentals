$(document).ready(function() {
	console.log("Document Loaded...");

	// Get the using our rent.php script.
	$.ajax({
		type: "GET",
		url: "rent.php",
		dataType: "json",
		error: function (request, error) {
	        console.log(arguments);
	        alert("Ooops can't do this because: " + error);
	    },
		success: function(data) {
			console.log("Request received successfully.");
			formatData(data);
		}
	});

	// Format the data
	function formatData(data) {

		// I'm going to put the data into their own arrays for visibility.
		let apt_name = [];
		let baths = [];
		let beds = [];
		let fp = [];
		let rentMin = [];
		let rentMax = [];
		let formattedRent = [];
		let applyLink = [];


		//This just puts the data into the arrays above for visibility.
		for(let i = 0; i < data.length; i++) {
			apt_name.push(data[i].ApartmentName);
			baths.push(data[i].Baths);
			beds.push(data[i].Beds);
			fp.push(data[i].FloorplanName);
			rentMin.push(data[i].MinimumRent);
			rentMax.push(data[i].MaximumRent);
			applyLink.push(data[i].ApplyOnlineURL);
		}

		//This formats the rent min/max to be displayed properly.
		for(let k = 0; k < data.length; k++) {
			formattedRent.push('$'+rentMin[k] + ' - ' + '$'+rentMax[k]);
		}

		//This creates the table.
		for(let j = 0; j < data.length; j++) {
			$('.table_row').after(formatCells(apt_name[j], baths[j], beds[j], fp[j], formattedRent[j], applyLink[j]));
		}

	}

	// Add the data to our table.
	function formatCells(name, beds, baths, fp,rent,apply){
		console.log('Formatting Data');
		var cells = '<tr>';
		cells += '<td class="text-center">' + name + '</td>';
		cells += '<td class="text-center">' + beds + '</td>';
		cells += '<td class="text-center">' + baths + '</td>';
		cells += '<td class="text-center">' + fp + '</td>';
		cells += '<td class="text-center">' + rent + '</td>';
		cells += '<td class="text-center"><a href="' + apply + '" title="Apply Online">Apply</a></td>';
		cells += '</tr>';
		return cells;
	}

});