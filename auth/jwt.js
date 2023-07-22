const jwt = require('jsonwebtoken');

// Secret key used to sign and verify the token (Keep it secret and secure in production)
const secretKey = 'alskj834389hcu3nc3498aknsau8691n1@#$%^';



// Function to generate a JWT token
function generateToken(user) {
  return jwt.sign(user, secretKey);
}

// Function to verify and decode a JWT token
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    return null; // Token verification failed
  }
}






const verifyTokenMiddileware = (req, res, next) => {
  const token = req.body.token;
console.log(req.body);
  if (!token) {
    return res.status(401).json({ error: 'not authorise' });
  }


  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'not authorise' });
    }

    // Token is valid, proceed to the next middleware or the route handler
    req.userId = decoded // You can store the userId from the decoded token in the request object for later use
    next();
  });
};







module.exports = {
    verifyToken,
    generateToken,
    verifyTokenMiddileware
}