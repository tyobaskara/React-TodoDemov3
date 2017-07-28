import React from 'react';
import {Link} from 'react-router';
import {Helmet} from "react-helmet";
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
                        <Tab label="Item One" >
                            <div>

                                <p>The busies people have the most leisure...</p>
                                <ul>{todos}</ul>
                                <AddItem onAdd={this.onAdd.bind(this)}/>

                            </div>
                        </Tab>
                        <Tab label="Item Two" >
                            <div>
                                Lorem Ipsum
                            </div>
                        </Tab>
                        <Tab label="onActive">
                            <div>
                                Dolor Sit Amet
                            </div>
                        </Tab>
                    </Tabs>
                    
                </div>
            </MuiThemeProvider>
        );
    }// render

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
    }

};

export default TodoComponent;