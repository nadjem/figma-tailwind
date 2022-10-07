const alls = []
export default function () {
    const allPage = figma.root.children
    allPage.forEach((page) => {
        if (page.name === 'component.scss') {
            getComponent(page.children).then((component) => {
                console.log(component)
            })
        }
    })
}

const getComponent = (children) => {
    return new Promise((resolve, reject) => {
        children
            .filter((p) => p.constructor.name === 'ComponentSetNode')
            .forEach((component) => {
                resolve(component)
            })
    })
}
