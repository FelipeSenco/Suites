# Suites Management App

# Running Locally

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js v18.18.0, npm -v9.8.1 (higher versions should work as well)
- Sql Server 2022 (Express version is sufficient)
- Visual Studio 2022 (.net 6.0 SDK compatible)

## Setup Local Environment

### Back-End .Net App

1. **Open the solution using Visual Studio**

2. **Righ click the Database project and publish the Database to your local instance of SQl Server**

   This will create the tables and seed the Properties table with initial data

3. **In appsettings.development.json, replace {ConnectionString} with your correct connection string**

4. **Choose the 'Suites' project from the dropdown on the Visual Studio top menu and click run (play button)**

5. **Now the Backend Api should be running**

### Front-End React App

Follow these steps to set up your local development environment after cloning the repo:

1. **Navigate to App folder**

2. **Install dependencies**

   Run the following command to install the necessary dependencies:

   ```bash
   npm install
   ```

3. **Run the front-end app**

   ```bash
   npm run start
   ```
