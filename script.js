var channel_id = 467830;
	var api_key = 'H476NZRMBXE78R8S';
	var max_gauge_value = 100;
	var gauge1_name = '*C';
	var gauge2_name = "RL %";
	var chart1, chart2, charts, data;
	// load the google gauge visualization
	google.load('visualization', '1.1', {packages:['gauge']});
	google.setOnLoadCallback(initChart);
	function displayData(point1, point2) {
	data.setValue(0, 0, gauge1_name);
	data.setValue(0, 1, point1);
	chart1.draw(data, gauge1_options);
	data.setValue(0, 0, gauge2_name);
	data.setValue(0, 1, point2);
	chart2.draw(data, gauge2_options);
	}
	function loadData() {
	var p1, p2;
	$.getJSON('https://api.thingspeak.com/channels/' + channel_id + '/feed/last.json?api_key=' + api_key, function(data) {
	p1 = data.field1;
	p2 = data.field2;
	if (p1 && p2) {
	p1 = Math.round((p1 / max_gauge_value) * 10000) / 100;
	//p1 = p1 * 1; //(p1/ 100) * 100;
	//p1 = parseFloat( p1.toFixed(1) );
	p2 = Math.round((p2 / max_gauge_value) * 10000) / 100;
	//p2 = p2 * 1; //(p2 / 100) * 100;
	//p2 = parseFloat( p2.toFixed(1) );
	displayData(p1, p2);
	}
	});
	}
	function initChart() {
	data = new google.visualization.DataTable();
	data.addColumn('string', 'Label');
	data.addColumn('number', 'Value');
	data.addRows(1);

	chart1 = new google.visualization.Gauge(document.getElementById('gauge1_div'));
	//gauge1_options = {min: 10, max: 50, minorTicks:40, width: 200, height: 200, yellowFrom:10, yellowTo:22, greenFrom:22, greenTo:26, redFrom:26, redTo: 50};
	gauge1_options = {min: 0, max: 40, width: 260, height: 260, redFrom: 20, redTo: 40, yellowFrom:18, yellowTo: 20, greenFrom:15, greenTo: 18, minorTicks: 10, majorTicks:['0','10','20','30','40'],redColor:'#fd8181'};

	chart2 = new google.visualization.Gauge(document.getElementById('gauge2_div'));
	//gauge2_options = {min: 30, max: 80, minorTicks:25, width: 200, height: 200, yellowFrom:30, yellowTo:40, greenFrom:40, greenTo:48, redFrom:48, redTo:80};
	gauge2_options = {min: 50, max: 100, width: 260, height: 260, redFrom: 78, redTo: 100, yellowFrom:68, yellowTo: 75, greenFrom:75, greenTo: 78, minorTicks: 10, majorTicks:['50','60','70','80','90','100'],redColor:'#fd8181'};
    
	loadData();
	setInterval('loadData()', 60000);
	}