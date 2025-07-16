# To-Do Application

## Overview
This is a full-stack To-Do application built with **Django** (backend) and **React** (frontend). It supports user authentication (register/login) and CRUD operations for tasks. The backend uses **Django REST Framework** with **JWT authentication** for secure API access, and **SQLite** as the database for development. The frontend is styled with **Tailwind CSS** for a responsive user interface.

### Features
- **Authentication**: User registration and login with JWT-based authentication.
- **Task Management**: Create, read, update, and delete tasks (title, description, status, due date).
- **User-Specific Tasks**: Only authenticated users can manage their own tasks.
- **API**: RESTful endpoints for authentication and task operations.
- **Frontend**: React-based UI with forms for registration, login, and task management, plus a task list view with status toggle and delete functionality.
- **Task Filtering**: Filter tasks by status (`Pending`/`Completed`/`In Progress`) using a dropdown in the frontend.

## Project Structure
```
todo-app/
├── backend/
│   ├── todo/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── ...
│   ├── accounts/
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── models.py
│   │   └── serializers.py
│   │   └── ...
│   ├── tasks/
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── models.py
│   │   └── serializers.py
│   │   └── ...
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── RegisterForm.jsx
│   │   │   ├── LoginForm.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskDetailPage.jsx
│   │   │   ├── Navbar.jsx
│   │   └── ...
│   │   ├── App.js
│   │   ├── index.js
│   ├── package.json
├── docs/
│   ├── todo-app.postman_collection.json
├── README.md
```

## Setup Instructions

### Prerequisites
- **Python** (3.12.3)
- **Node.js** (22.15.0)
- **Git**

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/imsnto/todo-app-.git
   cd todo-app-/backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Apply migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```
6. Start the Django development server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd todo-app-/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```

### API Endpoints
- **Base URL**: `http://localhost:8000/api/v1/`
- **Authentication**:
  - `POST /accounts/register/`: Register a new user (`{ "username": "string", "first_name": "string", "last_name": "string", "password": "string", "password2": "string" }`).
  - `POST /accounts/login/`: Login and obtain JWT tokens.
  - `POST /accounts/api/token/`: Obtain JWT access and refresh tokens.
  - `POST /accounts/api/token/refresh/`: Refresh JWT token.
  - `POST /accounts/api/token/verify/`: Verify JWT token.
- **Tasks**:
  - `GET/POST /tasks/`: List all tasks for the authenticated user or create a new task.
  - `GET/PUT/PATCH/DELETE /tasks/<id>/`: Retrieve, update, or delete a specific task.
    
**Postman Collection**: [Download the Postman collection](/docs/todo-app.postman_collection.json) for testing all API endpoints.
  
**Note**: All task endpoints require `Authorization: Bearer <access_token>` in the request header.

## Screenshots
Below are screenshots showcasing the app's key functionalities:

- **Login Page**:
  ![Login Page](/docs/screenshots/login.png)

- **Signup Page**:
  ![Signup Page](/docs/screenshots/register.png)

- **Home Page**:  
  ![Home Page](/docs/screenshots/home-page.png)

- **Create Task**:  
  ![Create Task](/docs/screenshots/create-task.png)

- **Details Task**:  
  ![Details Task](/docs/screenshots/detail-task.png)

- **Task Filtering**:
  ![Filter Task](/docs/screenshots/filter.png)

## Running the Application
1. Start the backend server (`python manage.py runserver`).
2. Start the frontend server (`npm start`).
3. Access the app at `http://localhost:3000`.
4. Register a new user, log in, and manage tasks (create, view, update, delete).

## Notes
- Ensure the backend and frontend are running concurrently for full functionality.
