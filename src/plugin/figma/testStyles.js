export default function () {
    const alls = []
    const dropshadow = figma.getLocalEffectStyles()
    const gridStyles = figma.getLocalGridStyles()
    // const allData = figma.root.children
    const allPage = figma.root.children
    let count = 1

    console.log('allPage')
    allPage.map((page) => {
        if (page.name === 'component.scss') {
            console.log('page', count)
            count++
            let data = {}
            let name = ''
            let components = page.children.filter((p) => p.constructor.name === 'ComponentSetNode')[0]
            let childs = []
            let childsName = []
            components.children.forEach((child) => {
                const name = child.name.split(',')[0].split('=')[1]
                if (!childsName.includes(name)) {
                    childsName.push(name)
                    childs.push(child)
                }
            })
            childs.map((component) => {
                let configStr = component.name.replace(/"/g, '')
                let config = configStr.split(',').map((c) => {
                    return c.trim()
                })
                config.forEach((c) => {
                    c.split('=')
                    data[c.split('=')[0]] = c.split('=')[1]
                })

                // name = data.configuration
                name = data.configuration
                delete data.configuration
                let css = ''
                let i = ''
                //console.log(data)
                for (const item in data) {
                    if (data[item] !== 'none' && data[item] !== 'enabled' && !item.includes('*')) {
                        console.log(item)
                        if (data[item] !== data[component.parent.name.toLowerCase()]) {
                            if (item === 'icon') {
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
   @apply ${css};
    ${i}
}\n`

                alls.push(rule)
            })
        }
    })
    return { alls }
}
