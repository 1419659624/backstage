
var indexPage = {
    initEvent: function () {
        // var time = null;
        // $(".nav-text").mouseover(function () {
        //     clearTimeout(time);
        //     $(this).siblings(".sub-nav").show();
        // });
        // $(".nav-text").mouseout(function () { time = setTimeout(function () { $(".sub-nav").hide() }, 500); });
        // $(".sub-nav").mouseover(function () { clearTimeout(time); $(".sub-nav").show(); });
        // $(".sub-nav").mouseout(function () { time = setTimeout(function () { $(".sub-nav").hide() }, 500); });

        $('.desc-three ul li').mouseover(function () {
            var currentIndex = $(this).index();
            $('.desc-three ul li .shadow').hide();
            $('.desc-three ul li .conten').hide();
            $(this).find('.shadow').show();
            $(this).find('.conten').show();
        })
        $('.desc-three ul li').mouseout(function () {
            var currentIndex = $(this).index();
            $('.desc-three ul li .shadow').hide();
            $('.desc-three ul li .conten').hide();
        })
        $('.img-box-list').mouseover(function () {
            $('.img-box-list .codebox').hide();
            $(this).find('.codebox').show();
        })

        $('.img-box-list').mouseout(function () {
            $('.img-box-list .codebox').hide();
        })

        $('ul.nav li.instruc').mouseenter(function () {
            $("ul.sub-nav", $(this)).show();
        }).mouseleave(function(){
            $("ul.sub-nav", $(this)).hide();
            console.log($("ul.sub-nav", $(this)).length);
        });

    }
}

$(function () {
    indexPage.initEvent();
});