# Reddit Top Ten

_A Chrome extension for quickly checking subreddits_


![Reddit In Action](https://github.com/symplie-dev/reddit-top-ten/blob/master/web-store-resources/reddit-top-ten-in-action.gif)

### Dev Setup

1. Clone the project `git clone <url>`
2. Once in the project root. Install NPM dependencies `npm install`
3. If you are on OS X run the following command (or add it to your `.bash_profile`) to prevent gulp errors `ulimit -n 2560`
    - see [Issue 431](https://github.com/substack/node-browserify/issues/431)
3. Compile LESS `gulp less`
4. Compile React to JavaScript `gulp js`
5. Watch for changes to your LESS and JS `gulp`


### Dev Deployment
1. Build LESS and JS (See steps 3 and 4 from Dev Setup above)
2. Navigate to `chrome://extensions`
3. Enable 'Developer Mode' (check box in upper right)
4. Load upacked extension and select the `/extension/` directory in the root of the project