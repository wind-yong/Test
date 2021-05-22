
function myAjax(obj){
    //默认
    var defaults = {
        type:"get",
        url:"#",
        dataType:"json",
        data:{}, //参数
        async:true,
        success:function(result){
            console.log(result);
        }
    } 
    for(var key in obj){
        defaults[key] = obj[key];
    }
    console.log(defaults)
    var xhr = new XMLHttpRequest();

    //得到parmas
    var parmas = "";
    for(var attr in defaults.data){
        parmas += attr + "=" + defaults.data[attr] + "&";
    }
    if(parmas){
        parmas = parmas.substring(0,parmas.length-1);
    }
    //类型
    if(defaults.type == "get")
    {
        defaults.url += "?" + parmas;
    }
    xhr.open(defaults.type,defaults.url,defaults.async);
    //发送
    if(defaults.type == "get")
    {
        xhr.send()
    }
    else if(defaults.url == "post"){
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
        xhr.send(parmas)
    }
    //同步异步
    if(defaults.async){
        xhr.onreadystatechange = function(){
            if(xhr.readyState===4){
                if(xhr.status<300 && xhr.status >=200){
                    var result = null;
                    if(defaults.dataType == "json"){
                        result = xhr.response;
                        result = JSON.parse(result);
                    }else if(defaults.dataType == "xml"){
                        result = xhr.responseXML
                    }else{
                        result = xhr.responseText;
                    }
                    defaults.success(result);
                }
            }
        }
        
    }
    else{
        if(xhr.readyState===4){
                if(xhr.status<300 && xhr.status >=200){
                    var result = null;
                    if(defaults.dataType == "json"){
                        result = xhr.response;
                        result = JSON.parse(result);
                    }else if(defaults.dataType == "xml"){
                        result = xhr.responseXML
                    }else{
                        result = xhr.responseText;
                    }
                    defaults.success(result);
                }
            }
        }

}
