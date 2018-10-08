Namespace = new Object();
Namespace.register = function (fullNS) {
    var nsArray = fullNS.split('.');
    var sEval = "";
    var sNS = "";
    var count = nsArray.length;
    for (var i = 0; i < count; i++) {
        if (i != 0) sNS += ".";
        sNS += nsArray[i];
        if (i < count - 1) {
            sEval += "if (typeof(" + sNS + ") == 'undefined') " + sNS + " = new Object();";
        } else {
            sEval += "delete " + sNS + ";" + sNS + " = new Object();";
        };
    }
    if (sEval != "") eval(sEval);
};
Namespace.register("TX.DATA");
Namespace.register("TX.CORE");
Namespace.register("TX.MYFUN");
Namespace.register("TX.MSG");
Namespace.register("TX.FN");
Namespace.register("TX.TEMP");

(function () {

    TX.CORE = {

        myfun: function (name, fun, cover) {
            if (typeof name == 'string' && typeof fun == 'function') {
                if (cover == true || typeof TX.MYFUN[name] != 'function') {
                    TX.MYFUN[name] = fun;
                }
            }
        },

        error: function (info) {
            TX.MSG.alert(info);
        },

        p: function (options) {

            // if (1 == TX.TEMP.submit_token) {
            //     TX.MSG.msg("提交得太快啦！");
            //     return;
            // }

            TX.TEMP.submit_token = 1;

            if (!options.disabledLoading) {
                TX.TEMP.LOAD = layer.load(1, { shade: [0.1, '#fff'] });//0.1透明度的白色背景
            }

            $.ajax({

                url: options.url,
                type: options.type || 'POST',
                dataType: options.dataType || 'JSON',
                data: options.data,
                success: function (resp) {

                    TX.TEMP.LOAD && layer.close(TX.TEMP.LOAD);
                    TX.TEMP.submit_token = 0;

                    if (resp.data) {
                        //系统登录信息丢失
                        if (resp.data._SYS_SESSION_LOSE_) {

                            TX.MSG.msg(resp.msg, { time: 1500 }, function () {
                                if (resp.url) {
                                    top.window.location.href = resp.url;
                                }
                            });
                            return;
                        }
                    }

                    options.success && options.success(resp);


                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    TX.TEMP.LOAD && layer.close(TX.TEMP.LOAD);
                    TX.TEMP.submit_token = 0;
                    if (options.error) {
                        options.error(XMLHttpRequest, textStatus, errorThrown);
                    } else {
                        // TX.CORE.error(XMLHttpRequest, textStatus, errorThrown);
                    }
                }
            });
        },

    };

    TX.FN = {
        str_repeat: function (n, str) {
            var result = '';
            for (var i = 0; i < n; i++) {
                result += str;
            };
            return result;
        },
        in_array: function (search, arr) {
            // 遍历是否在数组中 
            var count = arr.length;
            for (var i = 0, k = count; i < k; i++) {
                if (search == arr[i]) {
                    return true;
                }
            }
            // 如果不在数组中就会返回false 
            return false;
        },
        here_doc: function (func) {
            return func.toString().split(/\n/).slice(1, -1).join('\n');
        },
        htmlspecialchars: function (str) {
            if (!str) { return };
            str = str.replace(/&/g, '&amp;');
            str = str.replace(/</g, '&lt;');
            str = str.replace(/>/g, '&gt;');
            str = str.replace(/"/g, '&quot;');
            str = str.replace(/'/g, '&#039;');
            return str;
        },
        htmlspecialchars_decode: function (str) {
            if (!str) { return };
            str = str.replace(/&lt;/g, '<');
            str = str.replace(/&gt;/g, '>');
            str = str.replace(/&quot;/g, '"');
            str = str.replace(/&#039;/g, "'");
            str = str.replace(/&amp;/g, '&');
            return str;
        },
        random_str: function (len, chars) {
            var chars = chars || '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            chars = chars.split("");
            var res = "";
            for (var i = 0; i < len; i++) {
                var id = Math.ceil(Math.random() * (chars.length - 1));
                res += chars[id];
            }
            return res;
        },
        random_num: function (num, from, to) {
            var arr = [];
            for (var i = from; i <= to; i++)
                arr.push(i);
            arr.sort(function () {
                return 0.5 - Math.random();
            });
            arr.length = num;
            return arr;
        },
        // 获取选中项id
        getCheckedId: function (selecter) {
            var ids = [];
            $(selecter).each(function () {
                ids.push($(this).attr('value'));
            });
            return ids.join(',');
        },
        // 反选
        inverse: function (selecter) {
            $(selecter).each(function () {
                $(this).click();
            });
        },
        loadCSS: function (url) {
            var cssLink = document.createElement("link");
            cssLink.rel = "stylesheet";
            cssLink.rev = "stylesheet";
            cssLink.type = "text/css";
            cssLink.media = "screen";
            cssLink.href = url;
            document.getElementsByTagName("head")[0].appendChild(cssLink);
        },
        format: function () {

            if (arguments.length == 0)
                return null;

            var str = arguments[0];
            for (var i = 1; i < arguments.length; i++) {
                var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
                str = str.replace(re, arguments[i]);
            }
            return str;

        },
        newwindow: function (url) {

            var height = 600;
            var width = 800;

            var docWidth = window.screen.availWidth, docHeight = window.screen.availHeight;

            var left = (docWidth - width) / 2;
            var top = (docHeight - height) / 2;

            window.open(url, 'newindow', 'height=600,width=900,top=' + top + ',left=' + left + ',toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');

        }
    };

    TX.CHECK = {
        ismobile: function (info) {
            return /^1\d{10}$/.test(info);
        },
        isemail: function (info) {

        },
        isurl: function (info) {
            var regex = /^([a-zA-Z]+:\/\/)?([\w-\.]+)(\.[a-zA-Z0-9]+)(:\d{0,5})?\/?([\w-\/]*)\.?([a-zA-Z]*)\??(([\w-]*=[\w%]*&?)*)$/;
            if (info.match(regex)) {
                return true;
            } else {
                return false;
            }
        }
    };

    TX.MSG = {
        alert: function (info) {
            layer.alert(info);
        },
        confirm: function (info, yes, no) {

        },
        msg: function (info, options, callback) {
            layer.msg(info, options || {}, callback || function () { });
        }
    };

    TX.INIT = function (callback) {

        var me = this;


        //我们强烈推荐你在代码最外层把需要用到的模块先加载
        layui.use(['layer', 'form', 'element', 'jquery', 'laydate', 'upload'], function () {

            // var layer = layui.layer,
            //     element = layui.element,
            //     $ = layui.jquery;
            window.$ = layui.jquery;
            window.layer = layui.layer;
            window.laydate = layui.laydate;
            window.element = layui.element;

            var form = layui.form;

            //自定义验证规则
            form.verify({

                url2: function (value) {
                    if (value.length > 0) {
                        if (!/^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/.test(value)) {
                            return "请输入正确网址";
                        }
                    }
                },

                req: function (value, input) {
                    var title = $(input).attr("title");
                    if (title) {
                        if (input.tagName == "SELECT") {
                            title = "请选择" + title;
                        } else {
                            title = "请填写" + title;
                        }
                    } else {
                        title = "必填项不能空"
                    }

                    title = $(input).attr("tip-msg") || title;
                    if ($.trim(value).length == 0) {
                        $(input).focus();
                        return title;
                    }
                },
                num: function (value, input) {
                    var title = $(input).attr("title");
                    if (title) {
                        title = "\"" + title + "\"只能填写数字";
                    } else {
                        title = "只能填写数字";
                    }
                    if (!/^\d+$/.test(value)) {
                        return title;
                    }
                },
                float: function (value, input) {
                    var title = $(input).attr("title");
                    if (title) {
                        title = "\"" + title + "\"输入格式错误（小数或整数）";
                    } else {
                        title = "格式错误（小数或整数）";
                    }
                    if (!/^\d+(\.\d+)?$/.test(value)) {
                        return title;
                    }
                },
                float2: function (value, input) {
                    var title = $(input).attr("title");
                    if (title) {
                        title = "\"" + title + "\"输入格式错误（小数或整数，允许输入负数）";
                    } else {
                        title = "格式错误（小数或整数）";
                    }
                    if (!/^(-)?\d+(\.\d+)?$/.test(value)) {
                        return title;
                    }
                    if(parseFloat(value) == 0){
                        return "输入格式错误（不能充值0元）";
                    }
                }
            });


            if (callback) {
                //你的代码都应该写在这里面
                callback(layui, me);

            }

            //新选项卡打开
            $("*[data-tab-href]").unbind("click").click(function (e) {

                var title = $(this).attr("title") || $.trim($(this).html());
                var href = $(this).attr("data-tab-href");
                top.tab.tabAdd({
                    title: title,
                    href: href
                });

            });

        });

    };

    TX.REQUIRED = function () {

        $(":text[lay-verify], textarea[lay-verify]").each(function () {

            var me = this;
            $(this).css("background", "url(" + TX.TEMP.COMMON + "/img/redtag.png) center right no-repeat");

        });

    };

    TX.PLUGINS = function () {

        //销毁历史
        if (!TX.TEMP.UPLOADERS) {
            TX.TEMP.UPLOADERS = [];
        } else {
            $.each(TX.TEMP.UPLOADERS, function (i, item) {
                item.destroy();
            });
            TX.TEMP.UPLOADERS = [];
        }

        $("div.filePicker").each(function () {

            var me = this;
            var id = this.id;
            var form = $(this).attr("form");
            if (form == "[form]") {
                form = undefined;
            }
            var formData = {};
            if (form) {
                var tmp = form.split(";");
                $.each(tmp, function (i, item) {
                    if (item) {
                        var tmp2 = item.split(":");
                        if (tmp2 && tmp2.length > 0) {
                            formData[tmp2[0]] = tmp2[1];
                        }
                    }
                });
            }

            var ext = $(this).attr("ext");
            if (!ext || ext == "[ext]") {
                //doc,pdf,jpg,jpeg,png
                TX.MSG.msg('请配置上传组件[' + id + "]允许上传类型参数:ext");
                return false;
            }

            if (typeof wbUploadSuccess == "undefined" || typeof wbUploadSuccess != "function") {
                TX.MSG.msg('请配置上传组件成功方法：wbUploadSuccess');
                return false;
            }

            var mime = $(this).attr("mime");
            if (!mime || mime == "[mime]") {
                mime = "image/gif,image/jpg,image/jpeg,image/bmp,image/png";
            }

            var sizelimit = $(this).attr("sizelimit");
            if (!sizelimit || sizelimit == "[sizelimit]") {
                sizelimit = 1024 * 1024 * 30;
            } else {
                sizelimit = parseInt(sizelimit, 10);
            }

            var limittitle = sizelimit / 1024;
            if (limittitle < 1024) {
                limittitle += "K";
            } else {
                limittitle = limittitle / 1024;
                limittitle += "M";
            }

            var uploadUrl = $(this).attr("url") || TX.TEMP.UploadUrl;
            var uploader = WebUploader.create({
                auto: true,
                swf: '__COMMON__/plugins/webuploader/Uploader.swf',
                server: uploadUrl,
                pick: "#" + id,
                duplicate: true,
                fileSizeLimit: sizelimit,
                allowMagnify: false,
                crop: false,
                thumb: {
                    allowMagnify: false,
                    crop: false
                },
                accept: {
                    extensions: ext,
                    mimeTypes: mime,
                },
                formData: formData,
                compress: null
            });

            uploader.on('error', function (code) {
                switch (code) {
                    case 'Q_EXCEED_NUM_LIMIT':
                        TX.MSG.msg('文件数量超出限定值！');
                        break;
                    case 'Q_EXCEED_SIZE_LIMIT':
                        TX.MSG.msg(TX.FN.format('文件大小超出限制【{0}范围内】！', limittitle));
                        break;
                    case 'Q_TYPE_DENIED':
                        TX.MSG.msg('禁止上传该类型的文件！');
                        break;
                    default:
                        TX.MSG.msg('上传文件重复！');
                }
            });


            uploader.on('uploadBeforeSend', function (obj, data, headers) {
                TX.TEMP.LOAD = layer.load();
                headers["X-Requested-With"] = "XMLHttpRequest";
            });

            uploader.on('uploadSuccess', function (file, resp) {

                TX.TEMP.LOAD && layer.close(TX.TEMP.LOAD);

                if (resp.data) {
                    //系统登录信息丢失
                    if (resp.data._SYS_SESSION_LOSE_) {

                        TX.MSG.msg(resp.msg, { time: 1500 }, function () {
                            if (resp.url) {
                                top.window.location.href = resp.url;
                            }
                        });
                        return;
                    }
                }

                wbUploadSuccess(file, resp, me);

            });
            uploader.on('uploadError', function (file) {
                TX.MSG.msg('上传出错');
            });
            uploader.on('uploadComplete', function (file) {
                TX.TEMP.LOAD && layer.close(TX.TEMP.LOAD);
            });

            uploader.on("uploadProgress", function (file, percentage) {
            });

            TX.TEMP.UPLOADERS.push(uploader);

        });

    };

    TX.MAP = {

        BAIDU: function (extpoint, callback) {

            console.log(extpoint);

            var preMarker = undefined;
            var map = new BMap.Map("position"); // 创建地图实例     

            if (extpoint && extpoint.lat && extpoint.lng) {

                preMarker = new BMap.Marker(extpoint);
                map.addOverlay(preMarker);
                map.panTo(extpoint);

                map.centerAndZoom(new BMap.Point(extpoint.lng, extpoint.lat), 15);
            } else {
                var point = new BMap.Point(116.331398, 39.897445); // 创建点坐标     
                map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别    
            }

            map.addControl(new BMap.NavigationControl());
            map.addControl(new BMap.ScaleControl());
            map.setDefaultCursor("crosshair");
            map.addEventListener("click", function (e) {   //点击事件    

                if (!e.overlay) {
                    callback && callback(e);
                    var marker = new BMap.Marker(e.point);
                    if (preMarker) {
                        map.removeOverlay(preMarker);
                    }
                    map.addOverlay(marker);
                    map.panTo(e.point);
                    preMarker = marker;
                }

            });
        }
    };

})();



