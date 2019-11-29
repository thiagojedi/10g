import { toInitials } from "./text";

test("toInitials", function() {
  expect(toInitials()).toBe("?");
  expect(toInitials("Ana")).toBe("A");
  expect(toInitials("Mr Smith")).toBe("MS");
  expect(toInitials("Samuel L Jackson")).toBe("SJ");
});
