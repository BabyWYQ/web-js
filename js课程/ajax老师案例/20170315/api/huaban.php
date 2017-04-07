<?php
header("Content-Type:text/json; charset=utf-8");
print_r(file_get_contents("http://huaban.com/explore/banmiansheji/?inzqaws6&max=521858062&limit=20&wfl=1"));
//print_r(file_get_contents("http://huaban.com/search/?q=%E5%8D%81%E9%87%8C%E6%A1%83%E8%8A%B1"));