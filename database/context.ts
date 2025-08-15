import { AsyncLocalStorage } from "node:async_hooks";
import type { Connection, Model } from "mongoose";

export const DatabaseContext = new AsyncLocalStorage<Connection>();

export function database() {
  const db = DatabaseContext.getStore();
  if (!db) throw new Error("DatabaseContext not set");
  return db;
}

export function getModel(name: string) {
  return database().model(name);
}
