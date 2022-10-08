export default function () {
    const radius = []
    const allData = figma.root.children.filter((page) => page.name === 'tailwind.config.js')[0].children

    /**
     * get radius
     */
    allData.forEach((node) => {
        if (node.name === 'radius') {
            node.children.map((r) => {
                radius.push({
                    name: r.children[0].name,
                    value: r.cornerRadius,
                })
            })
        }
    })
    return { radius }
}
