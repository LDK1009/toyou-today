import { BlockType } from "./blockType";
import { PageAssetObjectType } from "./pageAssetType";

export type TemplateType = {
  id: string;
  name: string;
  pageAssets: PageAssetObjectType;
  blocks: BlockType[];
};
