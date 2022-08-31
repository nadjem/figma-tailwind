export default function () {
    const alls = [];
    const dropshadow = figma.getLocalEffectStyles();
    const gridStyles = figma.getLocalGridStyles();
    const allData = figma.currentPage.findAll();
    console.log({dropshadow});
    //console.clear()
    /*console.log({dropshadow})
    console.log({gridStyles})
    console.log({allData})*/

    /**
     * get radius
     */
    allData.forEach((node) => {
        if (node.name === 'radius') {
            node.children.map((radius) => {
                console.log('#####################');
                console.log(`'prefix-${radius.children[0].name}':'${radius.cornerRadius}px'`);
                console.log('#####################');
            });
        }
    });
    return {alls};
}
