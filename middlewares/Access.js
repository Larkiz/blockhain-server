import { getToken } from "../shared/utils/getToken.js";

export const Access = (req, res, next) => {
  const token = getToken(req);
  if (token) {
    req.userData = { token };
    next();
  } else {
    res.status(401).send({ message: "Not authorized" });
  }
};
