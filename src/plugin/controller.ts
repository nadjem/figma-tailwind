//import _ from 'lodash';
import getTextStyles from './figma/textStyles';
import getPaintStyles from './figma/paintStyles';
import getEffectStyles from './figma/effectStyles';
//import getNodeStyles from './figma/nodeStyles';

figma.showUI(__html__);

let config = {
    project: '',
    prefix: '',
    colors: [],
    gradientColors: [],
    fontSize: [],
    fontFamily: [],
    boxShadow: [],
    borderRadius: [],
    baseFontSize: false,
    groupColor: false,
};

figma.ui.onmessage = (msg) => {
    if (msg.type === 'get-info') {
        const {finalSizes, finalFamilies} = getTextStyles();
        const textStyles = figma.getLocalTextStyles();
        const {colors, gradientColors} = getPaintStyles();
        const {shadows} = getEffectStyles();
        // const {finalRadii} = getNodeStyles();

        console.log({textStyles});
        config.project = figma.root.name;
        config.prefix = msg.prefix;
        config.fontSize.push(...finalSizes);
        config.fontFamily.push(...finalFamilies);
        config.colors.push(...colors);
        config.gradientColors.push(...gradientColors);
        config.boxShadow.push(...shadows);
        // config.borderRadius.push(...finalRadii);

        figma.ui.postMessage({
            type: 'get-info',
            message: {result: `info ready`, data: config},
        });
    } else if (msg.type === 'close') {
        figma.ui.postMessage({
            type: 'close',
            message: {result: `close from plugin`},
        });
        setTimeout(() => {
            figma.closePlugin();
        }, 100);
    }
};
