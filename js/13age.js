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

// Adjusting Stats
function modCalc(attr){ return Math.floor((parseInt($("#"+attr).val()) - 10)/2); }
function adjustAC(){
    var c = parseInt($("#conmod").html());
    var d = parseInt($("#dexmod").html());
    var w = parseInt($("#wismod").html());
    $("#ac").html("AC: "+(c+d+w-Math.max(c,d,w)-Math.min(c,d,w)).toString())
}
function adjustPD(){
    var c = parseInt($("#conmod").html());
    var d = parseInt($("#dexmod").html());
    var s = parseInt($("#strmod").html());
    $("#pd").html("&nbsp;PD: "+(c+d+s-Math.max(c,d,s)-Math.min(c,d,s)).toString())
}
function adjustMD(){
    var i = parseInt($("#intmod").html());
    var c = parseInt($("#chamod").html());
    var w = parseInt($("#wismod").html());
    $("#md").html("&nbsp;MD: "+(c+i+w-Math.max(c,i,w)-Math.min(c,i,w)).toString())
}
$("#str").change(function(){
    var newmod = modCalc("str");
    $("#strmod").html(newmod);
    $("#strmodlvl").html(newmod+parseInt($("#level").val()));
    adjustPD();
})
$("#con").change(function(){
    var newmod = modCalc("con");
    $("#conmod").html(newmod);
    $("#conmodlvl").html(newmod+parseInt($("#level").val()));
    adjustAC();
    adjustPD();
})
$("#dex").change(function(){
    var newmod = modCalc("dex");
    $("#dexmod").html(newmod);
    $("#dexmodlvl").html(newmod+parseInt($("#level").val()));
    adjustAC();
    adjustPD();
})
$("#int").change(function(){
    var newmod = modCalc("int");
    $("#intmod").html(newmod);
    $("#intmodlvl").html(newmod+parseInt($("#level").val()));
    adjustMD();
})
$("#wis").change(function(){
    var newmod = modCalc("wis");
    $("#wismod").html(newmod);
    $("#wismodlvl").html(newmod+parseInt($("#level").val()));
    adjustAC();
    adjustMD();
})
$("#cha").change(function(){
    var newmod = modCalc("cha");
    $("#chamod").html(newmod);
    $("#chamodlvl").html(newmod+parseInt($("#level").val()));
    adjustMD();
})
