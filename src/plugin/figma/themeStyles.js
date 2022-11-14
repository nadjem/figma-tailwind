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
                    let dynamicIconStyle = ''
                    components.children.forEach((child) => {
                        const name = child.name.split(',')[0].split('=')[1]
                        if (!childsName.includes(name)) {
                            childsName.push(name)
                            childs.push(child)
                        }
                    })
                    childs.map((component) => {
                        console.log({ component })

                        let iconChild = component.children.filter(
                            (c) => c.constructor.name === 'InstanceNode' && c.name.toLowerCase().includes('icon')
                        )[0]
                        if (iconChild) {
                            dynamicIconStyle = `w-[${iconChild.mainComponent.width}px] h-[${iconChild.mainComponent.height}px] `
                        }
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
                                    dynamicTextStyle += ` leading-${styleTexts.lineHeight.value}`
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
                        if (name) {
                            let i = ''
                            for (const item in data) {
                                if (data[item] !== 'none' && data[item] !== 'enabled' && !item.includes('*')) {
                                    if (data[item] !== data[component.parent.name.toLowerCase()]) {
                                        if (item !== 'icon') {
                                            css += `${data[item]} `
                                        }
                                    }
                                }
                            }
                            if (dynamicIconStyle.length) {
                                i = `   i{
         @apply ${dynamicIconStyle};
        }`
                            }
                            let rule = `
.${component.parent.name.toLowerCase()}-${name.toLowerCase()}{
   @apply ${css} ${dynamicTextStyle};
    ${i}
}\n`
                            dynamicTextStyle = ''
                            dynamicIconStyle = ''
                            alls.push(rule)
                            allsClassName.push(`${component.parent.name.toLowerCase()}-${name.toLowerCase()}`)
                        }
                    })
                })
        }
    })
    return { alls, allsClassName }
}

const getStyleById = (styleId) => {
    return figma.getStyleById(styleId)
}
