/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-lv1": "#f0f0f0",
        "gray-lv2": "#c0c0c0",
        "gray-lv3": "#808080",
        "gray-lv4": "#404040",
        "gray-blue": "#3498db",
        "gray-green": "#2ecc71",
      },
      backgroundImage: { samplebg: "url(/src/img/03.jpg)" },
      width: {
        "custom-w": "325px",
      },
      height: {
        "custom-h": "667px",
      },
    },
  },
  plugins: [],
};
