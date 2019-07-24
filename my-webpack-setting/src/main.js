import React from "react";
import ReactDom from "react-dom";
import {HashRouter as Router,Route} from "react-router-dom";
import Loadable from "react-loadable";

const AboutComponent = Loadable({
    loader: () => import('_c/About'),
    loading: ()=>{
        return <div>Loading...</div>
    },
    delay: 200,
    timeout: 10000,
});

const MyComponent = Loadable({
    loader: () => import('_c/My'),
    loading: ()=>{
        return <div>Loading...</div>
    },
    delay: 200,
    timeout: 10000,
});

ReactDom.render(
     <Router>
        <div>
            <Route exact path="/" component={AboutComponent} />
            <Route exact path="/my" component={MyComponent} />
        </div>
     </Router>
    , document.getElementById("app"));