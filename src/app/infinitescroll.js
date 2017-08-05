import React from 'react';
import {Link} from 'react-router';
import {Helmet} from "react-helmet";

//jquery
import $ from 'jquery';


class InfiniteScroll extends React.Component{
    render(){
        return(
            <div id="wrapperOne">
                <Helmet>
                    <title>Infinite Scroll</title>
                </Helmet>
                <ul className="navMenu">
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/infinitescroll'}>Infinite Scroll</Link></li>
                </ul>
                <h2>Infinite Scroll</h2>

                <div id="wrapperAjax">
                    <button id="loadMore">Load More</button>
                    <ul className="infinitescroll1">
                        
                    </ul>
                    <img className="loaderImg" src="./app/css/vendor/slick/ajax-loader.gif" alt="loader"/>
                </div>
            </div>
        );
    }

    componentDidMount(){

        $(function(){
            var ztitle, zbody, id , userid;
            var keyBefore = 0,
                keyAfter = 10,
                dataLength = 0;


            function loadAjax(){
                $.ajax({
                    url: "https://jsonplaceholder.typicode.com/posts",
                    success: function(data) {

                        dataLength = data.length;

                        $('.loaderImg').hide();

                        $.each(data, function(key, val) {
                            //console.log(val.title);
                            if(key >= keyBefore && key < keyAfter) {
                                console.log(key, keyBefore, keyAfter);
                                ztitle = val.title;
                                zbody = val.body;
                                id = val.id;
                                userid = val.userId;

                                var template = `<li class="post">
                                            <h3>${ztitle}</h3>
                                            <p>${zbody}</p>
                                            <p>userid: ${userid}</p>
                                            <p>id: ${id}</p>
                                        </li>`;

                                $('.infinitescroll1').append(template);
                            }
                        });

                        keyBefore = keyAfter;
                        keyAfter = keyBefore + 2;
                        console.log(keyBefore, keyAfter);
                        console.log(dataLength);
                    }
                })
            }

            loadAjax();

            //if using button loadmore
            $(document).on('click', '#loadMore', function(){
                if(keyBefore < dataLength) {
                    $('.loaderImg').show();
                    loadAjax();
                }
            });

            //Load ajax on Scroll
            $(window).bind('scroll', function() {
                if($(window).scrollTop() >= $('.infinitescroll1 .post:last-child').offset().top + $('.infinitescroll1 .post:last-child').outerHeight() - window.innerHeight) {    
                    if(keyBefore < dataLength) {
                        $('.loaderImg').show();
                        loadAjax();
                    }
                }
            });

        });

    }
};

export default InfiniteScroll;