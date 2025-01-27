export function omitObjectField<
  O extends Record<string, unknown>,
  F extends string,
>(objectToOmit: O, fieldName: F): Omit<O, F> {
  const newObjectToOmit = JSON.parse(JSON.stringify(objectToOmit)) as O;

  if (newObjectToOmit[fieldName])
    (newObjectToOmit as Record<string, unknown>)[fieldName] = undefined;

  return Object.fromEntries(
    Object.entries(newObjectToOmit).filter((v) => v[1]),
  ) as Omit<O, F>;
}
