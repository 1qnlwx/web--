$(function(){
const initArtiCateList=()=>{
    $.ajax({
        type:"GET",
        url:"/my/article/cates",
        success:res=>{
            // console.log(res);
const htmlStr=template('tpl-table',res)
$("tbody").empty().html(htmlStr);
        }
})
}
const layer = layui.layer;
let indexAdd = null;
$("#btnAddCate").click(() => {
    indexAdd = layer.open({
        type: 1,
        area: ["500px", "250px"],
        title: "添加文章分类",
        content: $("#dialog-add").html(),
    });
});
// 通过代理监听 submit 事件
$("body").on("submit", "#form-add", function (e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "/my/article/addcates",
        data: $(this).serialize(),
        success: (res) => {
            if (res.status !== 0) return layer.msg("新增分类失败！");
            initArtiCateList();
            layer.msg("新增分类成功！");
            layer.close(indexAdd);
        },
    });
});
let indexEdit = null;
$('tbody').on('click','.btn-edit',function(){
    indexEdit=layer.open({
        type: 1,
        area: ["500px", "250px"],
        title: "添加文章分类",
        content: $("#dialog-edit").html(),
    })
const id =$(this).attr('data-id')
$.ajax({
    type:"GET",
    url:"/my/article/cates/"+id,
    success:res=>{
        if(res.status!==0) layer.msg('res.message')
        layui.form.val('form-edit',res.data)
    }
})
})
$('body').on('submit','#form-edit',function(e){
    e.preventDefault()
            console.log($(this).serialize());

    $.ajax({
        type:"POST",
        url:"/my/article/updatecate",
        data:$(this).serialize(),
        success:res=>{
            if(res.status) return layer.msg(res.message)
            layer.msg('更改信息成功')
            initArtiCateList()
            layer.close(indexEdit)
        }
    })
})

$('tbody').on('click','.btndel',function(){
    const id=$(this).attr('data-id')
    layer.confirm("确定删除吗？", { icon: 3, title: "提示" }, function (index) {
$.ajax({
    type:'GET',
    url:"/my/article/deletecate/"+id,
    success:res=>{
        if(res.status!==0) return layer.msg(res.message)
        layer.msg('删除分类成功')
        layer.close(index)
        initArtiCateList();
    }
})
    })
})



initArtiCateList()
})