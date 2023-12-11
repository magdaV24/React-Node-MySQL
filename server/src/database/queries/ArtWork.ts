import { ArtWorks, Visible } from "../entities/ArtWorks";

export const create_entry = async (req: any, res: any) => {
  const userId = req.body.userId;
  const title = req.body.title;
  const description = req.body.description;
  const visible = req.body.visible;

  await ArtWorks.insert({
    title,
    userId,
    description,
    visible,
  })
    .then(() => res.json("Success!"))
    .catch((err) => console.log(err));
};

export const fetch_works_by_creator = async (req: any, res: any) => {
  const userId = req.body.userId;

  const response = await ArtWorks.find({ where: { userId } });
  if (response.length === 0) {
    return;
  }

  return res.json(response);
};

export const edit_entry = async (req: any, res: any) => {
  const id = req.body.id;

  const newPhoto = req.body.newPhoto;
  const newTitle = req.body.newTitle;
  const newDescription = req.body.newDescription;
  const newVisible = req.body.newVisible;

  const response = await ArtWorks.findOne({ where: { id } });
  if (!response) {
    return;
  }

  response.title = newTitle;
  response.description = newDescription;
  response.visible = newVisible;

  return ArtWorks.save(response);
};

export const delete_entry = async (req: any, res: any) => {
  const id = req.body.id;
  const entry = await ArtWorks.findOne({ where: { id } });
  if (entry) {
    await ArtWorks.delete(entry.id);
  }
  return res.json();
};

export const fetch_if_public = async (req: any, res: any) => {
  const entries = await ArtWorks.find({ where: { visible: Visible.Public } });

  if (entries.length === 0) {
    return;
  }

  return res.json(entries);
};

export const fetch_user_public_works = async (req: any, res: any) => {
  const userId = req.body.userID;
  const entries = await ArtWorks.find({
    where: { visible: Visible.Public, userId },
  });

  if (entries.length === 0) {
    return;
  }

  return res.json(entries);
};

