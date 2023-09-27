## Portal Web in NodeJs
This is a project that I developed when I took Node Js course, I am using libraries and frameworks such as express, handlebars and mongoose.

The small project is about a job portal where you can search and post job offers.

## Start the project on docker
Once the following steps are done, you will be able to test the project.

- Create app image

    ```docker build -t app-container-one```

- Initialize containers

    ```docker-compose up -d```

## Open the project in the browser

- Main page
  - http://localhost:5000/

- Login to publish or edit offer job
  - http://localhost:5000/login/create
  - User: test@gmail.com - Password: password

## Main requirements
- NodeJs
- Express
- Handlebars
- MongoDb

## Unit Test Example
- Run >> npm test
