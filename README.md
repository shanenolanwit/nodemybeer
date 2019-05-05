# nodemybeer #

This node app is used to track users and beers.

## Getting Started ##
There are a number of dependencies that need to be installed and configured. Ensure that you have at Node (v8+) installed  and MySQL (v8) installed.  

### Dependencies ###
Install the following dependencies
```
    "express": "~4.16.0",
    "http-errors": "~1.6.2",
    "mysql": "^2.16.0",
    "nodejs-base64": "^1.0.3",
    "nodemon": "^1.18.10"
```
This can be done using the npm install command  
```
npm i
```
Once the node modules have finished downloading you need to create a new file
`nodemybeer/database/config.js`  
Use the template file as a base. The template file can be found in the **database** folder  
`nodemybeer/database/config-template.js`  
Configure the config file to match your own system setup, it should look something like the following when you're done  
```
var config = {
    development: {
        database: {
            host:   '127.0.0.1',
            port:   '3306',
            user:   'shane',
            password:   'Rx4ffg_09No_OTyT!',
            database:   'nodemybeer'
        },
        server: {
            host:   '127.0.0.1',
            port:   '8000'
        }
    }
}
module.exports = config;
```
Use the db_init.sql file found in the **database** folder to initialise your database with the required schema.
```
C:\users\workspace\nodemybeer\database> mysql -u shane -p
Enter password: *****************
...
mysql> create database nodemybeer;
Query OK, 1 row affected (0.01 sec)
mysql> use nodemybeer;
Database changed
mysql> source db_init.sql;
Query OK, 0 rows affected (0.00 sec)
Query OK, 0 rows affected (0.00 sec)
Query OK, 0 rows affected (0.04 sec)
Query OK, 0 rows affected (0.00 sec)
Query OK, 0 rows affected (0.02 sec)

mysql> show tables;
+----------------------+
| Tables_in_nodemybeer |
+----------------------+
| beer                 |
| user                 |
+----------------------+
2 rows in set (0.00 sec)
```

## API Usage ##
---
GET `/`  
Root path, used to check node app is deployed correctly  
### Request ###
```
localhost:3000/
```
### Response ###
```
Welcome to NodeMyBeer
```
---
POST `/auth`   
Validates login requests and registers new accounts
### Request Body ###
```
{
	"email":"bruce.waynce@gothamcitycouncil.com",
	"password":"iambatman"
}
```  
### Response ###
```
{
    "email": "bruce.waynce@gothamcitycouncil.com",
    "authenticated": true,
    "newUser": true
}
```
---
POST `/beers/new`  
Creates a new beer
### Request Body ###
```
{
    "coordinates": {
        "latitude": "245",
        "longitude": "-123"
    },
    "date": "2019-12-25",
    "name": "hoegarden",
    "review": "excellent",
    "base64img": "aabbcc==",
    "email": "bruce.wayne@gothamcitycouncil.com"
}
```
### Response ###
```
{
    "data": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 30,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}
```
---
POST `/beers/update/:id`  
Updates the beet with the given id  
### Request ###
```
localhost:3000/beers/update/30
```
### Request Body ###
```
{
    "coordinates": {
        "latitude": "245",
        "longitude": "-123"
    },
    "date": "2019-12-24",
    "name": "hoegarden",
    "review": "excellent",
    "base64img": "aabbcc==",
    "email": "bruce.wayne@gothamcitycouncil.com"
}
```
### Response ###
```
{
    "data": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "(Rows matched: 1  Changed: 1  Warnings: 0",
        "protocol41": true,
        "changedRows": 1
    }
}
```
---
GET `/beers?email=[email]`   
Gets beers specific to a given email
### Request ### 
```
localhost:3000/beers?email=bruce.wayne@gothamcitycouncil.com
```
### Response ###
```
{
    "data": [
        {
            "id": 30,
            "name": "hoegarden",
            "review": "excellent",
            "latitude": 245,
            "longitude": -123,
            "date": "2019-12-24",
            "base64img": "aabbcc==",
            "email": "bruce.wayne@gothamcitycouncil.com"
        }
    ]
}
```
---
GET `/beers/:id`  
Gets a beer with a specific id
### Request ###
```
localhost:3000/beers/30
```
### Response ###
```
{
    "data": [
        {
            "id": 30,
            "name": "hoegarden",
            "review": "excellent",
            "latitude": 245,
            "longitude": -123,
            "date": "2019-12-24",
            "base64img": "aabbcc==",
            "email": "bruce.wayne@gothamcitycouncil.com"
        }
    ]
}
```
---
GET `/locate/`   
Gets all beers  
### Request ### 
```
localhost:3000/locate
```
### Response ###
```
{
    "data": [
        {
            "id": 30,
            "name": "hoegarden",
            "review": "excellent",
            "latitude": 245,
            "longitude": -123,
            "date": "2019-12-24",
            "base64img": "aabbcc==",
            "email": "bruce.wayne@gothamcitycouncil.com"
        }
    ]
}
```
---
GET `/locate/:name`   
Gets all beers with a specific name
### Request ### 
```
localhost:3000/locate/hoegarden
```
### Response ###
```
{
    "data": [
        {
            "id": 30,
            "name": "hoegarden",
            "review": "excellent",
            "latitude": 245,
            "longitude": -123,
            "date": "2019-12-24",
            "base64img": "aabbcc==",
            "email": "bruce.wayne@gothamcitycouncil.com"
        }
    ]
}
```
---
GET `/count?email=[email]` 
Gets a breakdown of beers added by date specific to a given email  
### Request ###
```
localhost:3000/count?email=bruce.wayne@gothamcitycouncil.com
```
### Response ###
```
{
    "data": [
        {
            "date": "2019-12-24",
            "count": 1
        }
    ],
    "total": 1
}
```
---
POST `/count?email=[email]`   
Gets a breakdown of beers added by date specific to a given email in a given timeframe  
### Request ###
```
localhost:3000/count?email=bruce.wayne@gothamcitycouncil.com
```  
### Request Body ###  
```
{
    "fromDate": "2019-12-23",
    "toDate": "2019-12-27"
}
```
### Response ###
```
{
    "data": [
        {
            "date": "2019-12-24",
            "count": 1
        }
    ],
    "total": 1
}
```
---
DELETE `/beers/delete/:id`  
Deletes a beer with a given id
### Request ###
```
localhost:3000/beers/delete/30
```
### Response ###
```
{
    "data": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}
```

## Deployment Recommendations ##
* Deploy your node application on an [aws EC2](https://aws.amazon.com/ec2/ "aws EC2 Service") linux instance for full control over deployment, provisioning, load balancing and scaling. You could also use [aws Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/ "aws Beanstalk Service"), this service automatically handles the deployment of your application, from capacity provisioning, load balancing, auto-scaling to application health monitoring. The third cloud option is to use [aws Lambda](https://aws.amazon.com/lambda/ "aws Lambda Service"), AWS Lambda lets you run code without provisioning or managing servers. You pay only for the compute time you consume - there is no charge when your code is not running. Alternatively launch the app on your local machine.
* Deploy your mysql backend using [Amazon Aurora](https://aws.amazon.com/rds/aurora/ "Amazon Aurora"). Amazon Aurora is up to five times faster than standard MySQL databases. It provides the security, availability, and reliability of commercial databases at 1/10th the cost. Amazon Aurora is fully managed by [Amazon Relational Database Service (RDS)](https://aws.amazon.com/rds/ "Amazon Relational Database Service (RDS)"), which automates time-consuming administration tasks like hardware provisioning, database setup, patching, and backups. Alternatively launch the mysql service on your local machine.