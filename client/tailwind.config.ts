import type { Config } from 'tailwindcss'

const config: Config = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xxs: "450px",
      xxxs: "480px",
      xs: "550px",
      // nav_logo: "550px",
      sm: "640px",
      md: "768px",
      base: "870px",
      md_link: "980px",
      lg: "1024px",
      lg1: "1180px",
      xl: "1280px",
      xl1: "1450px",
      "2xl": "1536px",
      "3xl": "1650px",
      "4xl": "1850px",
      "5xl": "2140px",
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      dropShadow: {
        bannerShadow: "0.1rem 0.1rem lightgray"
      },
      boxShadow: {
        menuShadow: "0px 1px 2px 0px #9099ff",
        btnShadow: "0px 1px 3px 0px #5b65d1",
        heroShadow: "0px 0px 2px 2px #8493A8",
      }
    },
  },
  plugins: [],
}
export default config
