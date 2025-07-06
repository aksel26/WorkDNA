/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#faf9f8",
          100: "#f5f3f0",
          200: "#ede7df",
          300: "#e1d4c7",
          400: "#d2c0a8",
          500: "#b59f85",
          600: "#a08c6f",
          700: "#87725b",
          800: "#6f5e4d",
          900: "#5c4e41",
        },
        background: {
          primary: "#efebde",
          secondary: "#6b6a6a",
          light: "#7e7d7d",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

// #e7dba6
