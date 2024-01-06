import cloudinary from "../../cloudinary/cloudinaryConfig";
import { Entries, Visible } from "../entities/Entries";
import { Photos } from "../entities/Photos";

export const create_entry = async (req: any, res: any) => {
  try {
    const userId = req.body.userId;
    const title = req.body.title;
    const description = req.body.description;
    const uuid = req.body.uuid;
    let visible;
    req.body.visible === true
      ? (visible = Visible.Public)
      : (visible = Visible.Private);

    const check = await Entries.findOne({ where: { title: title } });
    if (check !== null) {
      const photos = await Photos.find({ where: { uuid: uuid } });
      if (photos.length > 0) {
        photos.forEach(async (photo) => {
          await cloudinary.v2.uploader.destroy(photo.url);
        });
      }
      return res
        .status(401)
        .json("This title is already taken! Choose another one!");
    }
    await Entries.insert({
      title,
      userId,
      uuid,
      description,
      visible,
    });
    return res.status(200).json("Entry submitted successfully!");
  } catch (error) {
    return res
      .status(500)
      .json("Internal server error. Please try again later.");
  }
};

export const fetch_entry = async (req: any, res: any) => {
  const id = req.params.id;

  try {
    const entry = await Entries.findOne({ where: { id: id } });
    if (!entry) {
      return res.status(401).json("Could not find an entry with this id!");
    }
    return res.json(entry);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error. Please try again later." });
  }
};

export const fetch_user_entries = async (req: any, res: any) => {
  const id = req.params.id;

  try {
    const entries = await Entries.find({ where: { userId: id } });
    if (entries.length === 0) {
      return;
    }
    return res.json(entries);
  } catch (error) {
    return res
      .status(500)
      .json("Internal server error. Please try again later.");
  }
};

export const edit_entry_fields = async (req: any, res: any) => {
  try {
    const id = req.params.id;
    const { title, description, visible } = req.body;
    let newVisible;

    if (visible === true) {
      newVisible = Visible.Public;
    } else {
      newVisible = Visible.Private;
    }

    const entry = await Entries.findOne({ where: { id: id } });
    if (entry === null) {
      return res.status(401).json("Could not find this entry!");
    }
    const check_title = await Entries.findOne({ where: { title: title } });
    if (check_title !== null && check_title.title !== entry.title) {
      return res
        .status(401)
        .json("The title should be unique! Please choose another one!");
    }
    entry.title = title;
    entry.description = description;
    entry.visible = newVisible;
    Entries.save(entry);
    return res.status(200).json("Entry edited successfully!");
  } catch (error) {
    return res
      .status(500)
      .json("Internal server error. Please try again later.");
  }
};

export const delete_entry = async (req: any, res: any) => {
  const uuid = req.params.uuid;
  try {
    const entry = await Entries.findOne({ where: { uuid: uuid } });
    const photos = await Photos.find({where: { uuid: uuid}});
    if (entry) {
      await Entries.delete(entry.id);
      if(photos.length > 0){
        photos.forEach(async(photo) => {
          await Photos.delete(photo.id)
          await cloudinary.v2.uploader.destroy(photo.url);
        })
      }
    }
    return res.status(200).json("Entry deleted successfully!");
  } catch (error) {
    return res
      .status(500)
      .json("Internal server error. Please try again later.");
  }
};

export const fetch_if_public = async (req: any, res: any) => {
  const entries = await Entries.find({ where: { visible: Visible.Public } });

  try {
    if (entries.length === 0) {
      return;
    }
    return res.json(entries);
  } catch (error) {
    return res
      .status(500)
      .json("Internal server error. Please try again later.");
  }
};

export const fetch_user_public_entries = async (req: any, res: any) => {
  const id = req.params.id;
  try {
    const entries = await Entries.find({
      where: { visible: Visible.Public, userId: id },
    });

    if (entries.length === 0) {
      return;
    }

    return res.status(200).json(entries);
  } catch (error) {
    return res
      .status(500)
      .json("Internal server error. Please try again later.");
  }
};
