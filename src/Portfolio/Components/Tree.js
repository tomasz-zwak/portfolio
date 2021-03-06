import { useState } from "react";
import "./Tree.css";
function Tree(props){
    const [expanded, setExpanded] = useState(false);
    const { header, children} = props;

    function toggle(){
        if(expanded){
            setExpanded(false);
        } else {
            setExpanded(true);
        }
    }
    let expandedClassBtn = (expanded ? " tree-btn--expanded" : ""); 
    let expandedClassTree = (expanded ? " tree-container--expanded" : ""); 
    return(
        <div className="tree">
            <div className="tree-controls">
                <div className={`icon solid fas fa-caret-right tree-btn${expandedClassBtn}`} onClick={toggle}></div>
                <div> {header} </div>
            </div>
            <div className={`tree-container${expandedClassTree}`}>
                <ol>
                    {children}
                </ol>
            </div>
        </div>
    )
}
export default Tree;