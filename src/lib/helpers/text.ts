export function getInitials(fullName?: string): string {
  if (fullName === undefined) return "?";

  const allNames = fullName.split(" ");

  const firstName = allNames.shift()!;
  const lastName = allNames.pop();
  const firstAndLast = [firstName];
  if (lastName) firstAndLast.push(lastName);

  return firstAndLast
    .map(n => n.codePointAt(0))
    .map(n => String.fromCodePoint(n!))
    .join("");
}
