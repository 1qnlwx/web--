$(function(){
const form=layui.form
form.verify({
    nickname:(val)=>{
        if(val.length>6) return '昵称长度必须在 1 ~ 6 个字符之间！'
    }

})

const inUserInfo=()=>{
$.ajax({
    type:'GET',
    url:"/my/userinfo",
    success:res=>{
        console.log(res);
        if(res.status!==0)return layer.msg(res.message)
        form.val('formUserInfo',res.data)

    }
})
}
inUserInfo()
$('#btnRend').on('click',e=>{
e.preventDefault()
inUserInfo()
})
$('.layui-form').on('submit',function(e){
    e.preventDefault()
    $.ajax({
        type:"POST",
        url:"/my/userinfo",
        data:$(this).serialize(),
        success:res=>{
            if(res.status!==0) return layer.msg(res.message)
            layer.msg('修改信息成功')
            window.parent.getUserInfo()
            
        }
    })
})




})