//import _ from 'lodash';
import getTextStyles from './figma/textStyles'
import getPaintStyles from './figma/paintStyles'
import getEffectStyles from './figma/effectStyles'
import getRadiusStyle from './figma/radiusStyles'
import getAllData from './figma/testStyles'

figma.showUI(__html__)

let config = {
    project: '',
    prefix: '',
    px: '',
    colors: [],
    gradientColors: [],
    fontSize: [],
    fontFamily: [],
    boxShadow: [],
    radius: [],
}

figma.ui.onmessage = (msg) => {
    if (msg.type === 'get-info') {
        getAllData()
        const { finalSizes, finalFamilies } = getTextStyles()
        const { colors, gradientColors } = getPaintStyles()
        const { shadows } = getEffectStyles()
        const { radius } = getRadiusStyle()
        // const { alls } = getAllData()
        config.project = figma.root.name
        config.prefix = msg.data.prefix
        config.px = msg.data.px
        config.fontSize.push(...finalSizes)
        config.fontFamily.push(...finalFamilies)
        config.colors.push(...colors)
        config.gradientColors.push(...gradientColors)
        config.boxShadow.push(...shadows)
        config.radius.push(...radius)

        figma.ui.postMessage({
            type: 'get-info',
            message: { result: `info ready`, data: config },
        })
    } else if (msg.type === 'close') {
        figma.ui.postMessage({
            type: 'close',
            message: { result: `close from plugin` },
        })
        setTimeout(() => {
            figma.closePlugin()
        }, 100)
    }
}
