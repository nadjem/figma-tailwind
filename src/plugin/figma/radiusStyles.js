export default function () {
    const radius = [];
    const allData = figma.currentPage.findAll();

    /**
     * get radius
     */
    allData.forEach((node) => {
        if (node.name === 'radius') {
            node.children.map((r) => {
                radius.push({
                    name: r.children[0].name,
                    value: r.cornerRadius,
                });
            });
        }
    });
    return {radius};
}
