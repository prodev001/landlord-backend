import authJwt from "../middleware";
import { allAccess, userBoard, moderatorBoard, adminBoard } from "../controllers/user";

export default function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/all", allAccess);
  app.get(
    "/user",
    [authJwt.verifyToken],
    userBoard
  );
  app.get(
    "/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    moderatorBoard
  );
  app.get(
    "/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    adminBoard
  );
};