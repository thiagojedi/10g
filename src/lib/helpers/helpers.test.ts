import { getInitials, groupMessagesByUsername } from "./text";
import { insertAtIndex } from "./collections";

test("getInitials", () => {
  expect(getInitials()).toBe("?");
  expect(getInitials("Morpheus")).toBe("M");
  expect(getInitials("Agent Smith")).toBe("AS");
  expect(getInitials("Thomas A. Anderson")).toBe("TA");
  expect(getInitials("🐇")).toBe("🐇");
  expect(getInitials("White 🐇")).toBe("W🐇");
  expect(getInitials("The 1")).toBe("T1");
});

test("groupMessagesByUsername", () => {
  expect(groupMessagesByUsername([])).toHaveLength(0);
  const singleMessage = [{ username: "neo", content: "message" }];
  expect(groupMessagesByUsername(singleMessage)).toStrictEqual([
    { username: "neo", content: ["message"] },
  ]);

  const doubleMessage = [
    { username: "neo", content: "message1" },
    { username: "neo", content: "message2" },
  ];
  expect(groupMessagesByUsername(doubleMessage)).toStrictEqual([
    { username: "neo", content: ["message1", "message2"] },
  ]);

  const tripleMessage = [
    { username: "neo", content: "message1" },
    { username: "neo", content: "message2" },
    { username: "neo", content: "message3" },
  ];
  expect(groupMessagesByUsername(tripleMessage)).toStrictEqual([
    { username: "neo", content: ["message1", "message2", "message3"] },
  ]);

  const singleDialogue = [
    { username: "neo", content: "message1" },
    { username: "morpheus", content: "message2" },
  ];
  expect(groupMessagesByUsername(singleDialogue)).toStrictEqual([
    {
      username: "neo",
      content: ["message1"],
    },
    {
      username: "morpheus",
      content: ["message2"],
    },
  ]);

  const doubleDialogue = [
    { username: "neo", content: "message1" },
    { username: "neo", content: "message2" },
    { username: "morpheus", content: "message1" },
    { username: "morpheus", content: "message2" },
  ];
  expect(groupMessagesByUsername(doubleDialogue)).toStrictEqual([
    {
      username: "neo",
      content: ["message1", "message2"],
    },
    {
      username: "morpheus",
      content: ["message1", "message2"],
    },
  ]);

  const complexDialogue = [
    { username: "neo", content: "message1" },
    { username: "neo", content: "message2" },
    { username: "morpheus", content: "message1" },
    { username: "neo", content: "message3" },
    { username: "morpheus", content: "message5" },
    { username: "morpheus", content: "message6" },
  ];
  expect(groupMessagesByUsername(complexDialogue)).toStrictEqual([
    {
      username: "neo",
      content: ["message1", "message2"],
    },
    {
      username: "morpheus",
      content: ["message1"],
    },
    {
      username: "neo",
      content: ["message3"],
    },
    {
      username: "morpheus",
      content: ["message5", "message6"],
    },
  ]);
});

test("insertAtIndex", () => {
  expect(insertAtIndex([], 0, 0)).toStrictEqual([0]);
  expect(insertAtIndex([], 1, 0)).toStrictEqual([0]);

  expect(insertAtIndex([0, 1], 1, 2)).toStrictEqual([0, 2, 1]);

  expect(insertAtIndex([0, 1], 243, 2)).toStrictEqual([0, 1, 2]);

  expect(insertAtIndex([0, 1], 0, 2)).toStrictEqual([2, 0, 1]);
});
