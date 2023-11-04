# Placement-Cell


Welcome to the README for our web application designed to manage student placement data. This application is built on Node.js and Express, and it employs MongoDB as the underlying database. It's a powerful tool that encompasses various features related to student information, interviews, results, and job listings.

## Key Features

### Employee Dashboard
- Access a comprehensive list of all students.

### Add Student
- Easily add new students by filling out a form with essential details like batch, name, email, college, and more.

### Download Student Data
- Download student information in CSV format with just a click.

### Interview Management
- Allocate students to interviews, record interview results, and view a list of companies conducting interviews.

### Result Management
- Update interview results and keep track of which students have completed their interviews.

### Job Listings
- Browse job listings with details including job type, publication date, location, and salary information.

### Authentication
- Utilizes Passport.js for user authentication, allowing employees to sign in and out securely.

## Getting Started

1. **Install Dependencies:**
   Run `npm install` to install the necessary dependencies for the application.

2. **Environment Configuration:**
   Create a `.env` file based on the provided `.env.example`. Adjust the configurations as needed to suit your environment.

3. **Database Setup:**
   Set up a MongoDB database and configure the database connection details in the `.env` file.
   use MongoDb Atlas to setup database in cluster

5. **Run the Application:**
   Start the server by running `npm start`. The application will be accessible through your web browser.

## Usage

1. **Access the Home Page:**
   Navigate to `http://localhost:8000/` in your web browser.

2. **Employee Sign-in:**
   Sign in as an employee using your credentials.

3. **Explore and Utilize the Features:**
   Explore and use the various features of the application to manage student placement data effectively.

Feel free to reach out if you have any questions or need further assistance with this web application. Happy managing!
