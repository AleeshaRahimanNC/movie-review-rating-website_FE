# MysticMovies_FE (Movie Review and Rating Website Frontend)

This repository contains the frontend for the Movie Review and Rating website. It is built using React.js, with Redux for state management and Axios for making HTTP requests to the backend API, and styled with HTML, CSS, and React Bootstrap.

## Prerequisites

Before you begin, ensure you have met the following requirements:
1. You have installed Node.js and npm.
2. You have the backend server running (refer to [MysticMovies_BE]).

## Installation

1. Clone the repository:
    ```bash
    git clone <your-repo-url>
    cd <your-repo-directory>
    ```

2. Install the required packages:
    ```bash
    npm install
    ```

## Library and Package Planning

1. **React**: Core library for building user interfaces.
    ```bash
    npx create-react-app projectname
    ```

2. **React Router**: For handling routing in the application.
    ```bash
    npm i react-router-dom
    ```

3. **Axios**: For making HTTP requests to the backend.
    ```bash
    npm i axios
    ```

4. **Redux**: For state management (optional, if needed for complex state management).
    ```bash
    npm i react-redux
    ```

5. **Material-UI**: For UI components and styling.
    ```bash
    npm install @mui/material @emotion/react @emotion/styled
    ```

6. **Font Awesome**: For icons.
    ```bash
    npm i --save @fortawesome/fontawesome-svg-core
    npm install --save @fortawesome/free-solid-svg-icons
    npm install --save @fortawesome/react-fontawesome
    ```

7. **Formik**: For handling forms and form validation.
    ```bash
    npm i formik
    ```

8. **Yup**: For form validation schemas.
    ```bash
    npm i yup
    ```

9. **React Bootstrap**: For Bootstrap components built with React.
    ```bash
    npm install react-bootstrap bootstrap
    ```

10. **React Toastify**: For showing toast notifications in your React application.
    ```bash
    npm i react-toastify
    ```

11. **React App Rewire Alias**: For customizing the Create React App (CRA) configuration to add aliasing for module imports without ejecting the app.
    ```bash
    npm i react-app-rewired react-app-rewire-alias --save-dev
    ```

## Usage

1. Create a `.env` file in the root directory and add your environment variables. For example:
    ```plaintext
    REACT_APP_API_URL=your_backend_api_url
    ```

2. Start the development server:
    ```bash
    npm start
    ```

## Acknowledgments

- Thanks to all the contributors of open-source packages used in this project.
