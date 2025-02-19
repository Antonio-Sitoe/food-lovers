export function removeProperty<T extends object, K extends keyof T>(
  obj: T,
  properties: K | K[]
): Omit<T, K> {
  let result = { ...obj } as Omit<T, K>

  if (Array.isArray(properties)) {
    for (const property of properties) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [property]: _, ...rest } = result
      result = rest as Omit<T, K>
    }
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [properties]: _, ...rest } = result
    result = rest as Omit<T, K>
  }

  return result as Omit<T, K>
}
