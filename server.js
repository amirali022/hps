//	http module for creating server
const http = require( "http");
//	URL class of url module for parsing request url and parameters
const { URL} = require( "url");
//	FileSystem module for reading files
const fs = require( "fs");

//	specified port
const port = 3000;

//	create server
const server = http.createServer( ( req, res) => {
	const url = new URL( `http://localhost:${ port}${ req.url}`);
	
	/*
		Route of public section for serving public.txt
		if file exists send data and if it doesn't exist send error
	*/
	if( url.pathname == "/") {
		//	read file with utf-8 encoding
		fs.readFile( "./public.txt", { encoding: "utf-8"}, ( err, data) => {
			//	if any error such as file existence occurred send error
			if( err) {
				res.setHeader( "Content-type", "text/html; charset=utf-8");
				res.end( `<h1>500 - Internal Server Error</h1><p>${ err}</p>`);
			//	if no error occurred send file with proper header
			} else {
				res.setHeader( "Content-type", "text/plain; charset=utf-8");
				res.end( data);
			}
		});
	/*
		Route of private section for serving secret.html
		if key parameter is correct read secret.html and send it
		if key is incorrect send forbidden error
	*/
	} else if( url.pathname == "/secret") {
		//	check if key parameter is correct
		if( url.searchParams.get( "key") == "ALBATROSS") {
			//	read secret.html file
			fs.readFile( "./secret.html", { encoding: "utf-8"}, ( err, data) => {
				if( err) {
					res.setHeader( "Content-type", "text/html; charset=utf-8");
					res.end( `<h1>500 - Internal Server Error</h1><p>${ err}</p>`);
				} else {
					res.setHeader( "Content-type", "text/html; charset=utf-8");
					res.end( data);
				}
			});
		//	if key is not correct then send error
		} else {
			res.setHeader( "Content-type", "text/html; charset=utf-8");
			res.end( "<h1>403 - Forbidden</h1><p>invalid key</p>");
		}
	/*
		Route for serving index.js file
	*/
	} else if( url.pathname == "/index.js") {
		//	read index.js file
		fs.readFile( "./index.js", { encoding: "utf-8"}, ( err, data) => {
			if( err) {
				res.setHeader( "Content-type", "text/html; charset=utf-8");
				res.end( `<h1>500 - Internal Server Error</h1><p>${ err}</p>`);
			} else {
				res.setHeader( "Content-type", "text/javascript; charset=utf-8");
				res.end( data);
			}
		});
	/*
		if request url is incorrect i.e. url is not found
		then send not found error
	*/
	} else {
		res.setHeader( "Content-type", "text/html; charset=utf-8");
		res.end( `<h1>404 - Not Found</h1><p>${ url.pathname} not found</p>`);
	}
});

//	listen on specifed port
server.listen( port, () => console.log( `Server Running @ ${ port}`));