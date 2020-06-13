# Full Stack Developer Challenge



## Stack Used


- Flask(Python)

- MySQL

- Angular

## Server Setup

Install  Requirements

```
$ pip install -r requirements.txt 
```

## DB Setup

Create a database named `pay_pay` with username `pay_pay` and password `pay_pay` 

DB Credentials are given in `alembic.ini`  and `config/default` files

```
mysql+pymysql://pay_pay:pay_pay@127.0.0.1/pay_pay
```

DB Migration

```
alembic upgrade head
```

Create admin(role = 1) and employee(role = 2) user and other authentication tables

```
python db_seeder.py 
```

Run Server

```
python run.py
```

## Login Credentials

Admin Login

**email: admin@paypay.com**
**password: testtest**

Employee Login

**email: employee1@paypay.com**
**password: testtest**

## Client Setup

```
cd client/
npm install
ng serve
```

## ScreenShots

Login Screen

![Screenshot](ScreenShots/LoginScreen.png)

Employee List(admin_view)

![Screenshot](ScreenShots/EmployeeTableScreen.png)

Add Employee(admin_view)

![Screenshot](ScreenShots/AddEmployeeScreen.png)

Edit Employee(admin_view)

![Screenshot](ScreenShots/EditEmployeeScreen.png)

Delete Employee(admin_view)

![Screenshot](ScreenShots/DeleteEmployeeScreen.png)

Add Reviewer(admin_view)

![Screenshot](ScreenShots/AddReviewerScreen.png)

Reviewers List(admin_view)

![Screenshot](ScreenShots/ReviewersListTable.png)

Performance Phrase List(admin_view)

![Screenshot](ScreenShots/PerformancePhraseTableScreen.png)

Add Performance Phrase(admin_view)

![Screenshot](ScreenShots/AddPerformancePhraseScreen.png)

Employee Requiring Review(employee_view)

![Screenshot](ScreenShots/EmployeeReviewsScreen.png)

Employee Adding Review(employee_view)

![Screenshot](ScreenShots/AddReviewScreen.png)



# Full Stack Developer Challenge
This is an interview challengs. Please feel free to fork. Pull Requests will be ignored.

## Requirements
Design a web application that allows employees to submit feedback toward each other's performance review.

*Partial solutions are acceptable.*  It is not necessary to submit a complete solution that implements every requirement.

### Admin view
* Add/remove/update/view employees
* Add/update/view performance reviews
* Assign employees to participate in another employee's performance review

### Employee view
* List of performance reviews requiring feedback
* Submit feedback

## Challenge Scope
* High level description of design and technologies used
* Server side API (using a programming language and/or framework of your choice)
  * Implementation of at least 3 API calls
  * Most full stack web developers at PayPay currently use Java, Ruby on Rails, or Node.js on the server(with MySQL for the database), but feel free to use other tech if you prefer
* Web app
  * Implementation of 2-5 web pages using a modern web framework (e.g. React or Angular) that talks to server side
    * This should integrate with your API, but it's fine to use static responses for some of it 
* Document all assumptions made
* Complete solutions aren't required, but what you do submit needs to run.

## How to complete this challenge
* Fork this repo in github
* Complete the design and code as defined to the best of your abilities
* Place notes in your code to help with clarity where appropriate. Make it readable enough to present to the PayPay interview team
* Complete your work in your own github repo and send the results to us and/or present them during your interview

## What are we looking for? What does this prove?
* Assumptions you make given limited requirements
* Technology and design choices
* Identify areas of your strengths
