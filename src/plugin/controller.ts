import _ from 'lodash';

figma.showUI(__html__);

let config = {
    project: '',
    prefix: '',
    fonts: [],
    colors: [],
};

figma.ui.onmessage = (msg) => {
    if (msg.type === 'get-info') {
        const textStyles = figma.getLocalTextStyles();
        console.log({textStyles});
        textStyles.map((text) => {
            console.log(text.fontSize);
            console.log(text.description);
        });
        figma.currentPage.children.map((nodes) => {
            console.log(figma.root.name);
            config.project = figma.root.name;
            config.prefix = msg.prefix;
            if (nodes.name === 'Typography') {
                nodes.children.map((nodesChild) => {
                    config.fonts.push(nodesChild.children[0].fontSize);
                });
            } else if (nodes.name === 'Typographie') {
                nodes.children.map((nodesChild) => {
                    nodesChild.children.map((sub) => {
                        sub.children.map((rows) => {
                            rows.children.map((row) => {
                                config.fonts.push(row.fontSize);
                            });
                        });
                    });
                });
            }
        });

        config.fonts = _.uniq(config.fonts).sort();
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
