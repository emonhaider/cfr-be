export interface CFRItem {
  id: string;
  parentId: string | null;
  type: string;
  name?: string;
  attribs?: { [key: string]: string };
  children?: CFRItem[] | null | undefined;
  data?: string;
  ignore: boolean;
}
