# Pharmacy-management-system

Have you ever found yourself struggling in search for a drugs remembering only a single catchy(key) phrase 
or tried calculating complex measures to assess performance? Do you manage or work in a pharmacy?
Next time just use Wearehouse Pharmacy System. It's super simple tool that will solve this problem!
Just enter the phrase or sentence that you remember, then set a few additional parameters, and there you go!
The program will do the rest automatically! Your super accurate results are already waiting for you. It's that simple!


## Installation

### 1. Clone repository:

```
$ git clone https://github.com/SzymonCogiel/Pharmacy-management-system.git
```

### 2. Open the project folder in terminal, go to the backend folder and create and activate the virtual environment:

```
$ cd backend
```
```
$ py -m venv venv
```

```
$ venv\Scripts\activate
```

### 3. Create databese and upload data:


Create a Postgres database named "pharmacy"
For example from the ".sql" file, upload a backup of your database.

### 4. Set the following variables in environment variables:


a)	WINDOWS
Edit the system environment variables -> press button “Environment Variables” -> press button “New”

<br />
Set:

<br />
POSTGRES_PASS – hasło do POSTGRESA
CONFLUENCE_AGH_TOKEN – token autoryzacyjny do confluence
ATLASSIAN_AGH_MAIL – mail przypisany do confluence

<br />
b)	LINUX

<br />
$ export POSTGRES_PASS=YOUR_PASSWORD
$ export CONFLUENCE_AGH_TOKEN=YOUR_TOKEN
$ export ATLASSIAN_AGH_MAIL=YOUR_MAIL

### 5. Start the Django server:

```
$ py manage.py runserver
```

### 6. Go to the frontend folder and install node.js packages, then run React applications:

```
$ npm install
```

```
$ npm install packages.json
```

```
$ npm start
```

### 7. Check that all functionalities are working by tests:
```
$ cd test
```

```
$ py frontend_test.py
```

```
$ py backend_test.py
```

### 8. Enjoy the working app
;)
