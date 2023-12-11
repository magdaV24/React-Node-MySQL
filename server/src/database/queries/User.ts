import { hash } from "bcryptjs";
import bcrypt from "bcryptjs";
import { Users } from "../entities/Users";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req: any, res: any) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const avatar = req.body.avatar;
  const website = req.body.website;

  const existing_username = await Users.findOne({ where: { username } });
  const existing_email = await Users.findOne({ where: { email } });

  if (existing_username) {
    return res.json("This username is taken!");
  }

  if (existing_email) {
    return res.json("This email is in use!");
  }
  const hashed_password: any = (await hash(password, 12)).toString();

  await Users.insert({
    username,
    password: hashed_password,
    email,
    avatar,
    website,
  })
    .then(() => console.log("success"))
    .catch((err) => console.log(err));

  return res.json("Account created successfully!");
};

export const login = async (req: any, res: any) => {
  const username = req.body.username;
  const password = req.body.password;

  const find_user = await Users.findOne({ where: { username } });

  if (!find_user) {
    throw new Error("User not found!");
  }

  const check_password = bcrypt.compare(password, find_user.password);

  if (!check_password) {
    throw new Error("Incorrect password!");
  }

  const secret = process.env.JWT_SECRET || "jwt_secret";
  const token = jwt.sign(
    {
      id: find_user.id,
      email: find_user.email,
    },
    secret,
    { expiresIn: "1h" }
  );

  return res.json({
    username: find_user.username,
    email: find_user.email,
    website: find_user.website,
    avatar: find_user.avatar,
    token: token,
  });
};

export const get_user_by_username = async (req: any, res: any) => {
  const username = req.body.user;

  const response = await Users.findOne({ where: { username } });
  if (response === null) {
    return;
  }

  return res.json(response);
};
