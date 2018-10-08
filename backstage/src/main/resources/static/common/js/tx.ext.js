
TX.TEMP.isLogin = function (options) {

    var isLogin = false;
    $.ajax({
        url: TX.TEMP.CHECKLOGINURL,
        async: false,
        success: function (resp) {
            isLogin = resp.data.isLogin;
        }
    });

    if (!isLogin) {
        TX.MYFUN.genLoginForm(options);
    }

    return isLogin;

}

TX.TEMP.checkLogin = function () {

    var isLogin = false;
    $.ajax({
        url: TX.TEMP.CHECKLOGINURL,
        async: false,
        success: function (resp) {
            isLogin = resp.data.isLogin;
        }
    });

    return isLogin;
};

TX.TEMP.getLoginUser = function () {

    $.ajax({
        url: TX.TEMP.GETLOGININVESTOR,
        success: function (resp) {
            if (resp.code) {

                var url = resp.data.url;
                var html = '<span></span>';
                var loginOutUrl = resp.data.loginOutUrl;
             
                if (resp.data.islogin) {
                    var name = resp.data.name; 
                    html += TX.FN.format('<a href="{0}">您好,{1}</a><a href="{2}">退出</a>', url, name, loginOutUrl);

                } else {
                    html += '<a href="'+TX.TEMP.LOGINURL+'" >登录</a><u>|</u>';
                    html += TX.FN.format('<a href="'+TX.TEMP.REGISTER+'">注册</a>', url);
                }

                $("li[data-tab-login-li]").html(html);

                //      <li class="lastli" data-tab-login-li>
                //     <span></span>
                //     <!-- 个人中心 [15210860133] -->
                //     <!--<a href="../member/login.html">登录</a><u>|</u>-->
                //     <!-- <a href="javascript:" data-tab-login>登录</a><u>|</u>
                //     <a href="{:url('login/register')}">注册</a> -->
                // </li>

            }
        }
    });

};

TX.CORE.myfun("genLoginForm", function (options) {

    if (!TX.TEMP.LogonForm) {

        var html = [];
        var __ReturnUrl__= window.location.href;
        html.push('<div id="loninContaner" class="m-ucenter" data-login-form>');
        html.push('        <div class="box panel_login">');
        html.push('            <div class="close">×</div>');
        html.push('            <div>');
        html.push('                <span class="title">用户登录</span>  ');

        html.push('                <span class="title1">还没有账号  <span class="title2">');
        html.push('                    <a href="' + TX.TEMP.REGISTER +'?__ReturnUrl__='+__ReturnUrl__+ '">马上注册</a></span></span>');
        html.push('            </div>');
        html.push('            <div class="hr"></div>');
        html.push('            <div class="panel_tab">');

        html.push('                <div class="text" data-tab-login-type>');
        // html.push('                    <a href="javascript:;" class="actived">账号密码登录</a> &nbsp;&nbsp;|&nbsp;&nbsp;');
        // html.push('                    <a href="javascript:;" class="gray">手机登录</a></div>');
        html.push('                <form action="" method="post">');

        html.push('                    <ul id="div_password" class="div_password" >');
        html.push('                        <li class="show-error"><dd>用户名或密码错误</dd></li>');
        html.push('                        <li class="item userName" ><i></i><input type="text" name="mobile" class="the_inputcode users" placeholder="请输入手机号"></li>');
        html.push('                        <li class="item pwd" ><i></i><input type="password" name="password" class="the_inputcode password" placeholder="请输入登录密码"></li>');
        html.push('                        <li class="item checkVerimg" style="display:none;"><i></i><input type="text" class="the_input ver-img" maxlength="4" placeholder="请输入验证码"><img class="verImg"></li>');
        html.push('                        <li class="li_01" ><label><a href="' + TX.TEMP.FORGETPWD + '" rel="nofollow"></a></li>');
        html.push('                        <li><a class="login-user-btn">立即登录</a></li>');
        html.push('                    </ul>');

        html.push('                    <ul id="div_verification"  style="display:none;">');
        html.push('                        <li class="show-error"><dd>用户名或密码错误</dd></li>');
        html.push('                        <li class="item userName " ><i></i><input type="text" name="mobile" class="the_inputcode users" placeholder="请输入手机号" style="width:190px;"><input class="getcode" value="获取验证码" id="btnGetVerify" type="button"></li>');
        html.push('                        <li class="item pwd" ><i></i><input type="text" name="verifycode" class="the_inputcode" placeholder="请输入验证码"></li>');
        html.push('                        <li class="item checkVerimg" style="display:none;"><i></i><input type="text" class="the_input ver-img" maxlength="4" placeholder="请输入验证码"><img class="verImg"></li>');
        html.push('                        <li class="li_01" ><a href="' + TX.TEMP.FORGETPWD + '" rel="nofollow"></a></li>');
        html.push('                        <li><a class="login-user-btn">立即登录</a></li>');
        html.push('                    </ul>');

        html.push('                </form>');
        html.push('            </div>');
        html.push('        </div>');
        html.push('</div>');

        TX.TEMP.LogonForm = $(html.join(''));
    }

    TX.TEMP.LogonForm.data("options", options);
    TX.TEMP.LogonForm.show().appendTo($(document.body));

})

TX.INIT(function () {

    //注册登录事件
    $(document).on("click", "*[data-tab-login]", function () {
        TX.MYFUN.genLoginForm();
    });

    //切换登录方式
    $(document).on("click", "div[data-tab-login-type] a", function () {

        var index = $(this).index();
        
        $("ul", $(this).parents("div.panel_tab")).hide();
        $("ul", $(this).parents("div.panel_tab")).eq(index).show();

        $("div[data-tab-login-type] a").addClass("gray");
        $("div[data-tab-login-type] a").eq(index).removeClass('gray');
        $("div[data-tab-login-type] a").eq(index).addClass('actived');

    });

    //关闭登录窗口
    $(document).on("click", "div[data-login-form] .close", function () {

        TX.TEMP.LogonForm && TX.TEMP.LogonForm.remove();

    });

    //用户名密码登录
    $(document).on("click", "#div_password a.login-user-btn", function () {

        var options = TX.TEMP.LogonForm.data("options");

        var mobile = $("input[name='mobile']", $("*[data-login-form] #div_password")).val();
        var userpwd = $("input[name='password']", $("*[data-login-form] #div_password")).val();

        if (!/^1\d{10}$/.test(mobile)) {
            layer.tips('手机号格式错误', $("input[name='mobile']", $("*[data-login-form] #div_password")), {
                tips: 3
            });
            $("input[name='mobile']", $("*[data-login-form] #div_password")).focus();
            return;
        }

        if (!/^\w{6,}$/.test(userpwd)) {
            layer.tips('请输入至少6位密码', $("input[name='password']", $("*[data-login-form] #div_password")), {
                tips: 3
            });
            $("input[name='password']", $("*[data-login-form] #div_password")).focus();
            return;
        }

        TX.CORE.p({
            url: TX.TEMP.LOGINURL,
            data: {
                logintype: 1,
                mobile: mobile,
                userpwd: userpwd,
                __ReturnUrl__: window.location.href
            },
            success: function(resp){
                if(resp.code){
                    TX.TEMP.getLoginUser();
                    TX.MSG.msg(resp.msg, { time: 1500 }, function () {
                        if (resp.url) {
                            top.window.location.href = resp.url;
                        }else{
                            top.window.location.href = options.target;
                        }
                        TX.TEMP.LogonForm && TX.TEMP.LogonForm.remove();
                    });
                } else {
                    layer.tips(resp.msg, $("input[name='mobile']", $("*[data-login-form] #div_password")), {
                        tips: 3
                    });
                }
            }
        });

    });


    //用户名验证码登录
    $(document).on("click", "#div_verification a.login-user-btn", function () {

        var options = TX.TEMP.LogonForm.data("options");

        var mobile = $("input[name='mobile']", $("*[data-login-form] #div_verification")).val();
        var verifycode = $("input[name='verifycode']", $("*[data-login-form] #div_verification")).val();

        if (!/^1\d{10}$/.test(mobile)) {
            layer.tips('手机号格式错误', $("input[name='mobile']", $("*[data-login-form] #div_verification")), {
                tips: 3
            });
            $("input[name='mobile']", $("*[data-login-form] #div_verification")).focus();
            return;
        }

        if (!/^\d{4}$/.test(verifycode)) {
            layer.tips('验证码输入有误', $("input[name='verifycode']", $("*[data-login-form] #div_verification")), {
                tips: 3
            });
            $("input[name='verifycode']", $("*[data-login-form] #div_verification")).focus();
            return;
        }

        TX.CORE.p({
            url: TX.TEMP.LOGINURL,
            data: {
                logintype: 2,
                mobile: mobile,
                verifycode: verifycode
            },
            success: function (resp) {
                if (resp.code) {

                    TX.TEMP.getLoginUser();

                    TX.MSG.msg(resp.msg, { time: 1500 }, function () {

                        if (options) {
                            if (options.target) {
                                top.window.location.href = options.target;
                            } else if (options.callback) {
                                options.callback();
                            }

                            TX.TEMP.LogonForm && TX.TEMP.LogonForm.remove();
                        }
                        else {
                            top.window.location.href = resp.url;
                        }
                    });
                } else {
                    if (resp.data.code == 101) {
                        layer.tips('验证码输入有误', $("input[name='verifycode']", $("*[data-login-form] #div_verification")), {
                            tips: 3
                        });
                        $("input[name='verifycode']", $("*[data-login-form] #div_verification")).focus();
                    }
                    else {
                        layer.tips(resp.msg, $("input[name='mobile']", $("*[data-login-form] #div_verification")), {
                            tips: 3
                        });
                    }
                }
            }
        });

    });

    //获取验证码
    $(document).on("click", "*[data-login-form] #btnGetVerify", function () {

        var mobile = $("input[name='mobile']", $("*[data-login-form] #div_verification")).val();
        if (!/^1\d{10}$/.test(mobile)) {
            layer.tips('手机号格式错误', $("input[name='mobile']", $("*[data-login-form] #div_verification")), {
                tips: 3
            });
            $("input[name='mobile']", $("*[data-login-form] #div_verification")).focus();
            return;
        }
        var me = this;

        TX.CORE.p({

            url: TX.TEMP.GETLOGINVERIFYCODE,
            data: {
                mobile: mobile
            },
            success: function (resp) {
                if (resp.code) {
                    TX.MSG.msg(resp.msg);
                    sendVerifyCode(me);
                } else {
                    layer.tips(resp.msg, $("input[name='mobile']", $("*[data-login-form] #div_verification")), {
                        tips: 3
                    });
                }
            }
        });

    });

});


function sendVerifyCode(obj) {

    //验证码倒计时
    var countdown = 60;
    function settime(obj) {
        if (countdown == 0) {
            obj.removeAttribute("disabled");
            obj.value = "获取验证码";
            countdown = 60;
            return;
        } else {
            obj.setAttribute("disabled", true);
            obj.value = "重发(" + countdown + ")";
            countdown--;
        }
        setTimeout(function () {
            settime(obj)
        }, 1000)
    }

    settime(obj);


}

