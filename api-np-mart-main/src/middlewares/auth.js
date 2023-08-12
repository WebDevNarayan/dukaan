import jwt from 'jsonwebtoken';
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const auth = async (req, res, next) => {
  let accessToken = req.cookies.accessToken || req.headers.authorization;

  if (!accessToken) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }
  accessToken = accessToken.replace('Bearer ', '');
  try {
    const decoded = await jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    req.user = decoded;
    next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      message: 'Unauthorized - Invalid token',
    });
  }
};
