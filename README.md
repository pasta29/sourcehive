# SecureDash

SecureDash is a full-stack application designed to manage and secure user credentials while providing data breach detection functionality.

---

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- **Credential Management**: Add, view, and delete personal credentials securely.
- **Data Breach Detection**: Check if credentials have been compromised using external APIs.
- **Responsive UI**: User-friendly interface optimized for various devices.

---

## Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher)
- [CosmosDB Emulator](https://learn.microsoft.com/en-us/azure/cosmos-db/local-emulator) (for local database setup)

---

## Setup Instructions

### Backend Setup
1. **Install CosmosDB Emulator**:
   - Download and install the [CosmosDB Emulator](https://learn.microsoft.com/en-us/azure/cosmos-db/local-emulator).
   - Run the emulator and create the database and containers as specified in the `.env.example` file.

2. **Install Dependencies**:
   - Navigate to the backend directory and run:
     ```bash
     npm install
     ```

3. **Run the Backend**:
   - Start the backend server:
     ```bash
     npm run dev
     ```
   - The backend will run on `http://localhost:3000`.

4. **API Testing**:
   - Use the Postman collection file located in the root directory to test the APIs.

---

### Frontend Setup
1. **Navigate to the Frontend Directory**:
   ```bash
   cd frontend
   ```
2. **Install Dependencies**:
   - Run:
     ```bash
     npm install
     ```

3. **Setup Environment Variables**:
   - Create a `.env` file in the `frontend` directory based on `.env.example`.

4. **Run the Frontend**:
   - Start the development server:
     ```bash
     npm start
     ```
   - The frontend will run on an available port.

5. **Ensure Backend is Running**:
   - Make sure the backend is running before testing the frontend.

## Usage
1. Open the frontend in your browser (e.g., http://localhost:3001).
2. Add your credentials using the form provided.
3. Use the "Check Leak" button to verify if your credentials have been compromised.
4. Manage your credentials by viewing or deleting them as needed.

## Environment Variables
** The application requires the following environment variables:

## Backend
**COSMOS_DB_URI**: URI for the CosmosDB instance.
**COSMOS_DB_KEY**: Access key for CosmosDB.
**DATABASE_NAME**: Name of the database.
**CONTAINER_NAME**: Name of the container.

## Frontend
**VITE_RAPIDAPI_KEY**: API key for the data breach detection service.
**VITE_RAPIDAPI_HOST**: Host for the data breach detection service.

Refer to the .env.example files in both the backend and frontend directories for more details.

## API Documentation
1. The API documentation is available in the Postman collection file located in the root directory.
2. Import the collection into Postman to view and test all available endpoints.

## Contributing
Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push them to your fork.
4. Submit a pull request with a detailed description of your changes.

## License
This project is licensed under the MIT License.
