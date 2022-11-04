const jwt = require('jsonwebtoken');
const JWT_SECRET =   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlJvYmVydG8iLCJpYXQiOjE1MTYyMzkwMjJ9.sJjmNblu1hQQN02Ji6RjYCFwfyEqu5psa7g7nZ8YXuw";//process.env.JWT_SECRET;
const signToken = async (user) => {
  const signToken = await jwt.sign({
    _id: user.id,
    role: user.role,
  },JWT_SECRET, {
    expiresIn:"2h"
  } );
  return signToken;
};
const verifyToken = async (tokenJwt) => {
    try {
      return jwt.verify(tokenJwt, JWT_SECRET);
    } catch (e) {
      return null;
    }
};

module.exports = { signToken, verifyToken };
