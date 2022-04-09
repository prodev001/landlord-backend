import auth from "./auth";
import user from "./user";

export default (app) => {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.use('/auth', auth);
    app.use('/user', user);

    return app;
}

