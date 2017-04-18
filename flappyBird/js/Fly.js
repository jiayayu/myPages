/**
 * Fly 是整个游戏的全局对象，保证全局环境中值有一个全局对象！
 * 所有，其他的内容都是通过 Fly 对象获取到的！
 */
(function (window) {

    //开启严格模式
    'use strict';

    //声明全局对象
    var FlyObj = {};

    FlyObj.loadImages = function (imgSrc, callback) {
        var count = 0,
            imgsLen = imgSrc.length,
            imgList = {};

        imgSrc.forEach(function (val, index) {
            var img = new Image();
            img.src = 'images/' + val + '.png';
            imgList[ val ] = img;

            img.onload = function () {
                count++;
                if(count >= imgsLen ){
                    callback( imgList );
                }
            }
        })
    };

    FlyObj.createCv = function (id) {
        var cv = document.createElement('canvas');
        cv.width = 800;
        cv.height = 600;

        var container = document.getElementById(id);
        container.appendChild(cv);

        return cv.getContext('2d');
    };

    FlyObj.cover = function (cover,boolean) {
        
        if(boolean){
            //覆盖  true
            cover.style.display = 'block';
        }else{
            //取消覆盖   false
            cover.style.display = 'none';
        }
    }


    // 工厂函数：
    // 用来实现创建对象，有了该函数以后，只要是创建对象，
    // 就调用这个 工厂函数！
    FlyObj.factory = function(type, option) {
        switch( type ) {
            case 'Game':
                return new Fly.createGame( option );
            case 'Bird':
                return new Fly.Bird( option );
            case 'Sky':
                return new Fly.Sky( option );
            case 'Land':
                return new Fly.Land( option );
            case 'Pipe':
                return new Fly.Pipe( option );
            case 'Time':
                return new Fly.Time( option );
        }
    };

    window.Fly = FlyObj;

})( window );