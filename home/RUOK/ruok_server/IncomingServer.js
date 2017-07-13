var app = express();  
var staticRoot = __dirname + '/dist/';  
app.set('port', (process.env.PORT || 8080));  
app.use(express.static(staticRoot));
var app = express();

app.post(bodyParser.urlendcoded({extended: false}));

app.post('/message', function (req, res)) {
		 console.log(req.body)
		var msgFrom = req.body.From;
		var msgBody = req.body.Body;

	res.send(`
		<Response>
			<Message>
				Hello ${msgFrom}.  You said: ${msgBody}
			<Message>
		<Response>
	`)
		 
		 
	 });

app.listen(8080);