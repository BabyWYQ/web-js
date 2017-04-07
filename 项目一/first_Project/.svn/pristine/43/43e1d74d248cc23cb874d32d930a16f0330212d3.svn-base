/**
 *
 * Created by sks on 2017/3/21.
 */
(function () {
  window.ucshop = {
    /**
     * API地址前缀
     * @type {string}
     */
    API_PREFIX: "http://h6.duchengjiu.top/shop/",
    /**
     * 错误码, 0表示成功
     * @type {number}
     */
    CODE: {
      success     : 0,//成功
      empty       : 1,//数据为空
      failed      : 2,//失败
      sys_err     : 3,//系统错误，请联系管理员
      username    : 1000,//用户名错误，格式不正确，规定在3-20位数字字母下划线
      password    : 1001,//密码错误，格式不对，规定在6-20位数字字母下划线
      tokenerr    : 1002,//非法的TOKEN
      tokennone   : 1003,//TOKEN为空
      param_err   : 1004,//参数错误
      expire      : 2000,//资源过期
      exists      : 2001,//资源已存在
      not_exists  : 2002,//资源不存在
      conn_err    : 3000,//数据库连接错误
      sql_err     : 3001,//SQL语句错误
    },
    API_FILE : {
      login_or_register : 'api_user.php',
      user_info         : 'api_userinfo.php',
      cat               : 'api_cat.php',
      goods             : 'api_goods.php',
      position          : 'api_position.php',
      ad                : 'api_ad.php',
      cart              : 'api_cart.php',
      order             : 'api_order.php',
    },

    /**
     * 获取API的完整地址
     * @param filename
     * @returns {string}
     */
    getApiAddress: function (filename) {
      return this.API_PREFIX + filename;
    },
    getGoodsCategoryAddress : function() {
      return this.API_PREFIX + this.API_FILE.cat;
    },
    getLoginOrRegisterAddress : function() {
      return this.API_PREFIX + this.API_FILE.login_or_register;
    },
    getUserInfoAddress : function() {
      return this.API_PREFIX + this.API_FILE.user_info;
    },
    getGoodsAddress : function() {
      return this.API_PREFIX + this.API_FILE.goods;
    },
    getPositionAddress : function() {
      return this.API_PREFIX + this.API_FILE.position;
    },
    getAdAddress : function() {
      return this.API_PREFIX + this.API_FILE.ad;
    },
    getCartAddress : function() {
      return this.API_PREFIX + this.API_FILE.cart;
    },
    getOrderAddress : function() {
      return this.API_PREFIX + this.API_FILE.order;
    },
  };
})();
