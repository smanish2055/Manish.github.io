import { Request, Response, NextFunction } from 'express';
const { verify, sign } = require('jsonwebtoken');
 const AccessTokenSecret = '60s';
 const RefreshTokenSecret = '300s';

const refreshTokens: string[] = [];

module.exports = {
  checkToken: (req: Request, res: Response, next: NextFunction) => {
    let token = req.get("authorization");
    if (token) {
      token = token.slice(7);
      verify(token, "qwe1234", (err: any, decoded: any) => {
        if (err) {
          res.json({
            success: 0,
            message: "Invalid token",
          });
        } else {
          next();
        }
      });

    } else {
      res.json({
        success: 0,
        message: "Access denied! Unauthorized user"
      });
    }
  },

  // New route for obtaining a new access token using a refresh token
  refreshToken: (req: Request, res: Response) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken || !refreshTokens.includes(refreshToken)) {
      return res.status(401).json({ success: 0, message: 'Unauthorized' });
    }

    verify(refreshToken, RefreshTokenSecret, (err: any, user: any) => {
      if (err) {
        return res.status(403).json({ success: 0, message: 'Invalid token' });
      }

      const accessToken = sign({ username: user.username }, AccessTokenSecret, { expiresIn: '15m' });
      res.json({ success: 1, accessToken });
    });
  }
};
