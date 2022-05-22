import * as React from 'react';
import '../styles/ui.css';
import exporter from '../../plugin/figma/exportFile';
//import tailwind from '../assets/TailwindLogo.png';
/* import tailwind from '../assets/TailwindLogo';
import figma from '../assets/FigmaLogo.png'; */
declare function require(path: string): any;
const App = ({}) => {
    const [ready, setReady] = React.useState(false);
    const textbox = React.useRef<HTMLInputElement>(undefined);
    const [data, setData] = React.useState({});
    const prefix = React.useCallback((element: HTMLInputElement) => {
        if (element) console.log(element.value);
        textbox.current = element;
    }, []);

    const onCreate = () => {
        const prefix = textbox.current.value;
        parent.postMessage({pluginMessage: {type: 'get-info', prefix}}, '*');
    };

    const onCancel = () => {
        parent.postMessage({pluginMessage: {type: 'close'}}, '*');
    };
    const onExport = () => {
        exporter(data);
    };
    React.useEffect(() => {
        console.log({ready: ready});
        return () => {};
    }, [ready]);

    React.useEffect(() => {
        // This is how we read messages sent from the plugin controller
        window.onmessage = (event) => {
            const {type, message} = event.data.pluginMessage;
            if (type === 'get-info') {
                console.log(`Figma Says: ${message.result}`);
                console.log(message.data);
                setReady(true);
                setData(message.data);
            } else if (type === 'close') {
                setReady(false);
                console.log(`Figma Says: ${message.result}`);
            }
        };
    }, []);

    return (
        <div>
            <p>
                set class prefix: <input ref={prefix} />
            </p>
            {!ready ? (
                <button id="create" onClick={onCreate}>
                    Get project info
                </button>
            ) : (
                <button id="create" onClick={onExport}>
                    export
                </button>
            )}
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default App;
