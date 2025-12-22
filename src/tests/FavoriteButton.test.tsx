import { render, screen, fireEvent } from "@testing-library/react";
import FavoriteButton from "../components/FavoriteButton";
import { AppContext } from "../context/AppContext";

describe("FavoriteButton", () => {
  const toggleFavoriteMock = jest.fn();

  const renderWithContext = (favorites: string[] = []) => {
    render(
      <AppContext.Provider value={{ favorites, toggleFavorite: toggleFavoriteMock }}>
        <FavoriteButton name="TestItem" />
      </AppContext.Provider>
    );
  };

  beforeEach(() => {
    toggleFavoriteMock.mockClear();
  });

  test("renders 'Add Favourite' when item is not in favorites", () => {
    renderWithContext([]);
    const button = screen.getByRole("button", { name: /add favourite/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle({ background: "gray" });
  });

  test("renders 'Remove Favourite' when item is in favorites", () => {
    renderWithContext(["TestItem"]);
    const button = screen.getByRole("button", { name: /remove favourite/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle({ background: "red" });
  });

  test("calls toggleFavorite on click", () => {
    renderWithContext([]);
    const button = screen.getByRole("button", { name: /add favourite/i });
    fireEvent.click(button);
    expect(toggleFavoriteMock).toHaveBeenCalledWith("TestItem");
  });
});