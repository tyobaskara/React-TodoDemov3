import React from 'react';

//jquery
import $ from 'jquery';

//slick js
require('./vendor/slick/slick.js');

class SliderOne extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            slideritem: ['1','2','3','4','5','6']
        }
    }

    render(){
        var slideritem = this.state.slideritem;
        slideritem = slideritem.map(function(item, index){
            return(
                <ItemSlider item={item} key={index}/>
            )
        }.bind(this));
        return(
            <div className='sliderOne'>
                <div className='single-item'>
                    {slideritem}
                </div>
            </div>
        );
    }

    componentDidMount(){
        console.log('componentDidMount sliderOne');

        $(".single-item").slick({
            dots: true
        });
    }
};

class ItemSlider extends React.Component{
    render(){
        return(
            <div><h3>{this.props.item}</h3></div>
        );
    }
}

export default SliderOne;