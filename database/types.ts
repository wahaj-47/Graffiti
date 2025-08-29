interface Service<T> {
  create: (data: Omit<T, "_id">) => Promise<T>;
  read: (id: string) => Promise<T | null>;
  update: (id: string, data: Partial<T>) => Promise<T | null>;
  delete: (id: string) => Promise<T | null>;
}
