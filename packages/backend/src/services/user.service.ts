import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../entities/User.entity';
import { IUser, ICreateUser } from '../types/user.type';

export default class UserService {
  async findAll() {
    const users = await User.find();
    return users;
  }

  async findOne(params: object) {
    const user = await User.findOneBy(params);
    return user;
  }

  async createUser(user: ICreateUser) {
    const newUser = await User.create(user);
    await newUser.save();
    return newUser;
  }

  async updateUser(id: string, body: IUser) {
    const user = await User.findOneBy({ id });
    const updatedUser = await User.save({
      ...user,
      ...body
    });
    return updatedUser;
  }

  async generateToken(payload: object) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION
    });
  }

  async verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async comparePasswords(password: string, passwordHash: string) {
    const isValidPass = await bcrypt.compare(password, passwordHash);

    if (!isValidPass) {
      return false;
    }

    return true;
  }
}
