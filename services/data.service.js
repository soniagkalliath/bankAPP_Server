//import jsonwebtoken
const jwt = require('jsonwebtoken')

database={
    1000:{acno:1000,uname:"Neer",password:1000,balance:5000,transaction:[]},
    1001:{acno:1001,uname:"Vyom",password:1001,balance:5000,transaction:[]},
    1002:{acno:1002,uname:"Laisha",password:1002,balance:5000,transaction:[]}
  }

  //register definition

 const register = (acno,password,uname)=>{

  
    if(acno in database){
      return {
        statusCode:422,
        status:false,
        message:"User already exist.... Please Log In"
      }
    }
    else{

      database[acno]={
        acno,
        uname,
        password,
        balance:0,
        transaction:[]
      }
      console.log(database)
     
      return {
        statusCode:200,
        status:true,
        message:"Successfully Registered!!!!"
      }
    }
  }


    //login definition
    const login = (acno,password)=>{
     
      if(acno in database){
          if(password == database[acno]["password"]){
          currentAcno = acno
            currentUname = database[acno]["uname"]

            //token generation
const token = jwt.sign({
  currentAcno:acno
},'supersecretkey123')

               return {
          statusCode:200,
          status:true,
          message:"Successfully log in!!!!",
          currentAcno,
          currentUname,
          token
        }
        }
        else{
                  return {
            statusCode:422,
            status:false,
            message:"Incorrect password"
          }
        }
      }
      else{
               return {
          statusCode:422,
          status:false,
          message:"User doesnot exist!!!!"
        }
      }
    }

    //deposit definition
  const deposit = (acno,password,amt)=>{
    var amount = parseInt(amt)
    if(acno in database){

      if(password == database[acno]["password"]){

        database[acno]["balance"]+=amount

        database[acno]["transaction"].push({
          amount:amount,
          type:"CREDIT"
        })
    return {
          statusCode:200,
          status:true,
          message:amount+" successfully deposited.. And new balance is "+  database[acno]["balance"]
        }      
      }
      else{
               return {
          statusCode:422,
          status:false,
          message:"Incorrect password"
        }
      }
    }
    else{
      return {
        statusCode:422,
        status:false,
        message:"User doesnot exist!!!!"
      }
    }
  }

  //withdraw definition

  const withdraw = (req,acno,password,amt)=>{

    var amount = parseInt(amt)

    var currentAcno = req.currentAcno
     if(acno in database){

      if(password == database[acno]["password"]){

        if(currentAcno == acno){
          if(database[acno]["balance"]>amount){

            database[acno]["balance"]-=amount
            database[acno]["transaction"].push({
              amount:amount,
              type:"DEBIT"
            })
            console.log(database)
           return {
            statusCode:200,
            status:true,
            message:amount+" successfully debited.. And new balance is "+  database[acno]["balance"]
          }  
  
          }
          else{
              return {
              statusCode:422,
              status:false,
              message:"Insufficient Balance"
            }
          }
        }
        else{
          return {
            statusCode:422,
            status:false,
            message:"Operation denied!!!"
          }
        }

     
       
      }
      else{
        return {
          statusCode:422,
          status:false,
          message:"Incorrect password"
        }
      }
    }
    else{
      return {
        statusCode:422,
        status:false,
        message:"User doesnot exist!!!!"
      }
    }
  }

  //transaction definition
  const getTransaction = (acno)=>{

    if(acno in database){
     return {
        statusCode:200,
        status:true,
       transaction : database[acno]["transaction"]
      }  
    }
    else{
      return {
        statusCode:422,
        status:false,
        message:"User doesnot exist!!!!"
      }
    }

  
  }

  module.exports={
    register,
    login,
    deposit,
    withdraw,
    getTransaction
  }
