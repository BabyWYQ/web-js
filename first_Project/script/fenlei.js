/**
 * Created by Administrator on 2017/3/22 0022.
 */

(function(){

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
     * 获取商品分类信息导航栏
     */
    var getGoodsClassify = function(){
        $.jsonp(
            ucshop.getGoodsCategoryAddress(),
            {"format":"jsonp", "callback":"doGoodsCategory"},
            "doGoodsCategory",
            doGoodsCategory
        );
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
// =====================================================手指动画
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

    //====================================================获取商品分类数据GPS
    var getGoodsCategory=function(){
        $.get("http://h6.duchengjiu.top/shop/api_cat.php",{},function(err,d){
            try{
                var dataJson = JSON.parse(d);
                $.each(dataJson.data,function(item,index){
                    var oUL =document.getElementById("shopping_GPS");
                    oUL.innerHTML +="<li><a href =\"fenlei.html?cat_id="
                        +item.cat_id+"\">"
                        +item.cat_name+"</a></li>";
                });
            }catch(e){
                console.log(e);
            }
        });
    };
    /**
     * 获取某个商品分类中的商品列表
     */
    var oShop_arrange = document.getElementById("shop_arrange");
    var shop_arrange_template= document.getElementById("shop_arrange_template").innerHTML;
    var getGoodsList = function (item,index) {
        var cat_id = $.getQueryString("cat_id");
        $.get(
            ucshop.getGoodsAddress(),
            {"cat_id": cat_id, "page":1, "pagesize":10},
            function (error,d) {
                if (error) {
                    console.log(error);
                    return;
                }
                if ($.isJSON(d)) {
                    var dataJSON = JSON.parse(d);
                    if (dataJSON.code == ucshop.CODE.success) {
                        $.each(dataJSON.data, function (item) {
                            var good = $.compile(shop_arrange_template, item);
                            oShop_arrange.innerHTML += good;
                        });
                    }
                }else {
                    console.error("不是一个合法的JSON");
                }
            });
    };


    // /**
    //  * 处理商品分类数据
    //  */
    // var  doGoodsCategory = function(data){
    //     $.each(data.data, function(item){
    //         var oLi = document.createElement("li");
    //         var oA = document.createElement("a");
    //         oA.href = "list.html?cat_id=" + item.cat_id;
    //         oA.innerText = item.cat_name;
    //         oLi.appendChild(oA);
    //         shop_arrange.appendChild(oLi);
    //     })
    // };
    // /**
    //  * 获取商品分类信息*/
    // var getGoodsCategory = function(){
    //     $.jsonp(
    //         ucshop.getGoodsCategoryAddress(),
    //         {"format":"jsonp", "callback":"doGoodsCategory"},
    //         "doGoodsCategory",
    //         doGoodsCategory
    //     );
    // };
//加载
    window.onload = function(){
        //获取广告位（轮播图）
        // getPosition();
        //获取商品分类信息
        getGoodsClassify();
        //获取商品分类信息
        getGoodsCategory();
        //获取热门商品
        getGoodsList();

    };
})();
