# FullStack Website

>This project is a full-stack web application that uses Angular for the frontend and Django for the backend.
## Database Setup

Create a new database or modify the DATABASES setting in settings.py:
```
  'ENGINE': 'django.db.backends.mysql',
  'NAME': 'fullstack',
  'USER': 'root',
  'PASSWORD': 'admin123$',
  'HOST': 'localhost',
  'PORT': '3306',
```
Create the database:

```
py manage.py makemigrations
py manage.py migrate
```

Create a superuser for the Django admin site by running the following command:
```
py manage.py createsuperuser
```
## Getting Started

To start the application, run the following commands:

```
B.ps1  # starts the backend
F.ps1  # starts the frontend
```

### Venv
```
./.venv/Scripts/activate
```


### Simple AES Encryption and Decryption

>Encrypt the user_data on the backend server (Django) and send it to fron-end (Angular) for decryption via the secret key.
