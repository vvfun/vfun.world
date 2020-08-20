$(function () {
    function getUrlParam(parame) {
        var urlfa = location.search;
        var url = decodeURI(urlfa);
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        var parameter = theRequest[parame];
        return parameter;
    }
    var token = getUrlParam('id');
    function payFun(productId, code) {
        $.ajax({
            type: "POST",
            url: 'https://vfun.mixit.fun/api/paysession/create',
            async: true,
            dataType: 'json',
            data: JSON.stringify({ productId: productId, type: 1, code: code, token: token }),
            beforeSend: function (xhr) {
                token = token;
                xhr.setRequestHeader("authorization", token);
            },
            headers: { 'Content-Type': 'application/json;charset=utf8', 'authorization': token },
            success: function (datas) {
                window.open(datas.data, '_blank');
                $('.loading').hide();
            }
        });
    }
    // payFun('wgr2b9sfwmr', "mela_diamonds_300")

    $('.closePop').off('touchend').on('touchend', function () {
        $('.popup').hide();
    })
    var productId = '';
    $('.gobay').off('touchend').on('touchend', function () {
        productId = $(this).attr('data-id');
        $('.popup').show();
    });
    $('.popup-item').off('touchend').on('touchend', function () {
        $('.popup').hide();
        $('.loading').show();
        payFun(productId, $(this).attr('data-type'));
    });
})