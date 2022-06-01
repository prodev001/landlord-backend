import auth from "./auth";
import property from "./property";
import user from "./user";
import delegation from './delegation';
import email from './email';
import notification from './notification';

export default (app) => {
    app.use('/auth', auth);
    app.use('/property', property);
    app.use('/user', user);
    app.use('/delegation', delegation);
    app.use('/email', email);
    app.use('/notification', notification);
    return app;
}

