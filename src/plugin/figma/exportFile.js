import {saveAs} from 'file-saver';

export default function (data) {
    console.log(data);
    let fonts = '';
    let colors = '';
    data.fontSize.map((font) => {
        fonts += `             '${data.prefix}-${font.value}':'${font.value}px',\n`;
    });
    data.colors.map((color) => {
        console.log(color.name.replaceAll(' ', '-').replaceAll('/', '-').toLowerCase());
        colors += `             '${data.prefix}-${color.name
            .replaceAll(' ', '-')
            .replaceAll('/', '-')
            .toLowerCase()}':'${color.value}',\n`;
    });
    const base = `module.exports = {
    theme: {
      fontSize: {
${fonts}
      },
      colors: {
${colors}          
      }
    }
  }`;

    var blob = new Blob([base], {type: 'text/plain;charset=utf-8'});
    saveAs(blob, 'config.js');
}
