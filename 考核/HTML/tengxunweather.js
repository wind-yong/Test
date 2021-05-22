function adapter(){
    const dpWidth = document.documentElement.clientWidth
    const rootFontSize = dpWidth / 10;
    document.documentElement.style.fontSize = rootFontSize + 'px'
}
adapter()
window.onresize = adapter;
 //AJAX
var liHour = document.querySelectorAll(".one-day .hour-item")
var liLife = document.querySelectorAll(".life-sug .life-item")
var liSev = document.querySelectorAll(".seven-wea li");
//请求
var temData = []
var obj={
    url:"http://127.0.0.1:8000/weather",
    success:function(result){
        timeWea(result.time[0])
        handleTwo(result.time)
        handleHour(result.hourly);
        handleLife(result.life);
        temData = handleSev(result.Sevdata)
        chart(temData)
  }
}
myAjax(obj)
//实况天气--今日
function timeWea(data){
    var weaCondition = document.querySelector(".weather-condition")
    var divAirrate = document.querySelector(".airrate")
    var pLoca = document.querySelector(".banner .location")
    var img = document.querySelector("img")
    //背景图片
    img.src = "../__MACOSX/" + data.wea_img + ".jpg"
    //温度
    let pTem = document.createElement("p")
    pTem.setAttribute("class","temperature")
    weaCondition.appendChild(pTem)
    pTem.innerHTML = data.tem_day 
    //天气
    let pWea = document.createElement("p")
    pWea.setAttribute("class","weather")
    weaCondition.appendChild(pWea)
    pWea.innerHTML = data.wea
    //建盒子
    let divWin = document.createElement("div")
    divWin.setAttribute("class","wind-level-and-hum")
    weaCondition.appendChild(divWin)
    //风
    let pWin = document.createElement("p")
    pWin.setAttribute("class","wind")
    divWin.appendChild(pWin)
    pWin.innerHTML = data.win + " " + data.win_speed
    //描述
    let pDis = document.createElement("p")
    pDis.setAttribute("class","decribe")
    weaCondition.appendChild(pDis)
    pDis.innerHTML = "现在的天气比较舒适~"
    //空气
    let pRate = document.createElement("p")
    pRate.setAttribute("class","rate")
    divAirrate.appendChild(pRate)
    pRate.innerHTML = data.air
    //空气质量
    let pLevel = document.createElement("p")
    pLevel.setAttribute("class","ratehan")
    divAirrate.appendChild(pLevel)
    pLevel.innerHTML = "优"
    //地点
    pLoca.innerHTML += data.city

}
//两日天气
function handleTwo(data){
    var top = document.querySelectorAll(".item .top")
    var bottom = document.querySelectorAll(".item .bottom")
    for(var i=0;i<2;i++){
        //温度
        let pTem = document.createElement("p")
        pTem.setAttribute("class","temperature-today")
        top[i].appendChild(pTem)
        pTem.innerHTML = data[i].tem_day +"/"+ data[i].tem_night
        //天气
        let pWea = document.createElement("p")
        pWea.setAttribute("class","today-weather")
        bottom[i].appendChild(pWea)
        pWea.innerHTML = data[i].wea
        //图标
        let icon = document.createElement("i")
        icon.setAttribute("class","iconfont")
        bottom[i].appendChild(icon)
        icon.innerHTML = "&#xe7ed;"
    }
}

// 函数处理24小时天气
function handleHour(data){
    for(var i=0;i<liHour.length;i++)
    {
        //时间
        let pTime = document.createElement("p")
        pTime.setAttribute("class","time")
        liHour[i].appendChild(pTime)
        pTime.innerHTML = data[i].fixTime;
        //icon
        let iHour = document.createElement("i")
        iHour.setAttribute("class","iconfont")
        liHour[i].appendChild(iHour)
        iHour.innerHTML = data[i].icon;
        //temp
        let pTem = document.createElement("p")
        pTem.setAttribute("class","tem")
        liHour[i].appendChild(pTem)
        pTem.innerHTML = data[i].temp;

    }
}
// //生活
function handleLife(data){
    for(var i=0;i<liLife.length;i++)
    {
        //icon
        let icon = document.createElement("i")
        icon.setAttribute("class","iconfont")
        liLife[i].appendChild(icon)
        icon.innerHTML = data[i].img;
        //建议
        let pSug = document.createElement("p")
        pSug.setAttribute("class","sug")
        liLife[i].appendChild(pSug)
        pSug.innerHTML = data[i].sug;
        //主题
        let pTitle = document.createElement("p")
        pTitle.setAttribute("class","title")
        liLife[i].appendChild(pTitle)
        pTitle.innerHTML = data[i].title;
    }
}

// 7日天气
//创建一个数组，存储白天晚上的温度
function handleSev(data){
    let temData = []
    l=liSev.length/2
    for(var i=0;i<l;i++)
    {   //白天
        // 星期
        let pDay = document.createElement("p")
        pDay.setAttribute("class","day")
        liSev[i].appendChild(pDay)
        pDay.innerHTML = data[i].week
        //日期
        let pDate = document.createElement("p")
        pDate.setAttribute("class","date")
        liSev[i].appendChild(pDate)
        pDate.innerHTML = data[i].date
        //天气情况
        let pwea = document.createElement("p")
        pwea.setAttribute("class","wea")
        liSev[i].appendChild(pwea)
        pwea.innerHTML = data[i].wea_day
        //图片
        let icon = document.createElement("i")
        icon.setAttribute("class","iconfont")
        liSev[i].appendChild(icon)
        icon.innerHTML = data[i].wea_img_day
        //获取白天温度
        temData.push(data[i].tem_day)
    }
    for(i=l;i<liSev.length;i++)
    {
        //图片
        let icon = document.createElement("i")
        icon.setAttribute("class","iconfont")
        liSev[i].appendChild(icon)
        icon.innerHTML = data[i-8].wea_img_night
        //晚上天气
        let pwea = document.createElement("p")
        pwea.setAttribute("class","night-wea")
        liSev[i].appendChild(pwea)
        pwea.innerHTML = data[i-8].wea_night
        //风
        let pWind = document.createElement("p")
        pWind.setAttribute("class","wind")
        liSev[i].appendChild(pWind)
        pWind.innerHTML = data[i-8].win
        //风速
        let pWinSpeed = document.createElement("p")
        pWinSpeed.setAttribute("class","wind-level")
        liSev[i].appendChild(pWinSpeed)
        pWinSpeed.innerHTML = data[i-8].win_speed
        //获取晚上温度
        temData.push(data[i-8].tem_night)
    }
    // le=temData.splice(0,7)
    // console.log(le)
    // data.push(temData)
    return temData
}
//图表绘制
function chart(temData){
   
   window.onresize = adapter;
// 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chart'));
    var option = {
        grid: {
        top:"10%",
        left: '6%',
        right: '6%',
        bottom: '8%',
    },
    xAxis: {
            type: 'category',
            boundaryGap: false,
            axisTick:{
            show:false//不显示坐标轴刻度线
                },
                axisLine: {
                    show: false,//不显示坐标轴线
                },
                axisLabel: {
                    show: false,//不显示坐标轴上的文字
                },
        },
        yAxis: {
            type: 'value',
            splitNumber : 2,
            splitLine:{
             show:false//不显示网格线
            },
            axisTick:{
                show:false//不显示坐标轴刻度线
                },
                axisLine: {
                    show: false,//不显示坐标轴线
                },
                axisLabel: {
                    show: false,//不显示坐标轴上的文字
                },
        },
        series: [{
            stack: '总量',
            data: temData.slice(0,8),
            symbol: 'circle', //折线点设置为实心点
            symbolSize: 6, //折线点的大小
            type: 'line',
            smooth: true,
            itemStyle : {
                normal: {
                    color: "#FFB74D", //折线点的颜色
                    label : {
                        show: true,
                        fontSize: 16,  //设置字体大小
                    },
                    lineStyle:{       
                        width: 2,          
                        color: "#FFB74D" //折线的颜色
                    }
                }

            },
        },{
            stack: '总量',
            data: temData.slice(8,16),
            type: 'line',
            symbol: 'circle', //折线点设置为实心点
            symbolSize: 6, //折线点的大小
            smooth: true,
            itemStyle : { 
                normal: {
                    color: "#4FC3F7", //折线点的颜色
                    label : {
                        show: true,
                        position:"bottom",  //显示位置
                        fontSize: 16,  //设置字体大小
                    },
                    lineStyle:{       
                        width: 2,          
                        color: "#4FC3F7" //折线的颜色
                    }
                }
            },
        }]
    }
   myChart.setOption(option);
};

 //生活指数轮播
var startX,moveX,distanceX,m=0;
//获取大容器宽度  .life---最外层 375px  .life-sug -- 200vw 
var life = document.querySelector(".life")
var lifeWid = life.offsetWidth;
//获取容器
var liBox = document.querySelectorAll(".life-sug")[0];
//轮播点的设置
function setIndicator(m){
    var indicatorUl = document.querySelector(".indicator ul")
    var indicatorLi = indicatorUl.querySelectorAll("li")
    //先清除其他li的样式
    for(var i=0;i<2;i++)
    {
        indicatorLi[i].classList.remove("active")
    }
    //为当前元素添加active样式
    indicatorLi[m].setAttribute("class","active")
}
liBox.addEventListener("touchstart",function(e){
   //获取当前手指的起始位置
   startX = e.targetTouches[0].clientX;
});
//为图片添加触摸事件--滑动过程
liBox.addEventListener("touchmove",function(e){
   //记录手指在滑动过程中的位置
   moveX = e.targetTouches[0].clientX;
   //计算坐标差异
   distanceX = moveX - startX;
   //实现偏移
   liBox.style.left = -m*lifeWid + distanceX + "px"
   //轮播点
   setIndicator(m);
})
//触摸结束之后
liBox.addEventListener("touchend",function(e){
    //如果是第一张且向左滑动或者是第二张向右滑动，在滑动结束时显示原来的图
    if((distanceX<0 && m == 1) ||(distanceX>0 && m == 0))
    {
        liBox.style.left = -m*lifeWid + "px"
    }
   else if(Math.abs(distanceX) > 40){
       //判断滑动方向
       if(distanceX>0){    
           m--;
       }else if(distanceX<0){
           m++;
       }
       //翻页
        liBox.style.left = -m*lifeWid + "px"
        //轮播点
        setIndicator(m)
   }
   else if(Math.abs(distanceX)>0){  //确保用户确实滑动了，而不是点了一下
        //回弹
        //过渡效果
        liBox.style.transition = "left 300ms"
        liBox.style.left = -m*lifeWid + "px"
   }
})


var loc =document.querySelector(".wrapper .location")
var allWra =document.querySelector(".all-wrapper")
var seaWra = document.querySelector(".search-wrapper")
var cancel = document.querySelector(".cancel")
var delet = document.querySelector(".history .iconfont")
loc.addEventListener("touchstart",function(){
    allWra.style.display = "none"
    seaWra.style.display = "block"
})
cancel.addEventListener("touchstart",function(){
    allWra.style.display = "block"
    seaWra.style.display = "none"
})
var seaInput = document.querySelector(".search-input")
seaInput.addEventListener("focus",function(){
    var value = seaInput.value
    if(value){
        seaInput.value = ""
    }
})
seaInput.addEventListener("change",function(){
    var value = seaInput.value
    allWra.style.display = "block"
    seaWra.style.display = "none"
    //改变传入的参数
    // obj.data = value
})
delet.addEventListener("touchstart",function(){
    let li = document.querySelectorAll(".history .city li")
    for(var i=0;i<li.length;i++)
    {
        // li[i].innerHTML = ""
        li[i].remove()
    }
})
