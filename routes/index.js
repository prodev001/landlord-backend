import auth from "./auth";
import property from "./property";

export default (app) => {
    app.use('/auth', auth);
    app.use('/property', property);

    return app;
}

