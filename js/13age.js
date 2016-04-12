
// Adjusting Race
$("#race").change(function(){
    console.log($("#race").val());
    $("#raceBonus").html("");
    $.getJSON("http://rishizsinha.github.io/13thage/data/races.json?callback=")
        .done(function(data){
            var r = $.grep(data, function(e){return e.race==$("#race").val();})[0];
            for (var i in r.bonus) {
                $("#raceBonus").append("<button type='button' class='btn btn-secondary'>"+
                    r.bonus[i].toUpperCase()+"</button>");
            }
        });
    console.log("ok");
    $("#raceBonus").on("click", "button", (function(){
        $(this).removeClass("btn-secondary").addClass("btn-success");
        $("#raceBonus button").not(this).removeClass("btn-success")
            .removeClass("btn-secondary").addClass("btn-secondary");
    }));
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
});

// Gold
$("#goldAmt").change(function(){
    var n = $("#goldAmt").val()
    if (n == 1) {
        $("#goldPic")[0].src = "img/1gold.png";
    } else if (n == 2) {
        $("#goldPic")[0].src = "img/2gold.png";
    } else if (n == 3) {
        $("#goldPic")[0].src = "img/3gold.png";
    } else if (n == 4) {
        $("#goldPic")[0].src = "img/4gold.png";
    } else if (n < 25) {
        $("#goldPic")[0].src = "img/5gold.png";
    } else if (n < 100) {
        $("#goldPic")[0].src = "img/25gold.png";
    } else if (n < 250) {
        $("#goldPic")[0].src = "img/100gold.png";
    } else if (n < 500) {
        $("#goldPic")[0].src = "img/250gold.png";
    } else if (n < 1000) {
        $("#goldPic")[0].src = "img/1kgold.png";
    } else if (n >= 1000) {
        $("#goldPic")[0].src = "img/10kgold.png";
    }
});

// Add Item
$("#addItem").click(function(){
    $(this).before("<input type='text'><br>")
})

// Logging
$("#enterLog").click(function(){
    var s = $("#newEntry").val().split("\n").join("<br />");
    console.log(s);
    $("#logHistory").prepend("<div style='border-style:double; margin-top:10px; margin-bottom:10px'><p>"+s+"</p></div>");
    $("#newEntry").val("");
})
// $("#newEntry").keyup(function(event){
//     if(event.keyCode == 13 && $.trim($("#newEntry").val()).length>0){
//         $("#enterLog").click();
//     }
// });

