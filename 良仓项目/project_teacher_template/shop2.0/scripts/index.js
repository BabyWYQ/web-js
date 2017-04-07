/**
 * Created by sks on 2017/3/21.
 */
(function () {
    var oGoodsCategory = document.getElementById("goods_category");
    var iPositionId = 0;
    var oImageListUl = document.getElementById("imagesList").getElementsByTagName("ul")[0];

    /**
     * 处理商品分类数据
     */
    var doGoodsCategory = function(data){
        if (data.code == ucshop.CODE.success) {
            j.each(data.data, function(item){
                //创建DOM
                var oLi = document.createElement("li");
                var oA = document.createElement("a");
                oA.href = "detail.html?id=" + item.cat_id;
                oA.innerText = item.cat_name;
                oLi.appendChild(oA);
                oGoodsCategory.appendChild(oLi);
            })
        } else {
            console.log(data.message);
        }
    };
    /**
     * 获取商品分类信息
     */
    var getGoodsCategory = function(){
        j.jsonp(
            ucshop.getGoodsCategoryAddress(),
            {"format":"jsonp", "callback":"doGoodsCategory"},
            "doGoodsCategory",
            doGoodsCategory
        );
    };

    /**
     * 获取热门商品
     */
    var getHotGoods = function(){
        var oHotGoodsUl = document.getElementById("hot_goods_ul");
        var sHotGoodsTemplate = document.getElementById("hot_goods_template").innerHTML;
        j.get(
            ucshop.getGoodsAddress(),
            {"page":1, "pagesize":10},
            function(error,d){
                if (error) {
                    console.log(error);
                    return;
                }

                if (j.isJSON(d)) {
                    var dataJSON = JSON.parse(d);
                    if (dataJSON.code == ucshop.CODE.success) {
                        j.each(dataJSON.data, function (item) {
                            var sLi = j.compile(sHotGoodsTemplate, item);
                            oHotGoodsUl.innerHTML += sLi;
                        });
                    }
                } else {
                    console.error("不是一个合法的JSON");
                }
            }
        )
    };
    var doPosition = function(err, d) {
            if (err) {
                console.log(err);
                return;
            }

            if (j.isJSON(d)) {
                var dataJson = JSON.parse(d);
                if (dataJson.code == ucshop.CODE.success) {
                    if (dataJson.data.length < 1) {
                        console.error("广告位是空");
                        return;
                    }
                    iPositionId =  dataJson.data[0]['position_id'];
                    getBanner();
                }
                console.log(dataJson);
            } else {
                console.error("这不是一个合法的JSON");
            }

            return false;
        };
    var getPosition = function (){
        j.get(
          ucshop.getPositionAddress(),
            {},
            doPosition
        );
    };

    /**
     * 获取广告数据
     * @param Error error 错误
     * @param string d 返回的数据
     */
    var doBanner = function(error,d) {
            if (error) {
                console.log(error);
                return;
            }

            if (j.isJSON(d)) {
                var dataJSON = JSON.parse(d);
                if (dataJSON.code == ucshop.CODE.success) {
                    j.each(dataJSON.data, function (item, index) {
                        if (index == 0) {
                            oImageListUl.innerHTML += '<li class="current"><a href=""><img src="' + item.url + '" alt=""></a></li>';
                        } else {
                            oImageListUl.innerHTML += '<li><a href=""><img src="' + item.url + '" alt=""></a></li>';
                        }
                    });
                    loadCarousel();
                }
            } else {
                console.error("不是一个合法的JSON");
            }
        }
    /**
     * 获取首页banner
     */
    var getBanner = function(){
        console.log(iPositionId);
        if (!iPositionId) {
            return;
        }

        j.get(
          ucshop.getAdAddress(),
            {"position_id":iPositionId},
            doBanner
        );
    };

    var loadCarousel = function(){
        var imagesListLis = document.getElementById("imagesList")
            .getElementsByTagName("li");
        var circleListLis = document.getElementById("circles")
            .getElementsByTagName("li");
        var leftBtn = document.getElementById("carousel_leftBtn");
        var rightBtn = document.getElementById("carousel_rightBtn");
        var img_idx = 0; //合理值0、1、2、3、4、5、6、7
        rightBtn.onclick = function(){
            img_idx++;
            if (img_idx>7) {
                img_idx = 0;
            }
            changePic();
        };
        leftBtn.onclick = function(){
            img_idx--;
            if (img_idx<0) {
                img_idx = 7;
            }
            changePic();
        };
        for (var i = 0; i < circleListLis.length; i++) {
            (function (i) {
                circleListLis[i].onmouseover = function(){
                    img_idx = i;
                    changePic();
                };
            })(i);
        }

        function changePic() {
            for (var i = 0; i < imagesListLis.length; i++) {
                imagesListLis[i].className = "";
            }
            imagesListLis[img_idx].className = "current";
            for (var i = 0; i < circleListLis.length; i++) {
                circleListLis[i].className = "";
            }
            circleListLis[img_idx].className = "current";
        }
    };
    window.onload = function(){
        //获取分类信息
        getGoodsCategory();
        //获取热门商品
        getHotGoods();
        //获取广告位
        getPosition();
    }
})();