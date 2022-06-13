window.addEventListener('load',function(){

    $(function(){
        // 初始化右侧滚动条
        // 这个方法定义在scroll.js中
        resetui();

    //输入框
    var input_txt=document.querySelector('.input_txt');
    //聊天信息ul
    var ul=document.querySelector('.talk_list');  
    //发送按钮
    var FSbtn=document.querySelector('.input_sub');  
    FSbtn.addEventListener('click',function(){
        gettxt();
    })


    window.addEventListener('keydown',function(event){
        if(event.keyCode === 13) { 
            //点击回车要执行的事件
            gettxt();
         }
    })

    //获取机器人的消息
      function gettxt(){
        var txt=input_txt.value;
        if(txt!=''){
            $('.talk_list').append('<li class="right_word"><img src="img/person02.png" /> <span>'+txt+'</span></li>');
            input_txt.value='';
            input_txt.focus();
            $.ajax({
                type:'get',
                url:'http://www.liulongbin.top:3006/api/robot',
                data:{
                    spoken:txt
                },
                success:function(res){
                    if(res.message=='success'){
                        var roobottxt=res.data.info.text;
            $('.talk_list').append('<li class="left_word"><img src="img/person01.png" /> <span>'+roobottxt+'</span></li>');

                       getyytxt(roobottxt);
                            }
                    resetui();//重置滚动条
                }
            })
    
            resetui();//重置滚动条
        }
      }

    //获取机器人的语音消息
    function getyytxt(txt){
        $.ajax({
                  method: 'GET',
                  url: 'http://www.liulongbin.top:3006/api/synthesize',
                  data: {
                    text:txt
                  },
                  success: function (res) {
                    // 如果请求成功，则 res.voiceUrl 是服务器返回的音频 URL 地址
                    if (res.status === 200) {
                        $('#voice').attr('src', res.voiceUrl)
                    }
                  }
                })
            
    }



      })
})