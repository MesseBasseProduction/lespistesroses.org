const ModalUrlsEnum = require('../utils/ModalUrlsEnum.js');
const express = require('express');
const ModalRouter = express.Router();

/* Routing callback method definition */

// Callback method to send a given HTML file to the end-user
const loadModalPage = (req, res, filename) => {
  console.log(`${(new Date()).toISOString()} | ${global['url']} v${global['version']} | 200 ${req.originalUrl} modal requested, return ${filename}.handlebars`);
  res.render(filename, {
    layout: false
  });
};

/* App URL definitions */

// We iterate through the ModalUrlsEnum, to build for each app routes and redirections
for (let i = 0; i < ModalUrlsEnum.length; ++i) {
  ModalRouter.get(ModalUrlsEnum[i].mainUrl, (req, res) => loadModalPage(req, res, ModalUrlsEnum[i].redirectionTarget));
}

module.exports = ModalRouter;