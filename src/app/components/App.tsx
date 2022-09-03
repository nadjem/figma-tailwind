import * as React from 'react';
import '../styles/ui.css';
import exporter from '../../plugin/figma/exportFile';
declare function require(path: string): any;
const App = ({}) => {
    const [ready, setReady] = React.useState(false);
    const [showLoader, setShowLoader] = React.useState(false);
    const textbox = React.useRef<HTMLInputElement>(undefined);
    const [data, setData] = React.useState({});
    const [prefixTxt, setPrefixTxt] = React.useState('');
    const [pxTxt, setPxTxt] = React.useState('off');
    const [disabledAll, setDisabledALl] = React.useState(false);
    const prefix = React.useCallback((element: HTMLInputElement) => {
        if (element) textbox.current = element;
    }, []);

    const onCreate = () => {
        setShowLoader(true);
        setTimeout(() => {
            const prefix = textbox.current.value;
            const px = pxTxt === 'on';
            const data = {
                prefix,
                px,
            };
            setDisabledALl(true);
            parent.postMessage({pluginMessage: {type: 'get-info', data}}, '*');
        }, 500);
    };

    const onCancel = () => {
        parent.postMessage({pluginMessage: {type: 'close'}}, '*');
    };
    const onExport = () => {
        exporter(data);
    };
    const handleInput = (e) => {
        setPrefixTxt(e.target.value);
    };
    const handlePxChange = (e) => {
        setPxTxt(e.target.value);
    };
    React.useEffect(() => {
        return () => {};
    }, [prefixTxt]);

    React.useEffect(() => {
        return () => {};
    }, [pxTxt]);

    React.useEffect(() => {
        // This is how we read messages sent from the plugin controller
        window.onmessage = (event) => {
            const {type, message} = event.data.pluginMessage;
            if (type === 'get-info') {
                /* console.log(`Figma Says: ${message.result}`);
                console.log(message.data); */
                setShowLoader(false);
                setReady(true);
                setData(message.data);
            } else if (type === 'close') {
                setReady(false);
                /* console.log(`Figma Says: ${message.result}`); */
            }
        };
    }, []);

    return (
        <div className={'container'}>
            <div className={'inputs'}>
                <div className={'prefix'}>
                    <label htmlFor="prefix">set class prefix:</label>
                    <input disabled={disabledAll} id={'prefix'} ref={prefix} onChange={handleInput} />
                </div>
                <div className={'pixel'}>
                    <label htmlFor="pixel">use pixel size ? </label>
                    <input disabled={disabledAll} id={'pixel'} type="checkbox" onChange={handlePxChange} />
                </div>
            </div>

            <div className={'buttons'}>
                {!ready ? (
                    <button disabled={!prefixTxt.length} id="create" onClick={onCreate}>
                        Get project info{' '}
                    </button>
                ) : (
                    <button id="create" onClick={onExport}>
                        export
                    </button>
                )}
                <button onClick={onCancel}>Cancel</button>
            </div>

            {showLoader ? (
                <div className="simple-spinner">
                    <span></span>
                </div>
            ) : null}
        </div>
    );
};

export default App;
