
/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            fontFamily: {
                roboto: ["Roboto", "sans"],
            },
        }
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: ["light", "dark", "cupcake", "dracula"],
    },
}
