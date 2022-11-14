import * as React from 'react'
// import 'materialize-css/dist/css/materialize.min.css';
// import 'materialize-css/dist/js/materialize';
// import 'material-icons/iconfont/material-icons.css'
import '../styles/ui.css'
import exporter from '../../plugin/figma/exportFile'
import makeTHeme from '../../plugin/figma/exportTheme'
declare function require(path: string): any
const App = ({}) => {
    const [ready, setReady] = React.useState(false)
    const [showLoader, setShowLoader] = React.useState(false)
    const textbox = React.useRef<HTMLInputElement>(undefined)
    const [data, setData] = React.useState({})
    const [prefixTxt, setPrefixTxt] = React.useState('tkt')
    const [pxTxt, setPxTxt] = React.useState('off')
    const [themeTxt, setThemeTxt] = React.useState('off')
    const [frameworkTxt, setFrameworkTxt] = React.useState('')
    const [disabledAll, setDisabledALl] = React.useState(false)
    const prefix = React.useCallback((element: HTMLInputElement) => {
        if (element) textbox.current = element
    }, [])
    // TODO recupérer l'auto layout
    const onCreate = () => {
        setShowLoader(true)
        setTimeout(() => {
            const prefix = textbox.current.value
            const px = pxTxt === 'on'
            const data = {
                themeTxt,
                prefix,
                px,
                frameworkTxt,
            }
            setDisabledALl(true)
            parent.postMessage({ pluginMessage: { type: 'get-info', data } }, '*')
        }, 500)
    }

    const onCancel = () => {
        parent.postMessage({ pluginMessage: { type: 'close' } }, '*')
    }
    const onLaunch = () => {
        parent.postMessage({ pluginMessage: { type: 'get-user' } }, '*')
    }
    const onExport = () => {
        if (themeTxt === 'on') {
            makeTHeme(data)
        } else {
            exporter(data)
        }
    }
    const handleInput = (e) => {
        setPrefixTxt(e.target.value)
    }
    const handlePxChange = (e) => {
        setPxTxt(e.target.value)
    }

    const handleThemeChange = (e) => {
        setThemeTxt(e.target.value)
    }

    const handleFrameworkChange = (e) => {
        console.log(e.target.value)
        setFrameworkTxt(e.target.value)
    }

    React.useEffect(() => {
        return () => {}
    }, [prefixTxt])

    React.useEffect(() => {
        return () => {}
    }, [pxTxt])

    React.useEffect(() => {
        onLaunch()
        // This is how we read messages sent from the plugin controller
        window.onmessage = (event) => {
            if (event.data.pluginMessage) {
                const { type, message } = event.data.pluginMessage
                if (type === 'get-info') {
                    setShowLoader(false)
                    setReady(true)
                    setData(message.data)
                } else if (type === 'close') {
                    setReady(false)
                } else if (type === 'get-user') {
                    // console.log(message);
                }
            }
        }
    }, [])

    return (
        <div className={'container'}>
            <div className={'inputs'}>
                <div className={'prefix'}>
                    <label htmlFor="prefix">set class prefix:</label>
                    <input disabled={disabledAll} id={'prefix'} ref={prefix} onChange={handleInput} value={prefixTxt} />
                </div>
                <div className={'pixel'}>
                    <label htmlFor="pixel">use pixel size ? </label>
                    <input disabled={disabledAll} id={'pixel'} type="checkbox" onChange={handlePxChange} />
                </div>
                <div className={'theme'}>
                    <label htmlFor="theme">export theme ? </label>
                    <input disabled={disabledAll} id={'theme'} type="checkbox" onChange={handleThemeChange} />
                </div>
                <div className={'framework'}>
                    <label htmlFor="framework-select">Framework:</label>

                    <select
                        name="framework"
                        id="framework-select"
                        className={'input-field col s12'}
                        onChange={(e) => handleFrameworkChange(e)}
                    >
                        <option value="">--Please choose an option--</option>
                        <option value="Angular">Angular</option>
                        <option value="React" disabled={true}>
                            React
                        </option>
                        <option value="Vue">Vue</option>
                    </select>
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
                <button className={'close'} onClick={onCancel}>
                    Cancel
                </button>
            </div>

            {showLoader ? (
                <div className="simple-spinner">
                    <span></span>
                </div>
            ) : null}
        </div>
    )
}

export default App
