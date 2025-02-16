import jwt from 'jsonwebtoken';

export const jwtConfig = {
    access: "",
    refresh: ""
};

export const refreshTokens = [];

export const generateToken = (id, expiresIn) => {
    return jwt.sign({ id }, jwtConfig.access, expiresIn);
};

export const generateRefreshToken = (id, expiresIn) => {
    return jwt.sign({ id }, jwtConfig.refresh, expiresIn);
};

export const verifyToken = (token, secret, req, res) => {
    try {
        return jwt.verify(token, secret); //This returns object of decoded token. ex {id: 1, iat: 1692345678, exp: 1692345678}
    } catch (err) {
        return res.status(401).send({ message: "Unauthorized " + err.message });
    }
};  
  