import cloudinary from "../../cloudinary/cloudinaryConfig";
import { Photos } from "../entities/Photos";

export const upload_photo = async (req: any, res: any) => {
  const { userId, uuid, url } = req.body;

  try {
    const result = await Photos.insert({
      userId,
      uuid,
      url,
    });
    if (!result) {
      return res.status(401).json("Failed to post the image!");
    }
    return res.status(200).json("Photo uploaded successfully!")
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error. Please try again later." });
  }
};

export const fetch_entry_photos = async (req: any, res: any) => {
  const uuid = req.params.uuid;

  try {
    const result = await Photos.find({ where: { uuid: uuid } });
    if (result.length === 0) {
      return res.status(401).json("This entry has not photos!");
    }

    return res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error. Please try again later." });
  }
};

export const fetch_entry_thumbnail = async (req: any, res: any) => {
  const uuid = req.params.uuid;

  try {
    const result = await Photos.find({ where: { uuid: uuid } });
    if (result.length === 0) {
      return res.status(401).json("This entry has not photos!");
    }

    return res.json(result[0].url);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error. Please try again later." });
  }
};

export const delete_photo = async (req: any, res: any) => {
  const id = req.params.id;

  try {
    const photo = await Photos.findOne({ where: { id: id } });
    if (photo) {
      await Photos.delete(photo.id);
      await cloudinary.v2.uploader.destroy(photo.url);
    } else {
      return res.status(401).json("Could not find this photo!");
    }
  } catch (error) {
    return res
    .status(500)
    .json("Internal server error. Please try again later." );
  }
};
