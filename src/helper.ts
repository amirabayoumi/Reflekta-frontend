import slugify from "slugify";

export const slugit = (str: string) => slugify(str, { lower: true });
