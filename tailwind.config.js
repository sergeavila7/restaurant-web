/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      colors: {
        "light-gray": {
          100: "#EAECF2",
          200: "#DCE0EA",
          300: "#C0C7D9",
          400: "#A5AEC8",
          500: "#8996B8",
          600: "#7483AB",
        },
        "ghost-blue": {
          50: "#f5f9fc",
          100: "#FCFCFF",
          200: "#F9F9FF",
          300: "#F5F5FF",
          400: "#F1F1FF",
          500: "#ECECFF",
          600: "#E9E9FF",
        },
        blue: {
          100: "#E1E6FF",
          200: "#CED6FF",
          300: "#A6B5FF",
          400: "#7F94FF",
          500: "#5873FF",
          600: "#3A5AFF",
        },
        magenta: {
          100: "#FDD9E9",
          200: "#FCBFDB",
          300: "#F98CBE",
          400: "#F759A1",
          500: "#F42684",
          600: "#F2006E",
        },
        primary: {
          100: "#DADBE3",
          200: "#C1C2CF",
          300: "#8F92A9",
          400: "#5D6183",
          500: "#2B305E",
          600: "#060C41",
        },
      },
      fontFamily: {
        body: ['"Raleway"'],
      },
    },
  },
  plugins: [],
};
