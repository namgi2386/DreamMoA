/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", //src 모든파일에 tailwind 적용해줌줌
  ],
  darkMode: 'class',  // 다크모드 활성화 방식
  theme: {
    extend: {
      colors: {
        'my-blue': {
          1: '#003458',
          2: '#3F628A',
          3: '#DBF2FF',
          4: '#88A9D5',
        },
        'my-yellow': '#F9F871',
        'my-red' : '#EB3223',
      }
    },
  },
  plugins: [],
}