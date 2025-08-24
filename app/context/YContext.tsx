import { HocuspocusProvider } from "@hocuspocus/provider";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { Array, type AbstractType, type Doc, type Map } from "yjs";

type ObserverKind = "deep" | "shallow" | "none";

type YContextType = {
  doc: Doc;
  provider: HocuspocusProvider;
};

type YProviderType = {
  path: string;
  name: string;
};

type YProviderProps = PropsWithChildren<YProviderType>;

const YContext = createContext<YContextType | null>(null);

export function YProvider({ name, path, children }: YProviderProps) {
  const [context, setContext] = useState<YContextType | null>(null);

  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const host = window.location.host;
    const url = `${protocol}//${host}${path}`;

    const provider = new HocuspocusProvider({
      url,
      name,
    });

    setContext({
      provider: provider,
      doc: provider.document,
    });

    return () => {
      provider.destroy();
    };
  }, [name, path]);

  return <YContext.Provider value={context}>{children}</YContext.Provider>;
}

export function useYProvider(): HocuspocusProvider {
  const context = useContext(YContext);
  if (!context) {
    throw new Error(
      "Hocuspocus hooks must be used within a HocuspocusProvider"
    );
  }
  return context.provider;
}

export function useYDoc(): Doc {
  const context = useContext(YContext);
  if (!context) {
    throw new Error(
      "Hocuspocus hooks must be used within a HocuspocusProvider"
    );
  }
  return context.doc;
}

export function useYArray<T>(
  name: string,
  kind: ObserverKind = "deep"
): Array<T> {
  const doc = useYDoc();
  const array = useMemo(() => doc.getArray<T>(name), [doc, name]);
  useObserve(array, kind);
  return array;
}

export function useYMap<T>(name: string, kind: ObserverKind = "deep"): Map<T> {
  const doc = useYDoc();
  const map = useMemo(() => doc.getMap<T>(name), [doc, name]);
  useObserve(map, kind);
  return map;
}

export function useObserve(
  object: AbstractType<any>,
  kind: ObserverKind = "deep"
) {
  const redraw = useRedraw();

  useEffect(() => {
    switch (kind) {
      case "deep":
        object.observeDeep(redraw);
        break;
      case "shallow":
        object.observe(redraw);
      default:
        break;
    }

    return () => {
      switch (kind) {
        case "deep":
          object.unobserveDeep(redraw);
          break;
        case "shallow":
          object.unobserve(redraw);
        default:
          break;
      }
    };
  });
}

function useRedraw() {
  const [count, setCount] = useState(0);
  return useCallback(() => setCount((prevCount) => prevCount + 1), [setCount]);
}
