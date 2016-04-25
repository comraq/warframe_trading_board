A webapp built using the MEAN stack designed to serve as a trading board for
Warframe players.    

Setup:    
npm install - to install node module dependencies    

Commands:   
npm start [port] - launch the server listening on port [port]    
npm run watch - minify + browserify .js files and minify .css files or clients browsers upon any changes        
npm run watchd - same as watch but with production flag off to include sourcemaps for minified files
npm test [testSuite] - watches for changes in .js files and reruns the sanity testSuite (if no [testSuite] is specified)
