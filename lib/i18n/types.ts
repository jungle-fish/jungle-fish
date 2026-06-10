import type en from "./translations/en";

type DeepStringify<T> = T extends readonly (infer Item)[]
  ? readonly DeepStringify<Item>[]
  : T extends object
    ? { [Key in keyof T]: DeepStringify<T[Key]> }
    : string;

export type Locale = "en" | "es";

export type TranslationDictionary = DeepStringify<typeof en>;
