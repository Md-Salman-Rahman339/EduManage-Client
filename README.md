EduManage
Frontend :https://edumanage-568b8.firebaseapp.com/

https://edumanage-568b8.web.app/

Backend Server codes :https://github.com/Md-Salman-Rahman339/Edumanage-DRF-Server
Backend Server Url:https://edumanage-drf-server.onrender.com


Project Status
This project is currently in progress. Most core features are implemented, but some parts are still under development and refinement.

Overview
EduManage is a modern, full-stack educational platform designed to simplify class management, enrollment, and interaction between students, teachers, and administrators. Built with MySQL, Django REST Framework, React, and Tailwind CSS, it provides a seamless and responsive user experience across devices.

Features
Responsive UI for Mobile, Tablet, and Desktop with a sleek Dashboard layout for Students, Teachers, and Admins.

Role-based Access Control: Student, Teacher, Admin roles with tailored dashboards and permissions.

JWT Authentication with email/password and Google Sign-in, storing tokens securely in local storage.

Dynamic Navbar with profile dropdown, logout, and contextual links.

Homepage: Banner carousel, partner showcase, popular classes slider, teacher feedback carousel, site statistics, and teacher recruitment section.

Class Management:

Students can browse all approved classes and enroll.

Teachers can add, update, delete classes (initially pending approval).

Admins review and approve/reject teacher requests and classes.

Class Details & Payment:

Enrolled students can view class details and proceed with payment.

Post-payment, enrollment info and transactions are saved.

Assignment Management:

Teachers add assignments to classes.

Students can submit assignments with upload and tracking functionality.

Teaching Evaluation Report (TER): Students provide feedback and ratings for classes, which are displayed on the homepage.

Teacher Request System: Users can apply to become teachers; admins approve or reject with status tracking.

User Management: Admins can search users, view profiles, and promote users to admin.

CRUD Notifications: Sweet alerts and toast notifications for all create, update, delete, login, and signup actions.

Data Fetching: All GET requests use TanStack Query for efficient, cached, and reactive data loading.

Environment Variable Security: Sensitive Firebase config keys and MongoDB credentials are hidden and not exposed in the client code.

Form Handling: All forms are implemented with react-hook-form for validation and improved UX.

Private Routes: User session persistence after reload with token-based authentication.



Installation & Setup
Clone the repository.

Create and activate a Python virtual environment.

Install backend dependencies:

bash
Copy
Edit
pip install -r requirements.txt
Set environment variables for Firebase, MongoDB, and Django secrets.

Run Django migrations and start backend server.

Navigate to the frontend directory.

Install frontend dependencies:

bash
Copy
Edit
npm install
Create .env file with Firebase config and API URLs.

Run React development server:

bash
Copy
Edit
npm start
Access the site at http://localhost:3000.

Usage
Use the Navbar to navigate between Home, All Classes, and Teaching application.

Register and login to access private routes.

Explore dashboards based on your role.

Teachers add and manage classes and assignments.

Students enroll in classes, submit assignments, and provide feedback.

Admins manage users, classes, and teacher applications.

Technologies Used
Backend: Django REST Framework, MySQL, JWT

Frontend: React, Tailwind CSS, TanStack Query, React Hook Form, SweetAlert2

Authentication: JWT

Database: MySQL (main)



Contributions
This project is a solo effort but open for future collaboration.

Contact
For any questions or suggestions, please reach out at salmanrahman339@gmail.com.

Note
Some features and optimizations are still in progress and will be updated regularly.
