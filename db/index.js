const mysql = require('mysql2');

 const pool = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'janudghosh',
  
});



// pool.query("insert into table (ID, user_id, user_pass, user_name, user_email, user_status) VALUES (1523, 1, 'password', 'ankit', 'email',true )").

    pool.connect((err,con)=>{

        console.log(err);
        console.log(con);
    })
    //3306

    // const data = {
    //     ID:124,
    //     user_id:1112,
    //     user_pass:"password",
    //     user_name:"ankit",
    //     user_email:"@gmail1",
       
    //   };
      
    //   const query = 'INSERT INTO users SET ?';
      
    //   pool.query(query, data, (err, result) => {
    //     if (err) {
    //       console.error('Error executing insert query:', err);
    //     } else {
    //       console.log('Data inserted successfully!');
    //       console.log(result);
    //     }
    //   });


module.exports ={ pool,
      
}