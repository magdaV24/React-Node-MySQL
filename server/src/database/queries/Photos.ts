import { Photos } from "../entities/Photos";

export const upload_photo = async (req: any, res: any) => {
  const userId = req.body.userId;
  const artWorkTitle = req.body.artWorkTitle;
  const url = req.boy.url;

  await Photos.insert({
    userId,
    artWorkTitle,
    url,
  })
    .then(() => res.json("Success!"))
    .catch((err) => {
      throw new Error(`Error: ${err}`);
    });
};
