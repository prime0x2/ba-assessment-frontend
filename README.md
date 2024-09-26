# BA Task Manager

Live: https://ba-task-manager.vercel.app

## Prerequisites

- Node.js (v20 or higher)
- Yarn or npm

## Project Run Documentation in Local

### Setup Instructions

1. Clone the repo.

   ```sh
   git clone https://github.com/your-repo/ba-task-manager.git
   cd ba-task-manager
   ```

2. Create a **.env** file under the project root directory. You can just copy the **.env.example** file and rename it.

   ```sh
   cp .env.example .env
   ```

3. Add the following variable in the `.env` file:

   ```env
    VITE_DEV_API_URL=DEVELOPMENT_API_URL_HERE
    VITE_PROD_API_URL=PRODUCTION_API_URL_HERE
    VITE_GOOGLE_CLIENT_ID=GOOGLE_CLIENT_ID_HERE
   ```

4. Open terminal and install dependencies:

   ```sh
   yarn
   # or
   npm install
   ```

5. Run the development server:

   ```sh
   yarn dev
   # or
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000` to see the result.
