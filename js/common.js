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

  //this.innerHTML;

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

