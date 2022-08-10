import { copy, copyFile } from "fs-extra";
import { resolve } from "path";

const copyLocales = async () => {
  const localesFolder = resolve(__dirname, "..", "client", "locales");
  const localesDest = resolve(__dirname, "..", "server", "locales");
  await copy(localesFolder, localesDest);
};

const copyLinguiConfig = async () => {
  const linguiFileName = "lingui.config.ts";
  const localeConfig = resolve(__dirname, "..", "client", linguiFileName);
  const localeConfigDest = resolve(__dirname, "..", "server", linguiFileName);
  await copyFile(localeConfig, localeConfigDest);
};

copyLocales();
copyLinguiConfig();
