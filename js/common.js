
$(".search>a").click(function(){  
    $("#slide_menu").addClass('on'); 
    $(".bg").addClass('on'); 
});
$(".back_num").click(function(){  
  $("#slide_menu").removeClass('on');
  $(".bg").removeClass('on');
});


$(".btnBlueGreen").click(function(){  
  var str  = "";
  str = $(".input_num").val();
  var sentence = str.length;

  var btn_num = "";
  btn_num = this.innerHTML;


  $(".input_num").val(str+btn_num);
  if(btn_num == 'close'){
    $(".input_num").val("");
  }else if(btn_num == 'arrow_back'){
    $(".input_num").val(str.substring(0,sentence-1));
  }else{
    var btn_num = "";
    btn_num = this.innerHTML;
  }
});


$(".fix_history>a").click(function(){  
  $("#fhi_menu").addClass('on'); 
  $(".backg").addClass('on'); 
});
$(".back_num").click(function(){  
$("#fhi_menu").removeClass('on');
$(".backg").removeClass('on');
});

function getCheckboxValue()  {


  const query = 'input[name="fix"]:checked';

  const selectedEls = 

      document.querySelectorAll(query);

  

  let result = '';

  selectedEls.forEach((el) => {

    result += el.value + ' ';

  });

  

  document.getElementById('result').innerText

    = result;

}
$(".request").click(function(){  
  $("#popup_wrap").addClass('show'); 
});



$(function(){
  $('.tabMenu>li>a').click(function(){
      $(this).parent().addClass("active").siblings().removeClass("active");
  	 return false;
  
    });
  });
  $("li.box_tit a").click(function(){
    // console.log($(this));
    if($(this).parent().hasClass("active"))
        $(this).parent().removeClass("active");
    else
        $(this).parent().addClass("active");
});

$(".box_tit ul li label").click(function(){
    var $this = $(this);
    setTimeout(function(){
        var checkbox =$this.parent().find("input");
        // console.log(checkbox);
        var checkbox_val = checkbox.val();
        var checkbox_idx = checkbox.data("idx");
        var repairtext = $this.text();
        var textarea=''
        var totalleadtime=0;
        var textlist = new Array();
        var vallist = new Array();
        var notelist = new Array();
        var leadtimelist = new Array();
        var repairhtml = $("#repair").children("tbody");
        

        if(checkbox.is(":checked")==false)
        {
            var repairvallist = $("input[name=repair]");
            repairvallist.each(function(){
                console.log("checkbox_val:"+checkbox.val()+" / "+ $(this).val());
                var repairseq = $(this).parent().find("input[name=repairseq]");
                if($(this).val() == checkbox.val())
                {
                    // console.log("SEQ :"+$(this).parent().find("input[name=repairseq]").val());
                    $(this).parent().remove();
                    if(repairseq.val()!="")
                            DeleteRepair(repairseq.val());
                }
                
            });
        }
        else
        {
            var html='';
            // var childCount = repair.children().length;
            html+="<tr id='repair_"+(checkbox_idx)+"'>";
            html+="<td>"+repairtext+"</td>";
            html+="<td>";
            html+="<label class='f_selectsmall'><select id='chk_repair_"+checkbox_idx+"' name='chk_repair' >";
            html+="<c:forEach var='i' items='${autome}' varStatus='status'><option value='<c:out value='${i.CODE}'/>'><c:out value='${i.NAME}'/></option></c:forEach>";
            html+="</select></label>";
            html+="</td>";
            // html+="<td>"+$(this).data("time")+"</td>";
            // html+="<td><input type='text' class='f_txtsmall' name='note' id='note' placeholder='비고' value=''/></td>";
            html+="<input type='hidden' name='repair' id='repair' value='"+checkbox_val+"'/>";
            html+="</tr>";
            repairhtml.append(html);
        }
    },200)

});
function fn_egov_cancel_popup() {

  parent.fn_egov_modal_remove();
}

function SaveReceive(){

      if($("#estime").val() == "")
      {
          alert("소요시간을 입력해 주세요");
          $("#estime").focus();
          return;
      }

      if($("#autoroom option:selected").val() == "all")
      {
          alert("배정하실 작업반을 선택해 주세요");
          // $("#estime").focus();
          return;
      }

      //수리항목 리스트화
      var array = new Array();
  $('input[name=repair]').each(function(index) {
    array.push($(this).val());
    
  });
  $("#repairlist").val(array);
      if($("#repairlist").val()==null||$("#repairlist").val()=='')
      {
          alert("추가된 수리사항이 없습니다. 수리사항을 추가해 주세요.");
          return;
      }

      //수리종류 리스트화
      var array = new Array();
  $('select[name=chk_repair]').find("option:selected").each(function(index) {
    array.push($(this).val());
    
  });
  $("#chkrepairlist").val(array);
      if($("#chkrepairlist").val()==null||$("#chkrepairlist").val()=='')
      {
          alert("추가된 수리사항이 없습니다. 수리사항을 추가해 주세요.");
          return;
      }

      //수리항목 repairseq 리스트화
      var array = new Array();
  $('input[name=repairseq]').each(function(index) {
    array.push($(this).val());
    
  });
  $("#repairseqlist").val(array);

      // console.log($("#chkrepairlist").val());
      // console.log($("#repairlist").val());
      // console.log($("#notelist").val());
      



   document.SmartTabletVo.action = "<c:url value='/tablet/SaveReceive.do'/>";
   //document.SmartTabletVo.submit();
   
   $.ajax({
            type: "POST",
            url: "SaveReceive.do",
            data: $("#SmartTabletVo").serialize(),
            success: function (result) {
                if(result==1)
                {
                    alert("배정이 완료되었습니다.");
                    parent.reload();
                    fn_egov_cancel_popup();
                    
                }
                    
                else
                {
                    alert("다시 시도해 주세요");
                    fn_egov_cancel_popup();
                }
            },
            
        });
}

  var deleteArr = new Array();
  function DeleteRepair(repairseq='')
  {
      if(repairseq != '')
      {
          deleteArr.push(repairseq);
          $("#deletelist").val(deleteArr);
      }
      // $("tr#repair_"+i).remove();

  }
  
  function maxLengthCheck(estime){
    if(estime.value.length>estime.maxLength){
      alert("소요시간(분)최대길이는 3자리입니다.");
      estime.value="";
      return;
    }
  }