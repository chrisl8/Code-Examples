# Installing Chrome
I'm not 100% sure if this is required or not, but if you want it:
```
cd
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome-stable_current_amd64.deb
```
Run it once to make it default.


# Cypress

## Installing
https://docs.cypress.io/guides/getting-started/installing-cypress.html#System-requirements

# For Linux (https://docs.cypress.io/guides/guides/continuous-integration.html#Advanced-setup)
Grab some dependencies:  
`sudo apt install xvfb libgtk2.0-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2`

# In you project's root git repo
```
mkdir cypress-tests
cd cypress-tests
npm init # Accept Defaults
```
Edit package.json to:
1. add: private: true
2. Remove the license line
3. Put your user ID or Name in the Author line if you like

```
npm install cypress --save-dev
```

## Start for the first time
You *MUST* run this from a GUI terminal, because it is going to open up a browser:  
`npx cypress open`

This will setup some folders and stuff, so we do need to run it at least once.
Then go ahead and close it.

## Configuring
https://docs.cypress.io/guides/getting-started/testing-your-app.html#Step-1-Start-your-server
`vi cypress.json`

Add your base URL like this:
```
{
  "baseUrl": "http://localhost:8080"
}
```

## Usage
Put your tests in the `cypress/integrations` folder and name them testWhatever.spec.js

To run the tests, again from a GUI terminal where it can open a browser:
`npx cypress open`

Pick the test you want to run, and run it.

If you just want to run all of the tests with no GUI you can run:  
(NOTE: Despite this running "headless" it still won't run via SSH)  
`npx cypress run`

This will just run every test in the background in a headless browser (Electron) and give you CLI output.

## Clean Up
Before you commit, you need to add a `.gitignore` file with these contents:
```
/node_modules
/cypress/videos
/cypress/screenshots
```

Once you are done with the Examples, delete them before you commit any of this:  
```
rm -rf cypress/integration/examples
rm cypress/fixtures/example.json
rm cypress/support/commands.js
rm cypress/support/index.js
rm cypress/plugins/index.js
```

You may want to just install Cypress by itself somewhere to play with these examples without needing to leave them in your production code repositories.

## ESLint
To make use of/make happy eslint install this and update your `.eslintrc` file as directed:
https://github.com/cypress-io/eslint-plugin-cypress

Note that I have this plugin in my list of globals to install in my eslint setup notes,  
so you just need to add the bits to your `.eslintrc` file in this project.