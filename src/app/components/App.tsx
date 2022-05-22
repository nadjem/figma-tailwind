import * as React from 'react';
import '../styles/ui.css';
import tailwind from '../assets/TailwindLogo.png';
import figma from '../assets/FigmaLogo.png';
declare function require(path: string): any;

const App = ({}) => {
    const textbox = React.useRef<HTMLInputElement>(undefined);

    const prefix = React.useCallback((element: HTMLInputElement) => {
        if (element) console.log(element.value);
        textbox.current = element;
    }, []);

    const onCreate = () => {
        console.log(textbox.current.value);
        const prefix = textbox.current.value;
        parent.postMessage({pluginMessage: {type: 'get-info', prefix}}, '*');
    };

    const onCancel = () => {
        parent.postMessage({pluginMessage: {type: 'close'}}, '*');
    };

    React.useEffect(() => {
        // This is how we read messages sent from the plugin controller
        window.onmessage = (event) => {
            const {type, message} = event.data.pluginMessage;
            if (type === 'get-info') {
                console.log(`Figma Says: ${message.result}`);
                console.log(message.data);
            } else if (type === 'close') {
                console.log(`Figma Says: ${message.result}`);
            }
        };
    }, []);

    return (
        <div>
            <div className="logos">
                <img src={figma} />
                to
                <img src={tailwind} />
            </div>
            <p>
                set class prefix: <input ref={prefix} />
            </p>
            <button id="create" onClick={onCreate}>
                Get project info
            </button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default App;
