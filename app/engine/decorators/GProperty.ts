import type { Listener } from "~/types";

export type GPropertySpecifiers<T, K extends keyof T> = {
  propertyKey: K;
  type: "number" | "color";
  label: string;
  get: () => T[K];
  set: (value: T[K]) => void;
};

export function GProperty<T, K extends keyof T>(
  options: Omit<GPropertySpecifiers<T, K>, "propertyKey" | "get" | "set">,
) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    if (!target.constructor.GProps) {
      target.constructor.GProps = [];
    }

    target.constructor.GProps.push({
      ...options,
      propertyKey: key,
      get: descriptor.get,
      set: descriptor.set,
    });
  };
}

export function getGProps<T extends { constructor: any }>(instance: T): GPropertySpecifiers<T, keyof T>[] {
  const GProps: GPropertySpecifiers<T, keyof T>[] = instance.constructor.GProps ?? [];

  return GProps.map((prop) => {
    return {
      ...prop,
      get: prop.get.bind(instance),
      set: prop.set.bind(instance),
    };
  });
}
