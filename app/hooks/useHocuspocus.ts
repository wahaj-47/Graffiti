import { HocuspocusProvider } from "@hocuspocus/provider";
import { useEffect, useRef } from "react";

type HocuspocusProviderProps = {
  path: string;
  name: string;
};

export function useHocuspocusProvider({ path, name }: HocuspocusProviderProps) {
  const providerRef = useRef<HocuspocusProvider | null>(null);

  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const host = window.location.host;
    const url = `${protocol}//${host}${path}`;

    const provider = new HocuspocusProvider({
      url,
      name,
    });

    providerRef.current = provider;

    return () => {
      provider.destroy();
      providerRef.current = null;
    };
  }, [name, path]);

  return providerRef.current;
}
