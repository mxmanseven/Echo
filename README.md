# Echo

This is a simple echo web application. The web app can send a message to the server and the server responds with some meta data which is displayed in the client. Message statistics grouped by requestor IP address are stored in a SQLite database. The client is built on Angular and the web server is Express.

## Build / Run it

 1. Navigate to EchoClient and  run the commands **npm install** then  **ng serve**.
 2. Navigate to EchoServer and run the commands **npm install**, **npx tsc**, then **node dist/server.js**.
 3. Navigate a browser to http://localhost:4200/ and try out the app!

The file explorer is accessible using the button in left corner of the navigation bar. You can create a new file by clicking the **New file** button in the file explorer. You can also create folders by clicking the **New folder** button.

## Database
The SQLite database is created under EchoServer and is called echo.db. Access the database in Visual Studio Code with the extension ‘SQLite’. After installing the extension, from the command palette ((Ctrl+Shift+P) run ‘SQLite: Open Database and select echo.db. .../EchoServer/src/database/test.sql is a simple query the selects everything from the one table in the database. Execute it form the command palette with 'SQLite: Run Query'.

## Future Work

 - Front and back end unit tests.
 - Authorization: add JWT auth and user management.

 Branch: b1