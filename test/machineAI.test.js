import { assert, test, expect } from "vitest";
import { computerSelection, genRandNum3 } from "../src/lib/machineAI";
import { easyModeOptions } from "../src/lib/Judge";

test("random number between 0 and 2", () => {
  let rnd_number = genRandNum3();
  expect(rnd_number).toBeGreaterThanOrEqual(0);
  expect(rnd_number).toBeLessThanOrEqual(2);
});

test("random choice, options: [rock, paper,scissors]", () => {
  const choice = computerSelection();

  assert.propertyVal(easyModeOptions, choice.description, choice);
});
