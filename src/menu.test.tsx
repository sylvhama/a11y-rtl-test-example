import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

import Menu from "./demo";

test("Menu keyboard interaction", async () => {
  render(<Menu />);
  const button = screen.getByRole("button", { name: "Dashboard" });

  expect(button).toHaveAttribute("aria-expanded", "false");

  await userEvent.keyboard("{tab}");
  await userEvent.keyboard("{enter}");

  expect(button).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByRole("menuitem", { name: "Profile" })).toHaveFocus();

  await userEvent.keyboard("{arrowdown}");

  expect(screen.getByRole("menuitem", { name: "My account" })).toHaveFocus();

  await userEvent.keyboard("{Escape}");

  expect(button).toHaveFocus();
  expect(button).toHaveAttribute("aria-expanded", "false");
});
