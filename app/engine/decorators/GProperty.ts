type GPropertySpecifiers = {
  type: "number" | "color";
  label: string;
};

export function GProperty(options: GPropertySpecifiers) {
  return function (target: any, key: string) {
    if (!target.constructor.GProps) {
      target.constructor.GProps = {};
    }

    target.constructor.GProps[key] = options;
  };
}

export function getGProps<T extends { constructor: any }>(instance: T): Record<string, GPropertySpecifiers> {
  return instance.constructor.GProps ?? null;
}
