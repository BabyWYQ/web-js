/**
 * Created by Administrator on 2017/3/29 0029.
 */
/**
 * Created by sks on 2017/3/29.
 */
/**
 * date: 2017/3/29 11:27
 * author: Baby1
 * email: 1078271170@qq.com
 * example:
 *  html_code:
 *  <div id="goTop"></div>
 *  jquery_code:
 *     $(function(){
           $.goTop($("#goTopBtn"),1000);
      });
 */
/**
 *  function changepic(图片元素, 图片数组){
 * @param elem jQuery选中的元素
 * @param time 回到顶部需要的时间
 */
$.goTop = function(elem,time){
    var frameNumber = 0;//帧编号
    var start = document.body.scrollTop
        || document.documentElement.scrollTop;
    var distance = target - start;
    var interval = 10;
    var maxFrame = time / interval;

    var timer = setInterval(function () {
        frameNumber++;
        if (frameNumber == maxFrame) clearInterval(timer);
        document.body.scrollTop
            = document.documentElement.scrollTop
            = Tween.Elastic.easeIn(frameNumber, start, distance, maxFrame);
    }, interval);
};
    window.onscroll = function(){
        var st = document.body.scrollTop
            || document.documentElement.scrollTop;
        goTopBtn.style.display = st > 500 ? "block" : "none";
    };