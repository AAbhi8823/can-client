const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      fontWeight: {
        bold: "600",
      },
      backgroundImage: {
        iceberg:
          "url('https://t3.ftcdn.net/jpg/03/81/30/40/360_F_381304094_lad4eB3TbNHwWQBmKsfFZBcnkjC6NPIz.jpg')",
      },
      colors: {
        color1: "#C31A7F",
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
      },
      screens: {
        "3xl": "2000px",
      },
    },
  },
  plugins: [require("flowbite/plugin"), require("tailwind-scrollbar-hide")],
};




