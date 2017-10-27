import React from 'react';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//mui theme
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const muiTheme = getMuiTheme(lightBaseTheme);

//mui components
import { Tabs, Tab } from 'material-ui/Tabs';

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

//Components
import TodoItem from './todoitem';
import AddItem from './additem';
import SliderOne from './sliderone';


//Create component
class TodoComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: ['wash up', 'eat some cheese', 'take a nap', 'buy flowers']
        }
    }
    render() {
        var todos = this.state.todos;
        todos = todos.map(function (item, index) {
            return (
                <TodoItem item={item} key={index} onDelete={this.onDelete.bind(this)} />
            )
        }.bind(this));
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <div id="wrapperOne">
                    <Helmet>
                        <meta name="description" content="Prasetya Aji Baskara who accidently in love with front end technology and decided to explore more with it" />
                        <link rel="shortcut icon" type="image/x-icon" href="#" />
                        <title>Home - Prasetya Aji Baskara</title>
                    </Helmet>

                    <ul className="navMenu">
                        <li>
                            <NavLink
                                to="/"
                                activeClassName="selected"
                            >Home</NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/infinitescroll"
                            >Infinite Scroll</NavLink>
                        </li>
                    </ul>

                    <Tabs>
                        <Tab label="Item One" onActive={this.srcOff}>
                            <div className="todos">

                                <p>The busies people have the most leisure...</p>
                                <ul>{todos}</ul>
                                <AddItem onAdd={this.onAdd.bind(this)} />

                            </div>
                        </Tab>
                        <Tab label="Item Two" onActive={this.srcOff}>
                            <SliderOne />
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

    srcOff() {
        document.getElementById('video').src = '';
    }

    handleActive() {
        var src = document.getElementById('video').getAttribute("data-src");
        //console.log(src);
        document.getElementById('video').src = src;
    }

    //onDelete
    onDelete(item) {
        var updatedTodos = this.state.todos.filter(function (val, index) {
            //console.log(item, val);
            return item !== val;
        });
        this.setState({
            todos: updatedTodos
        });

    }

    //onAdd
    onAdd(item) {
        var updatedTodos = this.state.todos;
        updatedTodos.push(item);
        this.setState({
            todos: updatedTodos
        })
    }

    componentWillMount() {
        console.log('todocomponent WillMount');
    }
    componentDidMount() {
        console.log('todocomponent DidMount');
    }

};

export default TodoComponent;