import { BlockType } from "./blockType";
import { PageAssetType } from "./pageAssetType";

export type TemplateType = {
  id: string;
  name: string;
  pageAssets: PageAssetType;
  blocks: BlockType[];
};
