const pool = require("../config/database");

module.exports = {
  create: (
    data: {
      first_name: string;
      last_name: string;
      email: string;
      password: string;
    },
    callBack: any
  ) => {
    pool.query(
      `insert into registration(first_name,last_name,email,password)values(?,?,?,?)`,
      [data.first_name, data.last_name, data.email, data.password],

      (error: any, results: any, fields: any) => {
        if (error) {
          return callBack(error);
        } else {
          //    console.log(data)
          return callBack(null, data);
        }
      }
    );
  },

  getUserByUserEmail:(email: string,callBack:any) =>{

    pool.query(
        `select * from registration where email = ?`,
        [email],
        (error: any, results: any, fields: any) =>{
            if(error){
              return  callBack(error);
            }
            return callBack(null,results[0])
        }
    )
  }



};
