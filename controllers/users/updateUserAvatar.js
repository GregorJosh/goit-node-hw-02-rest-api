import { join } from "path";
import { rename, unlink } from "fs/promises";
import Jimp from "jimp";

import User from "#models/user.js";
import { tmpDir, avatarsDir } from "#config/paths.js";

export const updateUserAvatar = async (request, response, next) => {
  const { user, file } = request;
  const { path, originalname } = file;

  try {
    const tmpPath = join(tmpDir, originalname);

    await rename(path, tmpPath);

    const avatar = await Jimp.read(tmpPath);
    avatar.resize(250, 250);

    const newname = `avatar-${user.id}.${avatar.getExtension()}`;
    const avatarUrl = "/avatars/" + newname;

    avatar.write(join(avatarsDir, newname));

    const { email } = await User.findByIdAndUpdate(user.id, {
      avatar: avatarUrl,
    });

    await unlink(tmpPath);

    return response.status(200).json({
      status: "Success",
      code: 200,
      message: "Avatar uploaded successful.",
      data: { email, avatar: avatarUrl },
    });
  } catch (error) {
    return next(error);
  }
};
