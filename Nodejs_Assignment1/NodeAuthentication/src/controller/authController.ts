const {create,getUserByUserEmail} = require("../service/authService");
const {genSaltSync,hashSync,compareSync} = require("bcrypt")
const {sign} = require("jsonwebtoken");

import  { Request, Response } from 'express';


module.exports ={
  createUser:(req:Request,res:Response)=>{
    const body =req.body;
    const salt =genSaltSync(10);
    body.password = hashSync(body.password,salt);

    create(body,(err:string,results:{})=>{
      if(err){
        return res.status(500).json({
          success:0,
          message:'Database connection error'
        });
      }else{
        return res.status(200).json({
          success:1,
          data:results
        
        });
      }
     
    })

  },

  login:(req:Request,res:Response)=>{
    const body= req.body;
    getUserByUserEmail(body.email,(err:any,results:any)=>{
      if(err){
        console.log(err);
      }
      if(!results){
        return res.json({
          success:0,
          data:"Invalid email or password"
        })
      }
      const result = compareSync(body.password,results.password);

      if(result){
        
        results.password = undefined;
        const jsontoken = sign({result:results},"qwe1234",{
          expiresIn:"1h"
        });

        console.log("login successfull")
        
        return res.json({
          success:1,
          message:"login successfull",
          token:jsontoken
        })
        
      }else{
        return res.json({
          success:1,
          message:"Invalid email or password",
         
        })
      }



    });
  },


  token:(req:Request,res:Response)=>{

  }


}