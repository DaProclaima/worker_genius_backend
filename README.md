# Worker Genius backend project for Worker Genius application
This application is developed by Jean-Baptiste VESLEER and Sébastien NOBOUR.
They are both student at My Digital School Paris 19e, France.

## Status
### IN DEVELOPMENT. RELEASE to come on JUNE 2020

## Why this application ?
It is our project for final exams. It's a whole marketing, design and project behind this applicatin.
Its purpose is to get job seekers to get their skills certificated and become hired by companies looking for new
talents. Let's imagine a tech company looking for Symfony 5 backend developer.
The company subscribes to our service, to access a page showing all Symfony 5 backend developers on our website.
Are only showed job seekers, now called as candidates, who validated Symfony 5 backend tests on our platform. Then
 the company can slide in our Direct Message candidate's window is interested in to plan an interview. 
, then contact 
 
## What is the required env to use this application ?
You need to use Node JS 10

## Which technologies are used ?
ExpressJS for server, MongoDB for database, yarn as node package manager

## What is the application architecture ?
The architecture is MVC type. Here is a representative tree of the project ( made with 'tree -d -I node_modules' command,
 given by brew install tree) :
 
```
.
├── app
│   ├── configuration
│   ├── controllers
│   │   ├── bill
│   │   ├── certification
│   │   ├── email
│   │   ├── job-offer
│   │   ├── message
│   │   └── user
│   ├── helpers
│   ├── models
│   └── security
├── resources
│   └── images
└── test
```

## How to set up the app ?
Get the project on your device from github repo by doing this:
> git clone git@github.com:DaProclaima/worker_genius_backend.git

Once you have NodeJS on your computer, simply go in the project directory and run a 
> yarn install

## How to run the application locally in dev env ?
 In one tab command window:
 > mongod

In an other tab:
 > yarn start

Want to stop the app ? Just type CTRL + C

## How to use this RESTful HTTP API

### Explanations
This API exposes these entities:
- certification
- user
- message
- job-offer
- email

#### Role of each entity

##### Certification
Certification represents a work any candidate has to pass to validate in order to post to job offers

##### Job-offer
Job offer represents a job offer posted by an enterprise which a candidate can apply to.

##### User
User represents a logged-in type of visiter on our website. It can have an admin, candidate or enterprise user_type (role)

##### Message
Message represents a message written in a private conversation between two logged-in users.

##### Email
Email is a contact email available to any visiter of our website for him to directly contact admin@workergenius.com


#### Requests to use for this CRUD API

To fetch an item, it is decided to use a slug which is a actually a title for url as so : the-title-of-my-object.
Better not use an Id which is a bad practice for SEO and UX except for private conversation's messages for instance.

To perform a CRUD on these entities, you need to use this syntax:

- NEW creation of an object with PUT http method : http://localhost/3010/api/v1/entity/new/
- EDIT an object with POST http method : http://localhost/3010/api/v1/entity/edit/:param
- SHOW an object with GET http method : http://localhost/3010/api/v1/entity/show/:param
- DELETE an object with DELETE http method : http://localhost/3010/api/v1/entity/delete/:param
- LIST an object with GET http method : http://localhost/3010/api/v1/entity/list

#### CRUD for certification
- NEW creation of an object with PUT http method : http://localhost/3010/api/v1/certification/new/
- EDIT an object with POST http method : http://localhost/3010/api/v1/certification/edit/:slug
- SHOW an object with GET http method : http://localhost/3010/api/v1/certification/show/:slug
- DELETE an object with DELETE http method : http://localhost/3010/api/v1/certification/delete/:slug
- LIST an object with GET http method : http://localhost/3010/api/v1/certification/list

#### CRUD for user
- NEW creation of an object with PUT http method : http://localhost/3010/api/v1/user/new/
- EDIT an object with POST http method : http://localhost/3010/api/v1/user/edit/:slug
- SHOW an object with GET http method : http://localhost/3010/api/v1/user/show/:slug
- DELETE an object with DELETE http method : http://localhost/3010/api/v1/user/delete/:slug
- LIST an object with GET http method : http://localhost/3010/api/v1/user/list

#### CRUD for message
- NEW creation of an object with PUT http method : http://localhost/3010/api/v1/message/new/
- EDIT an object with POST http method : http://localhost/3010/api/v1/message/edit/:id
- SHOW an object with GET http method : http://localhost/3010/api/v1/message/show/:id
- DELETE an object with DELETE http method : http://localhost/3010/api/v1/message/delete/:id
- LIST an object with GET http method : http://localhost/3010/api/v1/message/list

#### CRUD for job-offer
- NEW creation of an object with PUT http method : http://localhost/3010/api/v1/job-offer/new/
- EDIT an object with POST http method : http://localhost/3010/api/v1/job-offer/edit/:slug
- SHOW an object with GET http method : http://localhost/3010/api/v1/job-offer/show/:slug
- DELETE an object with DELETE http method : http://localhost/3010/api/v1/job-offer/delete/:slug
- LIST an object with GET http method : http://localhost/3010/api/v1/job-offer/list

#### CRUD for email (there is only a POST method existing)
- NEW creation of an object with PUT http method : http://localhost/3010/api/v1/email/new/


### Example of use
Let us take an example and use [POSTMAN REST Client application](https://www.postman.com/), and use [Compass](https://www.mongodb.com/products/compass) for MongoDB .
We are going to perform a complete flow for a collection of certifications : creation, show, edit, delete, list

#### Create a certification
- 1. Open Postman, open a POST request.
- 2. In the POST request, write this url: http://localhost/3010/api/v1/certification/new/ .
- 3. In the request section, choose body tab, then below raw format, and a bit farther at right select JSON.
- 4. Now, let us place the body content of our new certification object. In the window opened with body tab, write the content as below:
```
{
	"title": "Javascript: data structures",
	"timeout": 72000,
	"description": "Javascript certification. Validate your javascript skills. Test timeout of 2 hours",
	"project": "n/a",
	"prerequisite": [
		"ECMAScript 15 Javascript knowledge"
	],
	"languages": [
		"javascript"	
	]
}
```
- 5. Now, push on blue send button, at right from the url. Postman sends the request to the API which treats it and should return under the body tab the response. The response from the API should be like this: 
```
{
    "certificationModel": {
        "prerequisites": [],
        "languages": [
            "javascript"
        ],
        "title": "Javascript: data structures",
        "timeout": 72000,
        "description": "Javascript certification. Validate your javascript skills. Test timeout of 2 hours",
        "project": "n/a",
        "creationDate": "2020-05-01T08:13:53.635Z",
        "picture": "../../resources/images/code_js.jpg",
        "slug": "javascript-data-structures",
        "id": "5eabda417edbb26739165a36"
    }
}
```

You created your first certification. Create two others so that we perform a list displaying all certifications in the collection. But first, let us show the certification.

#### Show a certification
- 1. Open Postman, open a GET request.
- 2. In the GET request. Do you remember the slug attribute we got once our certification was created? It is 'javascript-data-structures'. So type in the url form this: http://localhost/3010/api/v1/certification/show/javascript-data-structures .
- 3. Now, push on blue send button. The API response should give this:
```
{
    "prerequisites": [],
    "languages": [
        "javascript"
    ],
    "title": "Javascript: data structures",
    "timeout": 72000,
    "description": "Javascript certification. Validate your javascript skills. Test timeout of 2 hours",
    "project": "n/a",
    "creationDate": "2020-05-01T08:13:53.635Z",
    "picture": "../../resources/images/code_js.jpg",
    "slug": "javascript-data-structures",
    "id": "5eabda417edbb26739165a36"
}
```

#### Edit a certification
- 1. Open Postman, open a POST request.
- 2. In the PUT request. Do you remember the slug attribute we got once our certification was created? It is 'javascript-data-structures'. So type in the url form this: http://localhost/3010/api/v1/certification/edit/javascript-data-structures .
- 3. What do you want to change in this certification ? Maybe his title ? Ok ! But it will change his slug too ! Let us do it. In the window of body tab, type this:
```
{
    "title": "Javascript: array structures",
    "description": "Javascript certification. Validate your javascript skills. Test timeout of 2 hours"
}
```
- 4. Now, push on blue send button. The API response should give this in the body:
```
{
    "prerequisites": [],
    "languages": null,
    "title": "Javascript: array structures",
    "timeout": null,
    "description": "Javascript certification. Validate your javascript skills. Test timeout of 2 hours",
    "project": null,
    "creationDate": "2020-04-29T15:52:33.014Z",
    "picture": "../../assets/images/code_js.jpg",
    "slug": "javascript-array-structures",
    "id": "5ea9a2c1a18bb73be4bfc2f0"
}
```

#### List all certifications
- 1. Open Postman, open a GET request.
- 2. In the GET request, just type this url: http://localhost/3010/api/v1/certification/list .
- 3. Now, push on blue send button. You should have a list of all certifications recorded in the mongoDB collection.

#### Delete one certification
- 1. Open Postman, open a GET request.
- 2. In the DELETE request, just type this url: http://localhost/3010/api/v1/certification/delete/javascript-array-structures .
- 3. Now, push on blue send button. The API response should return :
```
{
    "prerequisites": [],
    "languages": [
        "javascript"
    ],
    "title": "Javascript: array structures",
    "timeout": 72000,
    "description": "Javascript certification. Validate your javascript skills. Test timeout of 2 hours",
    "project": "n/a",
    "creationDate": "2020-05-01T08:13:53.635Z",
    "picture": "../../resources/images/code_js.jpg",
    "slug": "javascript-array-structures",
    "id": "5eabda417edbb26739165a36"
}
```

- 4. Now if you make a call to the list api, you should have one result in less than the previous. The certification is deleted.