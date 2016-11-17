var http = require('http');
var url = require('url');

var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

var server = http.createServer(function(req, res) {
	var objURL = null;
	var szDate = "";
	var date = null;
	var objResult = {};

	console.log("method = %s", req.method);
	if (req.method !== "GET")
	{
		res.end("null");
	}

	objURL = url.parse(req.url, true);
	if (objURL == null)
	{
		res.end("null");
	}

	szDate = objURL.pathname.substring(1, objURL.pathname.length);

	if (isNaN(szDate) == false)
	{

		date = new Date(parseInt(szDate) * 1000);

	}
	else
	{
		var szPathName = decodeURIComponent(szDate);
		var part = [];
		var daymonth = [];
		var iYear = -1;
		var szMonth = -1;
		var iDate = -1;

		part = szPathName.toString().split(",");
		if (part.length != 2)
		{
			res.end("null");
		}

		if (isNaN(part[1]) == true)
		{
			res.end("null");
		}
		iYear = parseInt(part[1]);

		daymonth = part[0].split(" ");
		if (daymonth.length != 2)
		{
			res.end("null");
		}

		if (isNaN(daymonth[1]) == true)
		{
			res.end("null");
		}
		iDate = parseInt(daymonth[1]);

		iMonth = monthNames.indexOf(daymonth[0]);
		if (iMonth == -1)
		{
			res.end("null");
		}

		date = new Date(iYear, iMonth, iDate);

		console.log(iMonth + "-" + iDate + "-" + iYear);

	}


	if (date == "Invalid Date")
	{
		res.end("null");
	}

	objResult = {
		"unix": date.getTime() / 1000,
		"natural": monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getUTCFullYear()
	}

	console.log(date);

	res.writeHead(200, { 'Content-Type': 'application/json' });

	res.write(JSON.stringify(objResult));
	res.end();
});

server.listen(8000, function(){
	console.log();
});
