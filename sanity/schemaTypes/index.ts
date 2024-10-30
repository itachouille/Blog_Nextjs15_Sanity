import { type SchemaTypeDefinition } from "sanity";
import { author } from "./author";
import { post } from "./post";
import { playlist } from "./playlist";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, post, playlist],
};
