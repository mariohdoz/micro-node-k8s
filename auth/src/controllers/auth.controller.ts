import { Request, Response } from 'express';
import { User } from "../models/index.models";
import { BadRequestError } from "../errors/index.errors";
import { generateToken } from "../helpers/jwt.helpers";

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
    throw new BadRequestError("El correo ya se encuentra registrado");
  }

  const user = User.build({
    email, 
    password,
    name
  });

  await user.save();

  const token =  generateToken({email: email, id: user._id});

  req.session = {
    jwt: token 
  };

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