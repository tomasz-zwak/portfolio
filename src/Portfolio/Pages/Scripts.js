import { useState, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import { getByText } from '@testing-library/react';


function Scripts(props) {
    const [scripts, setScripts] = useState();
    const [description, setDescription] = useState("No readme");
    let { scriptName } = useParams();

    useEffect( () => {
        getScripts().then(scriptData => {
            const readme = scriptData.filter(script => script.name === "README.md")[0];
            if(readme){
                setDescription(readme.content);
                scriptData.splice(scriptData.indexOf(readme), 1);
            } else {
                setDescription("No Readme")
            }
            setScripts(scriptData)});
    }, [scriptName])

    function getFiles(gitFolder){
        return fetch(`https://api.github.com/repos/ttzv/Scripts/contents/${gitFolder}`).then(response => response.json());
    }

    function getCode(json){
        return Promise.all(json.map(j => fetch(j.download_url)));
    }

    async function getScripts() {
        const filesJson = await getFiles(scriptName);
        const scriptResponse = await getCode(filesJson);
        const scriptCode = await Promise.all(scriptResponse.map(response => response.text()));
        return filesJson.map( (file, index) => {
            return {name: file.name, content: scriptCode[index]}
        });
    }
    
    function buildTabs(){
        if(scripts){
            return(
                scripts.map(script => (
                    <Tab>{script.name}</Tab>
                ))
            );
        }
        return null;
    }

    function buildTabPanels(){
        if(scripts){
            return(
                scripts.map(script => (
                    <TabPanel>
                        <SyntaxHighlighter language={getExt(script.name)} showLineNumbers={true} style={tomorrowNight}>
                            {script.content}
                        </SyntaxHighlighter>
                    </TabPanel>
                ))
            )
        }
        return null;
    }

    function getExt(fileName){
        const ext = fileName.split(".").pop();
        switch (ext) {
            case "bat":
                return "batch";
            case "ps1":
                return "powershell";
            case "gs":
                return "javascript";
            case "js":
                return "javascript";
            default:
                return null;
        }
    }

    const title = (scriptName ? scriptName : "Scripts");
    return(
        <div id="main">
            <div className="inner">
                <h1>{title}</h1>
                <p>        
                    <ReactMarkdown>
                        {description}
                    </ReactMarkdown>
                </p>
                <hr></hr>
                <Tabs>
                    <TabList>
                       {buildTabs()}
                    </TabList>
                    {buildTabPanels()}
                </Tabs>
                
            </div>
        </div>
    )
}
export default Scripts;