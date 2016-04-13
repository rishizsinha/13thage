
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

// Adjusting Class

$("#classs").change(function(){
    console.log($("#classs").val());
    $.getJSON("http://rishizsinha.github.io/13thage/data/"+$("#classs").val().toLowerCase()+".json?callback=")
        .done(function(data){
            console.log(data["base_hp"]);
            hpbase = parseInt(data["base_hp"]);
            acbase = parseInt(data["ac_light"]);
            pdbase = parseInt(data["base_pd"]);
            mdbase = parseInt(data["base_md"]);
            $("#level").change();
            $("#classBonus").html("");
            for (var i in data["class_bonus"]) {
                $("#classBonus").append("<button type='button' class='btn btn-secondary'>"+
                    data["class_bonus"][i].toUpperCase()+"</button>");
            }
        });
    $("#classBonus").on("click", "button", (function(){
        $(this).removeClass("btn-secondary").addClass("btn-success");
        $("#classBonus button").not(this).removeClass("btn-success")
            .removeClass("btn-secondary").addClass("btn-secondary");
    }));
    // if ($("#classs").val() == "Sorcerer") {
    //     $.getJSON("http://rishizsinha.github.io/13thage/data/sorcerer.json?callback=")
    //         .done()
    // }
});

// Adjusting Stats
function modCalc(attr){ return Math.floor((parseInt($("#"+attr).val()) - 10)/2); }
function adjustAC(){
    var c = parseInt($("#conmod").html());
    var d = parseInt($("#dexmod").html());
    var w = parseInt($("#wismod").html());
    var l = parseInt($("#level").val());
    $("#ac").html("&nbsp;AC: "+(acbase+l+c+d+w-Math.max(c,d,w)-Math.min(c,d,w)).toString()+"&nbsp;")
}
function adjustPD(){
    var c = parseInt($("#conmod").html());
    var d = parseInt($("#dexmod").html());
    var s = parseInt($("#strmod").html());
    var l = parseInt($("#level").val());
    $("#pd").html("&nbsp;PD: "+(pdbase+l+c+d+s-Math.max(c,d,s)-Math.min(c,d,s)).toString()+"&nbsp;")
}
function adjustMD(){
    var i = parseInt($("#intmod").html());
    var c = parseInt($("#chamod").html());
    var w = parseInt($("#wismod").html());
    var l = parseInt($("#level").val());
    $("#md").html("&nbsp;MD: "+(mdbase+l+c+i+w-Math.max(c,i,w)-Math.min(c,i,w)).toString()+"&nbsp;")
}
var hpmultipliers = [0, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24]
function adjustMaxHP(){
    var diff = parseInt($("#maxhp").html())-parseInt($("#curhp").val());
    var mult = hpmultipliers[parseInt($("#level").val())]
    var mod = parseInt($("#conmod").html());
    var total = (hpbase+mod)*mult;
    $("#maxhp").html(total);
    $("#curhp").val(total-diff);
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
    adjustMaxHP();
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
$("#level").change(function(){
    $("#dex").change();
    $("#cha").change();
    $("#int").change();
    $("#wis").change();
    $("#con").change();
    $("#str").change();
    adjustMaxHP();
});

// Gold
$("#goldAmt").change(function(){
    var n = $("#goldAmt").val()
    if (n == 0) {
        $("#goldPic")[0].src = "img/0gold.png";
    } else if (n == 1) {
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
var itemcount = 0
$("#addItem").click(function(){
    $("#inventoryspace").prepend("<div class='col-md-4' id='item"+itemcount+"' style='margin-bottom:10px'><div class='input-group'><input type='text' class='form-control'><span class='input-group-btn'><button type='button' class='btn btn-default' id='item"+itemcount+"Remove'>x</button></span></div></div>");
    itemcount += 1;    
});
$
$("#inventoryspace").on("click", "button", function(){
    var id = $(event.target)[0].id.replace("Remove","");
    $("#"+id).remove();
});


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

