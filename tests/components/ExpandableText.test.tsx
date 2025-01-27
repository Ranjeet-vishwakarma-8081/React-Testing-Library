import { render, screen } from "@testing-library/react";
import ExpandableText from "../../src/components/ExpandableText";
import userEvent from "@testing-library/user-event";
describe("ExpandableText", () => {
  const limit = 255;
  const longText = "a".repeat(limit + 1);
  const truncatedText = longText.substring(0, limit) + "...";

  it("should render the full text when it is less than the limit", () => {
    const shortText = "Hello Ranjeet";
    render(<ExpandableText text={shortText} />);

    const textElement = screen.getByText(shortText);
    expect(textElement).toBeInTheDocument();
  });

  it("should render the truncated text when it is longer than the limit", () => {
    render(<ExpandableText text={longText} />);

    const truncatedTextOnScreen = screen.getByText(truncatedText);
    expect(truncatedTextOnScreen).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent(/Show More/i);
  });

  it("should expand text when Show More Button is clicked", async () => {
    render(<ExpandableText text={longText} />);

    const button = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(button);

    expect(screen.getByText(longText)).toBeInTheDocument();
    expect(button).toHaveTextContent(/Show Less/i);
  });
  
  it("should collapse text when Show Less Button is clicked", async () => {
    render(<ExpandableText text={longText} />);
    const showMoreButton = screen.getByRole("button", { name: "Show More" });
    const user = userEvent.setup();
    await user.click(showMoreButton);

    const showLessButton = screen.getByRole("button", { name: "Show Less" });
    await user.click(showLessButton);

    expect(screen.getByText(truncatedText)).toBeInTheDocument();
    expect(showLessButton).toHaveTextContent(/Show More/i);
  });
});
