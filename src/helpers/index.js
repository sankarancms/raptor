import renderer from './renderer';
global.helpers = global.helpers || {};
global.helpers.renderer = renderer;
global.helpers.toJSON = (success = false, message = '', data = {}, errors = {}) => {
    return {
        success, message, data, errors
    }
}
