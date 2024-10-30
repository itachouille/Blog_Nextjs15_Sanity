import { type SchemaTypeDefinition } from "sanity";
import { author } from "./author";
import { post } from "./post";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, post],
};
