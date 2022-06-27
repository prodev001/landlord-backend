import auth from "./auth";
import property from "./property";
import user from "./user";
import delegation from './delegation';
import email from './email';
import notification from './notification';
import invite from './invite';

export default (app) => {
    app.use('/auth', auth);
    app.use('/property', property);
    app.use('/user', user);
    app.use('/delegation', delegation);
    app.use('/email', email);
    app.use('/notification', notification);
    app.use('/invite', invite);
    return app;
}

