import { Request, Response } from 'express';
import { User } from "../models/index.models";

const getCurrentUser = (req: Request, res: Response) => {
  res.send('hi there!');
}

const postsignIn = (req: Request, res: Response) => {
  res.send('hi there!!');
}

const postsignOut = (req: Request, res: Response) => {
  res.send('hi there!!!');
}

 const postsignUp = async(req: Request, res: Response) => {
  
  const {email, password, name} = req.body;

  const existingUser = await User.findOne({email});

  if(existingUser){
    console.log(`Email ${email} ya se encuentra registrado`);
    return res.status(403).send({});    
  }

  const user = User.build({
    email, 
    password,
    name
  });

  await user.save();

  res.status(201).send({
    message: 'Usuario creado existosamente',
    user
  })
}

export {
  getCurrentUser,
  postsignIn,
  postsignOut,
  postsignUp
}