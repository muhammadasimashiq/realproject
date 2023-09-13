const main = "#251038";
const second = "#E015A2";

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "dark" && {
      primary: {
        main: second,
      },
    }),
    ...(mode === "light" && {
      primary: {
        main: main,
      },
    }),
  },
});
