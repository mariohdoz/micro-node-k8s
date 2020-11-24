import mongoose from "mongoose";

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
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };