import {saveAs} from 'file-saver';

export default function (data) {
    let fonts = '';
    let colors = '';
    let shadows = '';
    let fontFamily = '';
    let radius = '';
    data.fontFamily.map((family) => {
        fontFamily += `             '${data.prefix}-${family.name
            .replaceAll(' ', '-')
            .replaceAll('/', '-')
            .toLowerCase()}':'${family.value}',\n`;
    });
    data.fontSize.map((font) => {
        fonts += `             '${data.prefix}-font-${font.value}':'${font.value}px',\n`;
    });
    data.colors.map((color) => {
        colors += `             '${data.prefix}-${color.name
            .replaceAll(' ', '-')
            .replaceAll('/', '-')
            .toLowerCase()}':'${color.value}',\n`;
    });
    data.boxShadow.map((shadow) => {
        shadows += `             '${data.prefix}-${shadow.name
            .replaceAll(' ', '-')
            .replaceAll('/', '-')
            .toLowerCase()}':'${shadow.value}px',\n`;
    });
    data.radius.map((r) => {
        radius += `             '${data.prefix}-${r.name}':'${r.value}px',\n`;
    });
    const base = `module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
        ],
    theme: {
      fontSize: {
${fonts}
      },
      fontFamily: {
${fontFamily}
      },
      colors: {
${colors}
      },
      extend: {
        boxShadow: {
${shadows}
        },
        borderRadius: {
${radius}
      },
      }
    }
  }`;

    var blob = new Blob([base], {type: 'text/plain;charset=utf-8'});
    saveAs(blob, 'tailwind.config.js');
}
