<!DOCTYPE html>
<html>
    <head>
        <meta charset="{CHARSET}">
        <title></title>
        <script>
            var Debugger = function () { 
            };
            //开关，是否显示输出
            Debugger.switch = true;
            Debugger.log = function (message){
                try{
                    if(Debugger.switch){
                        console.log(message);
                    }                  
                }catch(exception){
                    return 'Error:the function  log is not exist.';
                }
            }
             
             
            var name = '日程';
             
            //会在控制台输出'音乐586'
            Debugger.log(name);
             
            //如果你不想有输出，把开关关了即可
            Debugger.switch = false;
             
            Debugger.log(name);//控制台不再输出name
        </script>
    </head>
    <body>
    </body>
</html>