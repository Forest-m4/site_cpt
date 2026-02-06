export function safeUpdate<T extends Record<string, unknown>>(
  data: Partial<T>,
): Partial<T> {
  return Object.fromEntries(
    Object.entries(data).filter(([, v]) => v !== undefined),
  ) as Partial<T>;
}
