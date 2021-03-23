import { Db } from "mongodb";

export type GraphQLContext = () => { db: Db };

export type ManifestFile = {
  path: string;
  filePath: string;
};

export type PushManifest = {
  seperator: string;
  initial: ManifestFile[];
  fonts: {
    [key: string]: ManifestFile;
  };
  images: {
    [key: string]: ManifestFile;
  };
};
