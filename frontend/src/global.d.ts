interface ObjectConstructor {
  fromEntries<T>(entries: Iterable<[PropertyKey, T]>): { [key: string]: T };
}