import React from 'react';

class AddItem extends React.Component{
    render(){
        return(
            <form id="add-todo" onSubmit={this.handleSubmit.bind(this)}>
                <input type="text" placeholder="Add Some.." required ref="newItem"/>
                <input type="submit" value="Add" />
            </form>
        )
    }

    handleSubmit(e){
        e.preventDefault();
        //console.log(this.refs.newItem.value);
        var value = this.refs.newItem.value;
        this.props.onAdd(value);

        this.refs.newItem.value = '';

    }
};

export default AddItem;