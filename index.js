const superagent = require('superagent');
const config = require('./config');


superagent.get(config.URL)
    .auth(config.USERNAME, config.TOKEN)
    .end((err, res) => {
      if (err) { return console.log(err); }
      console.log(res.body);
    });
