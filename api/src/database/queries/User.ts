import { hash } from "bcryptjs";
import bcrypt from "bcryptjs";
import { Users } from "../entities/Users";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cloudinary from "../../cloudinary/cloudinaryConfig";

dotenv.config();

export const register = async (req: any, res: any) => {
  try {
    const { username, password, email, avatar, website } = req.body;

    // Checking if the chosen username is unique
    const existing_username = await Users.findOne({ where: { username } });
    // Checking if the chosen email address is unique
    const existing_email = await Users.findOne({ where: { email } });

    // If the username/email exists, deletes the avatar from cloudinary and returns an appropriate response
    if (existing_username) {
      await cloudinary.v2.uploader.destroy(avatar); 
      return res.status(401).json(
        "This username is taken. Please choose a different username."
      );
    }

    if (existing_email) {
      await cloudinary.v2.uploader.destroy(avatar);
      return res.status(401).json(
        "This email is already in use. If you already have an account, please log in."
      );
    }
    const hashed_password: any = (await hash(password, 12)).toString(); // Hashes the password for safety;

    await Users.insert({
      username,
      password: hashed_password,
      email,
      avatar,
      website,
    }).then(async () => {
      // If the registration is successful, the user will be logged in
      const newUser = await Users.findOne({ where: { username: username } });
      if(newUser){
        const secret = process.env.JWT_SECRET || "jwt_secret";
      const token = jwt.sign(
        {
          id: newUser.id,
          email: newUser.email,
        },
        secret,
        { expiresIn: "5h" }
      );

      return res.status(200).json({
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        website: newUser.website,
        avatar: newUser.avatar,
        token: token,
      });
      }
      else{
        return res.status(401).json("Something went wrong!")
      }
    });
  } catch (error) {
    return res
      .status(500)
      .json("Internal server error. Please try again later." );
  }
};

export const login = async (req: any, res: any) => {
  try {
    const { username, password } = req.body;

    const find_user = await Users.findOne({ where: { username } });

    if (!find_user) {
      return res.status(401).json("Incorrect username");
    }

    // Checks if the provided password and the one saved in a hashed form are matching
    bcrypt.compare(password, find_user.password, (error, data) => {
      if (error) {
        throw error;
      }
      if (data) {
        // Creates a token for the user that will expire in 5 hours;
        const secret = process.env.JWT_SECRET || "jwt_secret";
        const token = jwt.sign(
          {
            id: find_user.id,
            email: find_user.email,
          },
          secret,
          { expiresIn: "5h" }
        );

        return res.status(200).json({
          id: find_user.id,
          username: find_user.username,
          email: find_user.email,
          website: find_user.website,
          avatar: find_user.avatar,
          token: token,
        });
      }
      if (!data) {
        return res.status(401).json("Incorrect password!");
      }
    });
  } catch (error) {
    return res
      .status(500)
      .json("Internal server error. Please try again later.");
  }
};

export const fetch_username = async (req: any, res: any) => {
  const id = req.params.id;

  try {
    const user = await Users.findOne({ where: { id: id } });
    if (!user) {
      return res.json("Could not find this user!");
    }

    return res.json(user.username);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error. Please try again later." });
  }
};

export const get_user_by_username = async (req: any, res: any) => {
  const username = req.params.username;

  const response = await Users.findOne({ where: { username: username } });
  if (response === null) {
    return;
  }
  return res.json({
    id: response.id,
    username: response.username,
    avatar: response.avatar,
    website: response.website,
  });
};
