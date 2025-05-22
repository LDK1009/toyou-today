import { BlockType } from "./blockType";
import { PageAssetObjectType } from "./pageAssetType";

export type MakeTemplateType = {
  name: string;
  makerId: string;
  pageAssets: PageAssetObjectType;
  blocks: BlockType[];
  public: boolean;
}

export type TemplateType = {
  id: string;
  createdAt: string;
} & MakeTemplateType;

