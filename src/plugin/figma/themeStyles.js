export default function (data) {
    const dataTheme = data
    const alls = []
    const allsClassName = []
    const allPage = figma.root.children
    let count = 1
    allPage.map((page) => {
        if (page.name === 'component.scss') {
            count++
            page.children
                .filter((p) => p.constructor.name === 'ComponentSetNode')
                .forEach((components) => {
                    let data = {}
                    let name = ''
                    let childs = []
                    let childsName = []
                    let css = ''
                    let dynamicTextStyle = ''
                    components.children.forEach((child) => {
                        const name = child.name.split(',')[0].split('=')[1]
                        if (!childsName.includes(name)) {
                            childsName.push(name)
                            childs.push(child)
                        }
                    })
                    childs.map((component) => {
                        let textChild = component.children.filter((c) => c.constructor.name === 'TextNode')[0]
                        if (textChild) {
                            let styleColors = getStyleById(textChild.fillStyleId)
                            let styleTexts = getStyleById(textChild.textStyleId)
                            if (styleTexts) {
                                dynamicTextStyle = `font-${dataTheme.prefix}-${styleTexts.fontName.family
                                    .toLowerCase()
                                    .replace(' ', '-')}`
                                dynamicTextStyle += ` text-[${styleTexts.fontSize}px]`
                                dynamicTextStyle += ` font-${styleTexts.fontName.style.toLowerCase()}`
                                dynamicTextStyle += ` text-${dataTheme.prefix}-${styleColors.name.replace('/', '-')}`
                                dynamicTextStyle += ` ${
                                    textChild.textCase === 'ORIGINAL' ? 'normal-case' : 'uppercase'
                                }`
                                dynamicTextStyle += ` text-${textChild.textAlignHorizontal.toLowerCase()}`
                                if (styleTexts.lineHeight.value) {
                                    dynamicTextStyle += ` {leading-${styleTexts.lineHeight.value}}`
                                }
                                if (styleTexts.letterSpacing.value) {
                                    dynamicTextStyle += ` tracking-${styleTexts.letterSpacing.value}`
                                }
                            } else {
                                /*console.log({styleTexts})*/
                            }
                        }
                        css = ''
                        let configStr = component.name.replace(/"/g, '')
                        let config = configStr.split(',').map((c) => {
                            return c.trim()
                        })
                        config.forEach((c) => {
                            c.split('=')
                            data[c.split('=')[0]] = c.split('=')[1]
                        })
                        name = data.configuration
                        delete data.configuration
                        console.log({ name })
                        if (name) {
                            let i = ''
                            for (const item in data) {
                                if (data[item] !== 'none' && data[item] !== 'enabled' && !item.includes('*')) {
                                    if (data[item] !== data[component.parent.name.toLowerCase()]) {
                                        if (item === 'icon') {
                                            console.log({ icon: item })

                                            i = `   i{
         @apply ${data[item]};
        }`
                                        } else {
                                            css += `${data[item]} `
                                        }
                                    }
                                }
                            }
                            let rule = `
.${component.parent.name.toLowerCase()}-${name.toLowerCase()}{
   @apply ${css} ${dynamicTextStyle};
    ${i}
}\n`
                            dynamicTextStyle = ''
                            console.log({ rule })
                            alls.push(rule)
                            allsClassName.push(`${component.parent.name.toLowerCase()}-${name.toLowerCase()}`)
                        }
                    })
                })
        }
    })
    console.log(allsClassName)
    return { alls, allsClassName }
}

const getStyleById = (styleId) => {
    return figma.getStyleById(styleId)
}
