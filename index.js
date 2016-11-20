var express = require('express');
var app = express();
var url = require('url');

var monthNames = ["January", "February", "March", "April", "May", "June",
  	"July", "August", "September", "October", "November", "December"
];

app.set('port', listen(process.env.PORT || 5000));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get("/*", function(request, response){
	var objURL = null;
	var szDate = "";
	var date = null;
	var objResult = {};

	objURL = url.parse(request.url, true);
	if (objURL == null)
	{
		response.render('index');
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
			response.render('index', {title: "null"});
			return;
		}

		if (isNaN(part[1]) == true)
		{
			response.render('index', {title: "null"});
			return;
		}
		iYear = parseInt(part[1]);

		daymonth = part[0].split(" ");
		if (daymonth.length != 2)
		{
			response.render('index', {title: "null"});
			return;
		}

		if (isNaN(daymonth[1]) == true)
		{
			response.render('index', {title: "null"});
			return;
		}
		iDate = parseInt(daymonth[1]);

		iMonth = monthNames.indexOf(daymonth[0]);
		if (iMonth == -1)
		{
			response.render('index', {title: "null"});
			return;
		}

		date = new Date(iYear, iMonth, iDate);

		console.log(iMonth + "-" + iDate + "-" + iYear);

	}


	if (date == "Invalid Date")
	{
		response.render('index', {title: "null"});
		return;
	}

	objResult = {
		"unix": date.getTime() / 1000,
		"natural": monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getUTCFullYear()
	}

	response.render('index', {title: JSON.stringify(objResult)});
});

app.listen(app.get('port'), function(){
	console.log("Listen in port : %d", 9960);
})


