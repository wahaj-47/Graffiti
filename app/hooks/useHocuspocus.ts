import { HocuspocusProvider } from "@hocuspocus/provider";
import { useState, useEffect } from "react";

type HocuspocusProviderProps = {
  path: string;
  name: string;
};

export function useHocuspocusProvider({ path, name }: HocuspocusProviderProps) {
  const [provider, setProvider] = useState<HocuspocusProvider>();

  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const host = window.location.host;
    const url = `${protocol}//${host}${path}`;

    const provider = new HocuspocusProvider({
      url,
      name,
    });

    setProvider(provider);

    return () => {
      provider.destroy();
    };
  }, [name, path]);

  return provider;
}
