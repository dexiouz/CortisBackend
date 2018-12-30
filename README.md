# Colt Steele
Backend Basics

Express does create take the req.body and turn it into a javacript object for u to use. This is where we get the **bodyparser package.**


API, application programme interface is an interface for codes, computers to talk to one other.

htpps:iftt.com
programmableweb.com
use req.query when sending through a get method
use req.body to retrieve data in a form with a post method

REST stands for representational state transfer. 
REST is just a pattern for defining our routes.

To create something we need two routes. First we need the form route that shows us the form and then we need a place for the form to submit. Same thing goes for edit, we need a form where to edit and a place for the form to submit.

REST is just a convention or architecture for mapping our HHTP requests to CRUD functions.

Express sanitizer removes scripts.



Folder 9 video 1

**Introduction to Associations**
This allows us to have multiple collections of data that are related to one another.
Consider a models
User
Photos, Comments etc

A comment can be related or associated to a photo which is also associated to a User. 

"passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())" are for reading session, taking an encoded data from session and decoding it