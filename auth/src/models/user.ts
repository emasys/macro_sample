import mongoose from 'mongoose';
import { UserService } from '../services/user';

interface UserAttributes {
  email: string;
  password: string;
}
interface UserModel extends mongoose.Model<UserDoc> {
  build(attributes: UserAttributes): UserDoc;
}
export interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
},
{
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id
      delete ret.password;
      delete ret.__v;
      delete ret._id; 
    }
  }
});

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashedPassword = await UserService.toHash(this.get('password'));
    this.set('password', hashedPassword);
  }
  done();
})
userSchema.statics.build = (attributes: UserAttributes) => new User(attributes);

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
