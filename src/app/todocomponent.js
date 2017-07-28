import React from 'react';
import {Link} from 'react-router';
import {Helmet} from 'react-helmet';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//mui theme
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const muiTheme = getMuiTheme(darkBaseTheme);

//mui components
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

//Components
import TodoItem from './todoitem';
import AddItem from './additem';

//jquery
import $ from 'jquery';

//slick js
require('./vendor/slick/slick.js');

//Create component
class TodoComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            todos: ['wash up', 'eat some cheese', 'take a nap', 'buy flowers']
        }
    }
    render(){
        var todos = this.state.todos;
        todos = todos.map(function(item, index){
            return(
                <TodoItem item={item} key={index} onDelete={this.onDelete.bind(this)}/>
            )
        }.bind(this));
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div id="wrapperOne">
                    <Helmet>
                        <title>To Do List</title>
                    </Helmet>

                    <ul className="navMenu">
                        <li><Link to={'/'}>Home</Link></li>
                        <li><Link to={'/about'}>About</Link></li>
                    </ul>

                    <Tabs>
                        <Tab label="Item One"  onActive={this.srcOff}>
                            <div>

                                <p>The busies people have the most leisure...</p>
                                <ul>{todos}</ul>
                                <AddItem onAdd={this.onAdd.bind(this)}/>

                            </div>
                        </Tab>
                        <Tab label="Item Two"  onActive={this.srcOff}>
                            <div>
                                <div className='sliderOne'>
                                    <div className='single-item'>
                                        <div><h3>1</h3></div>
                                        <div><h3>2</h3></div>
                                        <div><h3>3</h3></div>
                                        <div><h3>4</h3></div>
                                        <div><h3>5</h3></div>
                                        <div><h3>6</h3></div>
                                    </div>
                                </div>
                            </div>
                        </Tab>
                        <Tab label="onActive" onActive={this.handleActive}>
                            <div>
                                <iframe id="video" width="100%" height="480"
                                src="" data-src="https://www.youtube.com/embed/XGSy3_Czz8k">
                                </iframe>
                            </div>
                        </Tab>
                    </Tabs>
                    
                </div>
            </MuiThemeProvider>
        );
    }// render

    srcOff(){
        document.getElementById('video').src = '';
    }

    handleActive(){
        var src = document.getElementById('video').getAttribute("data-src");
        console.log(src);
        document.getElementById('video').src = src;
    }

    //onDelete
    onDelete(item){
        var updatedTodos = this.state.todos.filter(function(val, index){
            console.log(item, val);
            return item !== val;
        });
        this.setState({
            todos: updatedTodos
        });

    }

    //onAdd
    onAdd(item){
        var updatedTodos = this.state.todos;
        updatedTodos.push(item);
        this.setState({
            todos: updatedTodos
        })
    }

    componentWillMount(){
        console.log('componentWillMount todocomponent');
    }
    componentDidMount(){
        console.log('componentDidMount todocomponent');

        $(".single-item").slick({
            dots: true
        });
    }

};

export default TodoComponent;