import user from '../models/user.js';
import bcrypt from 'bcrypt';
import validator from 'validator';


export const addUser= async(req, res) => {
  const Email = req.body.Email;
  const Username = req.body.Username;
  const homeAddress =req.body.homeAddress;
  const coutryCode =req.body.coutryCode;
  const passportNumber =req.body.passportNumber;
  const Password =req.body.Password;
  const passHashed = bcrypt.hashSync(Password, 10); //password after being hashed
  const Type =req.body.Type;
  const firstName =req.body.firstName;
  const lastName =req.body.lastName;
  const dateOfBirth = Date(req.body.dateOfBirth);
  const flightNumbers =req.body.flightNumbers;


  const newUser = new user({
    Email:Email,
    Username:Username,
    homeAddress:homeAddress,
    coutryCode:coutryCode,
    passportNumber:passportNumber,
    Password:passHashed, //adds the hashed password not plain text
    Type:Type,
    firstName:firstName,
    lastName:lastName,
    dateOfBirth:dateOfBirth,
    flightNumbers:flightNumbers
  });
  if(!validator.isEmail(Email)){
    res.status(400).json('Error: Invalid Email');
    return;
  }

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
};
export const updateUser= async(req, res) => {
   
    user.findById(req.body._id)

    .then(user => {
        
        if(!user){
            res.status(400).json('Please enter a user' );}
        else
        if(user==null){
            res.status(404).json('User not found ' );
        }
        else{
            var keys = [];
            

            for (var key in req.body) { 
                keys.push(key)}
           
            
           for (let i = 0; i < keys.length; i++) {
            if(keys[i] == "Email"){
                user.Email = req.body.Email;
            };
            if(keys[i] == "Username"){
                user.Username = req.body.Username;
            };
            if(keys[i] == "homeAddress"){
                user.homeAddress = req.body.homeAddress;
            };
            if(keys[i] == "coutryCode"){
                user.coutryCode = req.body.coutryCode;
            };
            if(keys[i] == "passportNumber"){
                user.passportNumber = req.body.passportNumber;
            };
            if(keys[i] == "Password"){
                user.Password = bcrypt.hashSync(req.body.Password, 10); //updates with the encrypted pass not plain text
            };
            if(keys[i] == "Type"){
                user.Type = req.body.Type;
            };
            if(keys[i] == "firstName"){
                user.firstName = req.body.firstName;
            };
            if(keys[i] == "lastName"){
               user.lastName = req.body.lastName;
            };
            if(keys[i] == "dateOfBirth"){
                user.dateOfBirth = Date.parse(req.body.dateOfBirth);
            }
            if(keys[i] == "flightNumbers"){
                user.flightNumbers = req.body.flightNumbers;
            }
        }
        user.save()
        
        .then(() => {
           
            var updatedVlues="";
            
            for (var key in req.body) { 
                updatedVlues+=key + ", ";
            }
            updatedVlues = updatedVlues.slice(0, -2) + ".";
            updatedVlues = updatedVlues.slice(4);
            res.status(200).json("updated values: " + updatedVlues)
         
            })

            
        .catch(err => res.status(400).json('Error: ' + err));
    }
    
      })
      .catch(err => res.status(400).json('Error: ' + err));;
};

export const getUser =  async(req, res) => { 
    const test = await user.find()
      res.status(200).send(test);
};

export const deleteUser = async(req, res) =>{
    if (req.body._id){
    user.findByIdAndRemove(req.body._id)
    .catch((err) => res.status(400).json("Invalid User!"))
    .then(() => res.json('User Removed!'))
    }
    else{
        res.status(400).json("Invalid Input!");
    }
};

export const searchUsers = async (req, res) => {
    if (req.body.Email || req.body.Username || req.body.homeAddress|| req.body.countryCode || req.body.passportNumber || req.body.Password || req.body.Type || req.body.firstName || req.body.lastName || req.body.dateOfBirth ||req.body.flightNumbers || req.body._id) {
        if(req.body.Email){
            req.body.Email=req.body.Email.toUpperCase();
            req.body.Email= {'$regex' :  req.body.Email, '$options' : 'i'};
        }
          if(req.body.Username){
            req.body.Username=req.body.Username.toUpperCase();
            req.body.Username= {'$regex' :  req.body.Username, '$options' : 'i'};
          }
          if(req.body.homeAddress){
            req.body.homeAddress=req.body.homeAddress.toUpperCase();
            req.body.homeAddress= {'$regex' :  req.body.homeAddress, '$options' : 'i'};
          }
          if(req.body.countryCode){
            req.body.countryCode=req.body.countryCode.toUpperCase();
            req.body.countryCode= {'$regex' :  req.body.countryCode, '$options' : 'i'};
          }
          if(req.body.passportNumber){
            req.body.passportNumber=req.body.passportNumber.toUpperCase();
            req.body.passportNumber= {'$regex' :  req.body.passportNumber, '$options' : 'i'};
          }
          if(req.body.homeAddress){
            req.body.homeAddress=req.body.homeAddress.toUpperCase();
            req.body.homeAddress= {'$regex' :  req.body.homeAddress, '$options' : 'i'};
          }
          if(req.body.Password){
            req.body.Password=req.body.Password.toUpperCase();
            req.body.Password= {'$regex' :  req.body.Password, '$options' : 'i'};
          }
          if(req.body.Type){
            req.body.Type=req.body.Type.toUpperCase();
            req.body.Type= {'$regex' :  req.body.Type, '$options' : 'i'};
          }
          if(req.body.firstName){
            req.body.firstName=req.body.firstName.toUpperCase();
            req.body.firstName= {'$regex' :  req.body.firstName, '$options' : 'i'};
          }
          if(req.body.lastName){
            req.body.lastName=req.body.lastName.toUpperCase();
            req.body.lastName= {'$regex' :  req.body.lastName, '$options' : 'i'};
          }
          if(req.body.dateOfBirth){
            req.body.dateOfBirth=req.body.dateOfBirth.toUpperCase();
            req.body.dateOfBirth= {'$regex' :  req.body.dateOfBirth, '$options' : 'i'};
          }
          if(req.body.flightNumbers){
            req.body.flightNumbers=req.body.flightNumbers.toUpperCase();
            req.body.flightNumbers= {'$regex' :  req.body.flightNumbers, '$options' : 'i'};
          }
          if(req.body._id){
            req.body._id=req.body._id.toUpperCase();
            req.body._id= {'$regex' :  req.body._id, '$options' : 'i'};
          }
        const filteredUsers = await user
        .find(req.body)
        .catch((err) => res.status(404).send("No Users found"));
      if (filteredUsers.length === 0) {
        res.status(404).send("No Users found");
      }
      res.status(200).send(filteredUsers);
    }else{
      res.status(400).json("Invalid Input!");
    }
  };