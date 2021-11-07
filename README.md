# **Student Result Management System**

## Description
This project consistes of a full stack website that eases the process of student result management.

- Students can view their profile, exam information and marks
- teachers can update score and schedule exams
- admin can maintain student and teacher database
- ✨All in one site

## Features

- Login page(with enrollment no and password)
- Home Page
- Admin page(for data insertion)-Marks
- Add marks of students
- Edit marks of students
- Add subject
- Delete subject
- Result page
- Edit Student details page(for student) - here some changes can be modified by student
- Student Registration



> Our proposed system will be managing the information of various students, 
> enrolled in different years, including a complete overview of the courses 
> taken and marks obtained by them during different semesters.
> The application will greatly simplify and speed up
> the result management process.

## Technology Used


- [HTML]
- [CSS]
- [react.js] -  open-source front-end JavaScript library for building user interfaces
- [Django]
- [VS Code] - text editor



## Setting up the project

#### Install your requirements

```sh
pip install -r requirements.txt
```
### Create a user
```sh
python manage.py createsuperuser
```
#### Make your migrations

The only migrations that should appear in each of your app’s migrations folders are called ‘__init__.py’. As we have started a new database, we can delete any existing migrations and migrate from scratch.
In your terminal:

```sh
$ python manage.py makemigrations
$ python manage.py migrate
```

## How to run this Project
For user :
```sh
 http://127.0.0.1:3000/
```
For admin:
```sh
http://127.0.0.1:8000/admin
```


## Innovations

Some of the value additions we have tried to add to our system are:
- [x] User friendly interface
- [x] Search facility
- [x] Look and Feel Environment
- [x] Result can be downloaded in PDF format









