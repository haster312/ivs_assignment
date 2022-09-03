Email: hoanglc1989@gmail.com

Name: Nguyen Ngoc Hoang

# IVS Account 
https://433631102570.signin.aws.amazon.com/console
ivs_account / OsudXwsd$IJu6%$
(Need to change password after first login)

# Web Page
Admin user: admin@ivs.com/abcd1234
* http://ivs.physolution.io/ (User this page to sign up for event)
* http://ivs.physolution.io/login
* http://ivs.physolution.io/sign-up (after login)

* API Admin Login (admin@ivs.com/abcd1234) this admin is created for testing purpose
  * http://ivs.physolution.io/api/auth/login
* API Get Sign Up List: 
  * http://ivs.physolution.io/api/event/sign-up?page=1&size=10

* API Get Sign Up Detail
  * http://ivs.physolution.io/api/event/sign-up/{signUpId}

# Solution
In this sample, I used CDK to deploy the application
There are 3 main AWS services are used:
* EBS (EC2)
* S3
* RDS
* Route 53 (optional), you can create A record and point to created EBS.

To deploy you application:
* cd cdk
* cp .env.example
* Update 
  * CDK_DEFAULT_ACCOUNT=(Your admin account ID which has full access to all AWS resources)
  * CDK_DEFAULT_REGION=(Region for deployment. Ex: ap-southeast-1 (Singapore))
* npm install
* run ``cdk bootstrap`` (run ``cdk bootstrap --profile profile_name`` in case you have multi aws configure on your local)
* run ``cdk deploy`` (run ``cdk deploy --profile profile_name``)
* Wait for deployment finish
* Enjoy

# Docker Local
I set up all necessary for local development with Docker.
Require docker is installed on your local machine.

* If you have nodejs install on your local
  * cd application
  * Run ``npm run docker:up`` (To build you local environment)
  * After built, run ``npm run docker:migrate:run`` (migrate database for first time)
  * cp .env.example .env
  * Update JWT_SECRET value
* If you don't have nodejs
  * cd application
  * Run ``docker-compose up -d --build``
  * After built, run ``docker exec -it ivs_app npm run migrate:run``
  * cp .env.example .env
  * Update JWT_SECRET value
  
