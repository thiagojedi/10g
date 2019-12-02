export function getInitials(fullName?: string): string {
  if (fullName === undefined) return "?";

  const allNames = fullName.split(" ");

  const firstName = allNames.shift();
  const lastName = allNames.pop();

  return [firstName, lastName]
    .map(n => n && n.codePointAt(0))
    .map(n => n && String.fromCodePoint(n))
    .join("");
}
