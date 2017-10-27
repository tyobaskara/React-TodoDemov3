import React from 'react';
import {Link} from 'react-router-dom';
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
                    <ul className="ajMenu">
                        <li><button id="loadMore">Load More</button></li>
                        <li className="sortAjax"><input type="checkbox" id="sort" name="sortajax"/>
                            <label htmlFor="sort">Sort</label>
                        </li>
                    </ul>
                    
                    <ul className="infinitescroll1">
                        
                    </ul>
                    <div className="loaderWrap">
                        <img className="loaderImg" src="./app/css/vendor/slick/ajax-loader.gif" alt="loader"/>
                    </div>
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

            //sorting
            var oncheck = 0;


            function loadAjax(){
                $.ajax({
                    url: "https://jsonplaceholder.typicode.com/posts",
                    success: function(data) {
                        
                        // Sorting: typeof json === Array //
                        var sorted;
                        if(oncheck == 1) {
                            sorted = data.sort(function (a, b) {
                                if (a.id < b.id) {
                                    return 1;
                                }
                                if (a.id > b.id) {
                                    return -1;
                                }

                                return 0;
                            });
                        }
                        else {
                            sorted = data;
                        }
                        // sorting //

                        dataLength = data.length;

                        $('.loaderWrap').hide();

                        $.each(sorted, function(key, val) {
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
                    },
                    error: function(xhr, status, text) {
                        console.log(status + ' ' + text);
                    }
                })
            }

            loadAjax();

            //if using button loadmore
            $(document).on('click', '#loadMore', function(){
                if(keyBefore < dataLength) {
                    $('.loaderWrap').show();
                    loadAjax();
                }
            });

            //Load ajax on Scroll
            $(window).bind('scroll', function() {
                if($(window).scrollTop() >= $('.infinitescroll1 .post:last-child').offset().top + $('.infinitescroll1 .post:last-child').outerHeight() - window.innerHeight) {    
                    if(keyBefore < dataLength) {
                        $('.loaderWrap').show();
                        loadAjax();
                    }
                }
            });

            //SORTING BUTTON
            $(document).on('change', '#sort', function() {
                if(this.checked) {
                    oncheck = 1;
                    keyBefore = 0,
                    keyAfter = 10,
                    dataLength = 0;
                    $('.infinitescroll1').empty();
                    $('.loaderWrap').show();
                    loadAjax();
                }
                else {
                    oncheck = 0;
                    keyBefore = 0,
                    keyAfter = 10,
                    dataLength = 0;
                    $('.infinitescroll1').empty();
                    $('.loaderWrap').show();
                    loadAjax();
                }
            });//SORTING
            

        });

    }
};

export default InfiniteScroll;