/**
 * Created by maxwell on 17/3/22.
 */
(function () {
  //商品模板
  var sGoodsTemplate = '';
  var oGoods = document.getElementById("goods");
  var oGoodsCategory = document.getElementById("goods_category");

  /**
   * 处理商品
   */
  var doGoods = function(err,d) {
    console.log(d);
    var dataJSON = JSON.parse(d);
    var sDiv = $.compile(sGoodsTemplate, dataJSON.data[0]);
    oGoods.innerHTML = sDiv;
  };
  /**
   * 获取商品
   */
  var getGoods = function(){
    var goods_id = $.getQueryString("goods_id");
    $.loadTemplate('./template/detail_goods_info.html', function(err, data){
      if (err) {
        console.log(err);
        return;
      }
      sGoodsTemplate = data;

      $.get(
        ucshop.getGoodsAddress(),
        {"goods_id": goods_id},
        doGoods
      )
    });
  };

  /**
   * 处理商品分类数据
   */
  var doGoodsCategory = function(data){
    $.each(data.data, function(item){
      var oLi = document.createElement("li");
      var oA = document.createElement("a");
      oA.href = "list.html?cat_id=" + item.cat_id;
      oA.innerText = item.cat_name;
      oLi.appendChild(oA);
      oGoodsCategory.appendChild(oLi);
    })
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

  window.onload = function() {
    //获取商品分类信息
    getGoodsCategory();
    //获取商品
    getGoods();
  }
})();