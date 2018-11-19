Run-time is an environment where js code can run.
Node is a c sharp object used to run javascript run time.
Node mimicks an environment that makes it look like window. 
We'll install axios helps communicate between back end and front end.
THere is a file called package.json which can be automatically or manually created.
Go to terminal and type npm init and follow the instruction. We r trying to create a package.json fil where all our node modules will be generated.


body parser exposes form inputs to express. install with yarn add body-parser

morgan is a module for loggin. Its a request logger. Install with yarn add morgan
install mongodb
then type sudo systemctl start mongod
then type mongo anytime you want to start mongodb
then do sudo yarn add mongoose
Next lets assign a port to our server. The port is an address where the server can run on.

FOur types of request : get gets thse data from database and send it to the frontend.
Post receives from front end to the database; delete for data, put is for update;
They are called CRUD operations C =create-post  R = read-get U = update D-delete

Next day we created the route folder and in it created the api.js

Next we did yarn add bluebird join, two modules. bluebird 

We went to server.js to configure the database by require the 

schema is a method mongoose that defines what structure and data type to be sent to the database