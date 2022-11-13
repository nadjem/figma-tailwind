//import _ from 'lodash';
import getTextStyles from './figma/textStyles'
import getPaintStyles from './figma/paintStyles'
import getEffectStyles from './figma/effectStyles'
import getRadiusStyle from './figma/radiusStyles'
import getAllData from './figma/themeStyles'

figma.showUI(__html__)
figma.ui.resize(350, 300)
let config = {
    project: '',
    prefix: '',
    framework: '',
    px: '',
    theme: '',
    colors: [],
    themeClasses: [],
    gradientColors: [],
    fontSize: [],
    fontFamily: [],
    boxShadow: [],
    radius: [],
}

figma.ui.onmessage = (msg) => {
    if (msg.type === 'get-info') {
        const { finalSizes, finalFamilies } = getTextStyles()
        const { colors, gradientColors } = getPaintStyles()
        const { shadows } = getEffectStyles()
        const { radius } = getRadiusStyle()
        const { alls, allsClassName } = getAllData(msg.data)
        config.project = figma.root.name
        config.prefix = msg.data.prefix
        config.px = msg.data.px
        config.framework = msg.data.frameworkTxt
        config.theme = alls
        config.themeClasses = allsClassName
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
    } else if ('get-user') {
        const user = figma.currentUser
        figma.ui.postMessage({
            type: 'get-user',
            message: { result: user },
        })
    }
}
