import React from 'react';
import ReactDOM from 'react-dom';
import {Helmet} from "react-helmet";
require('./css/main.scss');
import { BrowserRouter as Router, Route, browserHistory } from 'react-router-dom';

//Module requires
import TodoComponent from './todocomponent';
import InfiniteScroll from './infinitescroll';

class App extends React.Component{
    render(){
        return(
            <Router history={browserHistory}>
                <div>
                    <Route exact path={'/'} component={TodoComponent}></Route>
                    <Route path={'/infinitescroll'} component={InfiniteScroll}></Route>
                </div>
            </Router>
        );
    }

    //lifecycle function
    componentWillMount(){
        console.log('componentWillMount');
    }
    componentDidMount(){
        console.log('componentDidMount');
    }
    componentWillUpdate(){
        console.log('componentWillUpdate');
    }
};

//put component into html page
ReactDOM.render(<App />, appWrapper);