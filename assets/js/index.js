function getUserInfo(){
    $.ajax({
        type:"GET",
        url:"/my/userinfo",
        success:res=>{{
            // console.log(res);
            if(res.status!==0){
                return layer.msg(res.message)
            }
            layer.msg('信息获取成功')
            console.log(res);
            renderAvtar(res.data)
        }}
    })
}


const renderAvtar=(user)=>{
    // console.log(user);
    let uname=user.nickname||user.username
    // console.log(uname);
    $('#welcome').html(`欢迎 ${uname}`)
    if(user.user_pic!==null){
        $('.layui-nav-img').attr('src',user.user_pic)
        $('.text-avatar').hide()
    }else{
        $('.text-avatar').html(uname[0].toUpperCase())
        $('.layui-nav-img').hide()
    }
}
$('#btnlogout').click(()=>{
    layui.layer.confirm(
        "确定退出登录？",
        { icon: 3, title: "提示" },
    function(index){
        localStorage.removeItem('token')
        location.href = "/login.html";
    })
})



getUserInfo()
function change(){
    $('#change').attr('class','layui-this').next().attr('class','')
}