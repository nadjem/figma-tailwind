export default function () {
    const alls = []
    const dropshadow = figma.getLocalEffectStyles()
    const gridStyles = figma.getLocalGridStyles()
    // const allData = figma.root.children
    const allPage = figma.root.children

    allPage.map((page) => {
        if (page.name === 'component.scss') {
            // console.log(page.name)
            let data = {}
            let name = ''
            let components = page.children.filter((p) => p.constructor.name === 'ComponentSetNode')[0]
            components.children.map((component) => {
                let configStr = component.name.replace(/"/g, '')
                let config = configStr.split(',').map((c) => {
                    return c.trim()
                })
                config.forEach((c) => {
                    c.split('=')
                    data[c.split('=')[0]] = c.split('=')[1]
                })
                // TODO voir avec Jerem le nomage des items:
                //  - configuration ou nom du parent

                // name = data.configuration
                name = data[component.parent.name.toLowerCase()]
                delete data.configuration
                let css = ''
                //console.log(data)
                for (const item in data) {
                    if (data[item] !== 'none') {
                        css += `${data[item]} `
                    }
                }
                /*console.log(`
                .${component.parent.name.toLowerCase()}-${name.toLowerCase()}{
                   @apply ${css}
                }`)*/
                let rule = `
                .${component.parent.name.toLowerCase()}-${name.toLowerCase()}{
                   @apply ${css}
                }`
                alls.push(rule)
            })
        }
    })

    return { alls }
}
