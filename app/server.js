global['url'] = 'webboilerplate'; // Ensure no slash at the end
global['version'] = '0.0.1';
global['port'] = 8000;

console.log(`${(new Date()).toISOString()} | ${global['url']} v${global['version']} | Starting frontend web server`);

const express = require('express');
const path = require('path');
const compression = require('compression');
const zlib = require('node:zlib');
const handlebars = require('express-handlebars'); // Handlebars templating

const app = express();
// Ensure responses are compressed through this midleware
app.use(compression({
  level: zlib.constants.Z_BEST_COMPRESSION,
}));
// Templating sections
const hbs = handlebars.create({
  partialsDir: [ path.resolve(__dirname, './views/partials/') ],
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views',  path.resolve(__dirname, './views'));

// URL definitions and routing
const appRoutes = require('./route/AppRoutes');
app.use('/', appRoutes);

app.use('/assets', express.static(path.join(__dirname, '../assets'), { // Serve static files
  maxAge: '864000000' // 10 days caching for app assets
}));

/* Handle 404 as last */
app.all('*', (req, res) => {
  console.log(`${(new Date()).toISOString()} | ${global['url']} v${global['version']} | 404 ${req.originalUrl} page requested, return 404.handlebars`);
  res.render('404' , {
    pageTitle: '',
    pageDescription: '',
  });
});
// Start server console
app.listen(port, () => {
  console.log(`${(new Date()).toISOString()} | ${global['url']} v${version} | Server started and listening on port ${port}`);
});
