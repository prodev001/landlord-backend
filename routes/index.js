import auth from "./auth";
import property from "./property";
import user from "./user";

export default (app) => {
    app.use('/auth', auth);
    app.use('/property', property);
    app.use('/user', user);

    return app;
}

