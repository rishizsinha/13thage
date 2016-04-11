var $controlledByButtons = $('#level');
$controlledByButtons.updown({
    step: 1,
    shiftStep: 100
});
var $updown = $controlledByButtons.data('updown');
$('#levelup').click(function(event){
    $updown.increase(event);
    $updown.triggerEvents();
});
$('#leveldown').click(function(event){
    $updown.decrease(event);
    $updown.triggerEvents();
});

function modCalc(attr){ return Math.floor((parseInt($("#"+attr).val()) - 10)/2); }

$("#str").change(function(){
    var newmod = modCalc("str");
    $("#strmod").html(newmod);
    $("#strmodlvl").html(newmod+parseInt($("#level").val()));
})
$("#con").change(function(){
    var newmod = modCalc("con");
    $("#conmod").html(newmod);
    $("#conmodlvl").html(newmod+parseInt($("#level").val()));
})
$("#dex").change(function(){
    var newmod = modCalc("dex");
    $("#dexmod").html(newmod);
    $("#dexmodlvl").html(newmod+parseInt($("#level").val()));
})
$("#int").change(function(){
    var newmod = modCalc("int");
    $("#intmod").html(newmod);
    $("#intmodlvl").html(newmod+parseInt($("#level").val()));
})
$("#wis").change(function(){
    var newmod = modCalc("wis");
    $("#wismod").html(newmod);
    $("#wismodlvl").html(newmod+parseInt($("#level").val()));
})
$("#cha").change(function(){
    var newmod = modCalc("cha");
    $("#chamod").html(newmod);
    $("#chamodlvl").html(newmod+parseInt($("#level").val()));
})
