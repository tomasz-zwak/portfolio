import ProjectContainer from "../Components/ProjectContainer";

export default function Projects(props) {
    return (
        <div id="main">
             <div className="inner">
                <header>
                    <h1>Hello</h1>
                    <p></p>
                </header>            
            </div>
            <div className="inner">
                <header>
                    <h1>My projects</h1>
                    <p>Text</p>
                </header>
                    <ProjectContainer />               
            </div>
            <div className="inner">
                <header>
                    <h1>My Scripts</h1>
                    <p>Text</p>
                </header>              
            </div>
        </div>
    )
    
}