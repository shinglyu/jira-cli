const superagent = require('superagent');
const inquirer = require('inquirer');
const config = require('./config');
const clipboardy = require('clipboardy');


superagent.get(config.URL)
    .auth(config.USERNAME, config.TOKEN)
    .end((err, res) => {
        if (err) { return console.log(err); }
        //console.log(res.body);
        //console.log(res.body.issues.map(i => i.key));
        //
        const choices = res.body.issues
            .sort((a, b) => new Date(b.updated) - new Date(a.updated))
            .map(i => ({
                    name: `${i.key}: ${i.fields.summary}`,
                    value: i
                }))       


        inquirer
            .prompt([{
                type: 'list', 
                name: 'issue',
                messages: 'Select an issue to copy the ID into the clipboard',
                choices: choices
            }])
            .then(answer => {
                clipboardy.writeSync(answer.issue.key);
                console.log(`Copied the ID "${answer.issue.key}" to clipboard`)
            })
    });
