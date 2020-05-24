const models = {};

// Registering Models
import User from './User';
models['users'] = User;

import Configs from './Configs';
models['configs'] = Configs;

export default models;
