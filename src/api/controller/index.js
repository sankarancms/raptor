const contollers = {};

// Registering controllers
import users from './users';
contollers['users'] = users;
import admin from './admin';
contollers['admin'] = admin;

export default contollers;
