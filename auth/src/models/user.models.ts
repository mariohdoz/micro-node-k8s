import mongoose from "mongoose";
import { Password } from "../services/index.services";

/** 
 * Interfaz que describe las propiedades del modelo
 * Que son requeridas para la creación de un usuario
 */
interface UserAttrs {
  email: string;
  password: string;
  name: string;
}

/**
 * Intefaz que describe la propiedad
 * que el modelo de usuario tiene
 */
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

/**
 * Interfaz que describe las propiedades 
 * Que un documento de ususario tiene
 */
interface UserDoc extends mongoose.Document {
  email: string;
  password: string; 
  name: string;
}

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      transform(doc, ret){
        delete ret.password;
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

userSchema.pre('save', async function (this: UserDoc, next: any) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  next();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
