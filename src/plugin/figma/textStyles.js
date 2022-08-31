export default function () {
    // eslint-disable-next-line
    /*const filterdNodes = figma.root.findAll(n => (n.cornerRadius));
    console.log({filterdNodes})*/

    const textStyles = figma.getLocalTextStyles();
    // const textWeight = figma.root.findAll()

    const fontSizes = [];
    const fontFamilies = [];
    const fontWeight = [];
    const finalSizes = [];
    const finalFamilies = [];
    const finalWeight = [];
    //console.log(textWeight)

    textStyles.forEach((style) => {
        const {family} = style.fontName;
        const {fontSize} = style;

        fontFamilies.push(family);
        fontSizes.push(fontSize);
    });

    // Get unique values
    const singleSizes = Array.from(new Set(fontSizes)).sort((a, b) => a - b);
    const singleFamilies = Array.from(new Set(fontFamilies));

    // Clean sizes
    singleSizes.forEach((size) => {
        const name = '';
        // Pass everything as a string
        const value = size.toString();
        // const result = { name, value };
        const result = {value};
        finalSizes.push(result);
    });

    // Clean families
    singleFamilies.forEach((family) => {
        const name = family.replace(/\s+/g, '-').toLowerCase();
        const value = family;
        const result = {name, value};
        finalFamilies.push(result);
    });

    // Make objects
    return {finalSizes, finalFamilies};
}
