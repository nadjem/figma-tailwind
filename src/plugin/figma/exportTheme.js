import { saveAs } from 'file-saver'
import * as JSZip from 'jszip'
import templates from './templates'

export default async function (data) {
    let fonts = ''
    let colors = ''
    let shadows = ''
    let fontFamily = ''
    let radius = ''
    let px
    px = data.px
    data.fontFamily.map((family) => {
        fontFamily += `             '${data.prefix}-${family.name
            .replaceAll(' ', '-')
            .replaceAll('/', '-')
            .toLowerCase()}':'${family.value}',\n`
    })
    data.fontSize.map((font) => {
        fonts += `             '${data.prefix}-${font.value}':'${font.value}px',\n`
    })
    data.colors.map((color) => {
        colors += `             '${data.prefix}-${color.name
            .replaceAll(' ', '-')
            .replaceAll('/', '-')
            .toLowerCase()}':'${color.value}',\n`
    })
    data.boxShadow.map((shadow) => {
        shadows += `             '${data.prefix}-${shadow.name
            .replaceAll(' ', '-')
            .replaceAll('/', '-')
            .toLowerCase()}':'${shadow.value}px',\n`
    })
    data.radius.map((r) => {
        radius += `             '${data.prefix}-${r.name}':'${r.value}px',\n`
    })
    const base = `module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
        ],
    theme: {
    ${
        px
            ? '' +
              '  spacing: {\n' +
              "              px: '1px',\n" +
              "              0: '0',\n" +
              "              0.5: ' 0.5px',\n" +
              "              1: '1px',\n" +
              "              1.5: '1.5px',\n" +
              "              2: '2px',\n" +
              "              2.5: '2.5px',\n" +
              "              3: '3px',\n" +
              "              3.5: '3.5px',\n" +
              "              4: '4px',\n" +
              "              5: '5px',\n" +
              "              6: '6px',\n" +
              "              7: '7px',\n" +
              "              8: '8px',\n" +
              "              9: '9px',\n" +
              "              10: '10px',\n" +
              "              11: '11px',\n" +
              "              12: '12px',\n" +
              "              14: '14px',\n" +
              "              16: '16px',\n" +
              "              20: '20px',\n" +
              "              24: '24px',\n" +
              "              28: '28px',\n" +
              "              30: '30px',\n" +
              "              32: '32px',\n" +
              "              36: '36px',\n" +
              "              40: '40px',\n" +
              "              44: '44px',\n" +
              "              48: '48px',\n" +
              "              52: '52px',\n" +
              "              56: '56px',\n" +
              "              60: '60px',\n" +
              "              64: '64px',\n" +
              "              72: '72px',\n" +
              "              80: '80px',\n" +
              "              96: '96px',\n" +
              '    },'
            : ''
    }
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
  }`
    const zip = JSZip()
    let theme
    if (data.theme[0]) {
        data.theme[0].replaceAll('tkt', data.prefix)
        theme = new Blob(data.theme, { type: 'text/plain;charset=utf-8' })
    }
    const config = new Blob([base], { type: 'text/plain;charset=utf-8' })
    if (data.framework) {
        templates(data.framework, data.prefix).then((frameworks) => {
            frameworks.forEach((framework, index) => {
                const blob = new Blob([framework.content], { type: 'text/plain;charset=utf-8' })
                zip.file(framework.title, blob)
                if (index === frameworks.length - 1) {
                    zip.file('config/tailwind.config.js', config)
                    zip.file(`theme/theme-${data.prefix}.scss`, theme)

                    zip.generateAsync({ type: 'blob' }).then(function (content) {
                        // see FileSaver.js
                        // saveAs(content, "example.zip");
                        saveAs(content, `${data.prefix}-figma.zip`)
                    })
                }
            })
        })
    } else {
        zip.file('config/tailwind.config.js', config)
        zip.file(`theme/theme-${data.prefix}.scss`, theme)

        zip.generateAsync({ type: 'blob' }).then(function (content) {
            // see FileSaver.js
            // saveAs(content, "example.zip");
            saveAs(content, `${data.prefix}-figma.zip`)
        })
    }
}
