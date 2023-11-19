import { join } from "path";
import { access, mkdir } from "fs/promises";

export const rootDir = process.cwd();

export const publicDir = join(rootDir, "public");
export const tmpDir = join(rootDir, "tmp");
export const avatarsDir = join(publicDir, "avatars");

const dirs = [publicDir, tmpDir, avatarsDir];

const isDirAccessible = async (dir) => {
  try {
    await access(dir);
    return true;
  } catch {
    return false;
  }
};

const createDirIsNotExist = async (dir) => {
  if (!(await isDirAccessible(dir))) {
    await mkdir(dir);
  }
};

export const createDirs = () => {
  for (const dir of dirs) {
    createDirIsNotExist(dir);
  }
};
