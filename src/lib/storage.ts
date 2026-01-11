const safeParse = (raw: string | null): string[] => {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed) && parsed.every((x) => typeof x === "string")) {
      return parsed;
    }
    return [];
  } catch {
    return [];
  }
};

export function getIdSet(key: string): Set<string> {
  if (typeof window === "undefined") return new Set();
  return new Set(safeParse(window.localStorage.getItem(key)));
}

export function setIdSet(key: string, ids: Set<string>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(Array.from(ids)));
}

export function toggleIdInSet(key: string, id: string): boolean {
  const ids = getIdSet(key);
  if (ids.has(id)) {
    ids.delete(id);
    setIdSet(key, ids);
    return false;
  }
  ids.add(id);
  setIdSet(key, ids);
  return true;
}

