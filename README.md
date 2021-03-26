# Local Strategy Passport-Authentication
Express app template for user authentication using Passport local strategy.

## Initialize express environment: 
1. Create Github repository (clone in case you created on the website)
2. Create folder with project name
3. Open project folder on VS Code
4. Open terminal and type/install:
    * npm install
    * npm init
    * npm install express --save
    * npm install express-generator -g
    * express -e
        * follow the folder structure proposed by prof Tom/ Thiago
            * move the file "WWW" from /bin/WWW to the front 
            * change name from "WWW" too "server.js"
            * change npm start file to the new server.js --> go to package.json and change on "scripts" the "start" element.
            * delete bin folder
            * erase all folders on public and add: 
                - assets/images
                - content [ here goes the custom css files ]
                - scripts [ here goes the main js file ]
            * add "partials" folder on views [ here goes the html templates for each sites - chunks of html ]
 5. npm install nodemon
 6. run nodemon and check.
