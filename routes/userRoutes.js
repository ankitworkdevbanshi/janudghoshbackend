
const express = require('express');
const { pool } = require('../db');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { generateToken, verifyToken } = require('../auth/jwt');
 
// Route handler for getting all users


router.post('/login', [
    check('user_name').notEmpty().withMessage('Username is required'),
    check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  ], (req, res) => {

     console.log(req.body);
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }
  
    // Sanitize username and password (remove leading/trailing whitespaces)
    const username = req.body.user_name.trim();
    const password = req.body.password.trim();
    

    pool.query('SELECT * FROM users WHERE user_name = ? AND user_pass = ? LIMIT 1', [username, password], (error, results) => {
        if (error) {
          return res.status(500).json({ error: 'An error occurred while executing the query' });
        }
    // console.log(results);
        // Check if the user exists
        const user = results[0];
        if (!user) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
    
       let token =  generateToken(user)
        // Login successful
        
        return res.json({ message: 'Login successful', token });
      });
 
  });
  












// Route handler for getting a specific user by ID
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Get user with ID ${userId}`);
});

module.exports = router