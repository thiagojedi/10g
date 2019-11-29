export function toInitials(fullName?: string): string {
  if (fullName === undefined) return "?";

  const allNames = fullName.split(" ");
  if (allNames.length === 1) return fullName[0];

  return [allNames[0], allNames[allNames.length - 1]]
    .map(name => name.charAt(0))
    .join("");
}
