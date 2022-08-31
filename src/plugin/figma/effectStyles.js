import {makeRgb} from '../helpers/helpers';

export default function () {
    // eslint-disable-next-line
    const effectStyles = figma.getLocalEffectStyles();
    const shadows = [];

    effectStyles.forEach((style) => {
        const shadowStyle = {};
        const {effects, name} = style;
        console.log(style);
        const styleString = [];
        // Generate css string for each shadow (if it has a color, BACKGROUND_BLUR does not)
        effects.forEach((effect) => {
            const {color, offset, radius, spread, type} = effect;
            if (color) {
                const {r, g, b, a} = makeRgb(color);
                const colorString = `${r},${g},${b},${a}`;
                styleString.push(
                    `${type === 'INNER_SHADOW' ? 'inset ' : ''}${offset.x}px ${
                        offset.y
                    }px ${radius}px ${spread}px rgba(${colorString})`
                );
            }
        });
        // Create object & push it to shadows
        if (shadowStyle) {
            console.log({name});
            let n = name.split('/');
            n = name.includes('/') ? n[1] : name;

            shadowStyle.name = n;
            shadowStyle.value = styleString.join(', ');
            shadows.push(shadowStyle);
        }
    });

    return {shadows};
}
