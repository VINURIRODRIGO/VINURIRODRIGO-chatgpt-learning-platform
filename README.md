# vinurirodrigo-chatgpt-learning-platform

## Overview

This project is an online learning platform built using the MERN stack (MongoDB, Express.js, React.js/Next.js, Node.js) with integration of ChatGPT to provide personalized course recommendations. The platform allows users to register, log in, enroll in courses, and receive course suggestions based on their interests.

## Table of Contents

- [vinurirodrigo-chatgpt-learning-platform](#vinurirodrigo-chatgpt-learning-platform)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
    - [Student Features](#student-features)
    - [Instructor Features](#instructor-features)
    - [General Features](#general-features)
  - [Project Setup](#project-setup)
  - [Scripts](#scripts)
  - [Dependencies](#dependencies)
  - [Project Structure](#project-structure)
  - [Documentation](#documentation)
  - [License](#license)

## Features

### Student Features

- **Sign Up and Login:** Users can sign up and log in using their username and password.
- **Course Viewing and Enrollment:** Students can view available courses, see course details, and enroll in courses.
- **Enrolled Courses:** Students can view their list of enrolled courses.
- **Chat-GPT Course Suggestions:** Students can enter prompts (e.g., "I want to be a software engineer, what courses should I follow") and receive a list of recommended courses.

### Instructor Features

- **Sign Up and Login:** Instructors can sign up and log in using their username and password.
- **Course Management:** Instructors can add, view, edit, and manage courses and see enrolled students' details.

### General Features

- **User Authentication and Authorization:** Role-based access control (RBAC) to distinguish between students and instructors.
- **Chat-GPT Integration:** Personalized course recommendations based on user input.

## Project Setup

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/vinurirodrigo-chatgpt-learning-platform.git
    cd vinurirodrigo-chatgpt-learning-platform
    ```

2. Install dependencies for both client and server:

    ```sh
    npm run install-client
    npm run install-server
    ```

3. Start the application:

    ```sh
    npm start
    ```

## Scripts

- `install-client`: Install dependencies for the client.
- `build-client`: Start the client.
- `install-server`: Install dependencies for the server.
- `start-server`: Start the server.
- `start`: Concurrently start both the client and server.

## Dependencies

- `concurrently`: ^8.2.2
- `axios`: ^1.7.2
- `bcryptjs`: ^2.4.3
- `cloudinary`: ^2.3.0
- `cookie-parser`: ^1.4.6
- `cors`: ^2.8.5
- `dotenv`: ^16.4.5
- `express`: ^4.19.2
- `express-async-handler`: ^1.2.0
- `express-rate-limit`: ^7.4.0
- `express-validator`: ^7.1.0
- `helmet`: ^7.1.0
- `ioredis`: ^5.4.1
- `jsonwebtoken`: ^9.0.2
- `mongoose`: ^8.5.1
- `openai`: ^4.52.7
- `swagger-jsdoc`: ^6.2.8
- `swagger-ui-express`: ^5.0.1
- `@testing-library/jest-dom`: ^5.17.0
- `@testing-library/react`: ^13.4.0
- `@testing-library/user-event`: `^13.5.0`
- `axios`: `^1.7.2`
- `react`: `^18.3.1`
- `react-dom`: `^18.3.1`
- `react-router-dom`: `^6.25.1`
- `react-scripts`: `5.0.1`
- `web-vitals`: `^2.1.4`

## Project Structure

```
vinurirodrigo-chatgpt-learning-platform/
├── backend/
│   ├── node_modules/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   ├── package-lock.json
│   ├── package.json
│   ├── vercel.json
│   └── index.js
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assert/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── services/
│   ├── App.css
│   ├── App.js
│   ├── .env
│   ├── index.css
│   ├── index.js
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   └── .gitignore
├── .gitignore
├── README.md
├── node_modules/
├── package-lock.json
└── package.json
```

## Documentation

- **API Documentation:** Detailed API documentation can be found [here](https://app.swaggerhub.com/apis-docs/VINURI2019753/E-ChatGPT-Learning-Platform/1.0.0).
- **System Architecture:** System architecture overview is available [here](docs/architecture.md).
- **Setup Instructions:** Follow the setup instructions in the [Project Setup](#project-setup) section.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.
