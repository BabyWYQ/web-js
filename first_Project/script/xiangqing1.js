/**
 * Created by Administrator on 2017/3/23 0023.
 */
(function () {
    //================================================获取导航栏上的数据
    var ogoods_shop = document.getElementById("goods_category");
    var ogoods_magazine = document.getElementById("goods_magazine");
    var ogoods_share = document.getElementById("goods_share");
    /**
     * 处理商品分类数据
     */
    var doGoodsCategory = function(data){
        $.each(data.data, function(item){
            var modelString=
                "<li>" +
                "<a href='fenlei.html?cat_id="+item.cat_id+"'>"+item.cat_name+"</a>" +
                "</li>";
            ogoods_shop.innerHTML+=modelString;
            ogoods_magazine.innerHTML+=modelString;
            ogoods_share.innerHTML+=modelString;

        });
    };
    /**
     * 获取商品分类信息
     */
    var getGoodsCategory = function(){
        $.jsonp(
            ucshop.getGoodsCategoryAddress(),
            {"format":"jsonp", "callback":"doGoodsCategory"},
            "doGoodsCategory",
            doGoodsCategory
        );
    };

    //===================================================获取商品详情数据
    var oGoodsmain = document.getElementById("main");
    var isGoodTemplate=document.getElementById("isGood").innerHTML;
    /**
     * 处理商品
     */
    var doGoods = function(err,d) {
        var dataJSON = JSON.parse(d);
        var sDiv = $.compile(isGoodTemplate, dataJSON.data[0]);
        oGoodsmain.innerHTML += sDiv;
    };
    /**
     * 获取商品
     */
    var getGoods = function(){
        var goods_id = $.getQueryString("goods_id");
            $.get(
                ucshop.getGoodsAddress(),
                {"goods_id": goods_id},
                doGoods
            )
    };
    window.onload = function() {
        //获取商品分类信息
        getGoodsCategory();
        //获取商品
        getGoods();
    };
    // // =====================================================手指动画
    var ofingerBox = document.getElementById("fingerBox");
    var ofinger_box = document.getElementById("finger_box");
    var lock = true;
    ofingerBox.onmouseover = function () {
        if (!lock)return;
        lock = false;
        $.animate(ofinger_box, {"left": -20}, 500, "Linear", function () {
            $.animate(ofinger_box, {"left": 0}, 500, "Linear", function () {
                $.animate(ofinger_box, {"left": -20}, 500, "Linear", function () {
                    $.animate(ofinger_box, {"left": 0}, 500, "Linear");
                });
            });
        });
        setTimeout(function () {
            lock = true;
        }, 2100);
    };
    //=======================================================搜索框
    var ssBtn = document.getElementById("ssBtn");
    var search = document.getElementById("search");
    var input1 = document.getElementById("input1");
    var isshow = false;
    ssBtn.onclick = function () {
        if (!isshow) {
            input1.style.borderBottom = "4px solid #25292e";
            $.animate(input1, {left: 0}, 500, "CircEaseOut");
            isshow = true;
        } else {
            $.animate(input1, {left: 260}, 500, "CircEaseOut");
            isshow = false;
        }
    };






})();