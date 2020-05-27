# graduation_project
---------------------------------------------
# 方法说明
## js
### commonFunction.js
1. 输入框验证（reg：正则，inputName：输入框jQ元素名;正确返回1，错误返回0）
function dataCheck(reg, inputName)
2. 文件格式判断（FileName：上传获取的文件名，testSuf：类型数组;匹配返回1，不匹配返回0）
function photoJudge(FileName, testSuf)
3. 时间选择(model:1 普通控件；2 日期控件；3 日期时间控件；4 时间控件)
function timeCheck(model)
4. 模态(sta:1 打开；0 关闭)
function model(sta)
5. 经纬度间距离计算
function calDistance(lng1,lng2,lat1,lat2)
6. 日期字符转变为时间戳  格式：date = '2015-03-05 17:59:00'
function stringToTime(date)
7. 获取当前时间  格式：date = '2015-03-05 17:59:00'
function getFormatDate()
8. 二维码函数
- 中文字符处理
function toUtf8(str)
- 生成二维码
function outputQRCod(txt, width, height) 
9. 获得时间差(时间格式 例如 ： 2010-10-12 01:00:00 ,返回精度为："second","minute","hour""day")
function timeDiff(time1, time2, dif) 
10. 车主底部导航
function bottomClick()
11. 车主订单顶部选项选中
function toActive(item);

### content.js
----------------------------------------------------