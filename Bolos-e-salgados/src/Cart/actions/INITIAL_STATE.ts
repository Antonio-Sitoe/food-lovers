import { ICartContent } from "../types/Types";

export function INITIAL_STATE(content:ICartContent) {
  const update = { ...content };
  return update;
}
