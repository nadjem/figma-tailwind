export default function () {
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
                    components.children.forEach((child) => {
                        const name = child.name.split(',')[0].split('=')[1]
                        if (!childsName.includes(name)) {
                            childsName.push(name)
                            childs.push(child)
                        }
                    })
                    childs.map((component) => {
                        console.log(component)
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
                            allsClassName.push(`${component.parent.name.toLowerCase()}-${name.toLowerCase()}`)
                        }
                    })
                })
        }
    })
    return { alls, allsClassName }
}
