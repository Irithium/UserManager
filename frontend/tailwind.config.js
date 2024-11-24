/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";

module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      scrollbar: {
        thumb: {
          rounded: "full",
        },
        track: {
          rounded: "full",
        },
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },

      colors: {
        vermilion: {
          DEFAULT: "#ff3532",
          100: "#3d0100",
          200: "#7a0200",
          300: "#b80300",
          400: "#f50400",
          500: "#ff3532",
          600: "#ff5f5c",
          700: "#ff8785",
          800: "#ffafad",
          900: "#ffd7d6",
        },
        dim_gray: {
          DEFAULT: "#637074",
          100: "#141617",
          200: "#272d2e",
          300: "#3b4345",
          400: "#4f595d",
          500: "#637074",
          600: "#7f8e92",
          700: "#9faaad",
          800: "#bfc6c9",
          900: "#dfe3e4",
        },
        french_gray: {
          DEFAULT: "#cdd4e0",
          100: "#212835",
          200: "#425069",
          300: "#63799e",
          400: "#98a6bf",
          500: "#cdd4e0",
          600: "#d7dce6",
          700: "#e1e5ec",
          800: "#ebeef2",
          900: "#f5f6f9",
        },
        black: {
          DEFAULT: "#070707",
          100: "#020202",
          200: "#030303",
          300: "#050505",
          400: "#060606",
          500: "#070707",
          600: "#393939",
          700: "#6b6b6b",
          800: "#9c9c9c",
          900: "#cecece",
        },
        peach: {
          DEFAULT: "#ffe3b2",
          100: "#573700",
          200: "#ad6e00",
          300: "#ffa305",
          400: "#ffc35c",
          500: "#ffe3b2",
          600: "#ffe9c2",
          700: "#ffeed1",
          800: "#fff4e0",
          900: "#fff9f0",
        },
      },
    },
    colors: {
      ...colors,
    },
  },
  plugins: [
    require("tailwind-scrollbar")({
      nocompatible: true,
      preferredStrategy: "pseudoelements",
    }),
  ],
};
