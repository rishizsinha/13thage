
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
            rdie = data["recovery_die"]
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
function adjustRecovery(){
    var l = $("#level").val();
    var c = $("#conmod").html()
    $("#recoverydie").html("("+rdie+"x"+l+" + "+c+")")
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
    adjustRecovery();
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
    $("#numafs").html(calcAFs())
    $("#numtalents").html(calcTalents())
    $("#numcfs").html(calcCFs())
    $("#numefs").html(calcEFs())
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

// Powers
var talents = []
var afs = []
var cfs = []
var efs = []
function calcTalents() {
    if ($("#classs").val() == "Sorcerer"){
        return 3 - talents.length;
    } else {
        return 3
    }
}
function calcAFs() {
    var l = parseInt($("#level").val());
    if (l < 4) {
        return l - afs.length;
    } else {
        return 4 - afs.length;
    }
}
function calcCFs() {
    var l = parseInt($("#level").val());
    if (l < 5) {
        return 0;
    } else if (l < 7) {
        return l-4 - cfs.length;
    } else {
        return 3-cfs.length;
    }
}
function calcEFs() {
    var l = parseInt($("#level").val());
    if (l < 8) {
        return 0;
    } else {
        return l-7 - efs.length
    }
}

function loadPower(from, to, isclass) {
    if (!isclass) {
        $.getJSON("http://rishizsinha.github.io/13thage/data/"+from+".json")
            .done(function(data){
                for (var i in data) {
                    $("#"+to).append(createPower(data[i]));
                }
            }).fail( function(d, textStatus, error) {
                console.error("getJSON failed, status: " + textStatus + ", error: "+error)
            });
    } else {
        return 4;
    }
}
function createPower(power){
    var s = "<div id='"+power["ability"].replace(/\s+/g, '')+"'style='border-style:solid; font-family:fantasy;margin-bottom:40px'><h3 class='ib'>"+power["ability"]+"</h3><div class='ib' style='border-radius:50%;width:20px;height:20px;background:green'></div><div class='ib' style='border-radius:50%;width:20px;height:20px;background:green'></div><div class='ib' style='border-radius:50%;width:20px;height:20px;background:green'></div><p style='margin-bottom:20px'>"+power["text"]+"</p>"
    if (power['af'] != "") {
        s += "<div class='af' style='border-style:solid;font-family:fantasy;margin:0 auto;width:98%;margin-bottom:5px;'>Adventurer Feat:"+power['af']+"</div>"
    }
    if (power['cf'] != "") {
        s += "<div class='cf' style='border-style:solid;font-family:fantasy;margin:0 auto;width:98%;margin-bottom:5px;'>Chamption Feat:"+power['cf']+"</div>"
    }
    if (power['ef'] != "") {
        s += "<div class='ef' style='border-style:solid;font-family:fantasy;margin:0 auto;width:98%;margin-bottom:5px;'>Epic Feat:"+power['ef']+"</div></div>"
    }
    return s;
}
$("#powerinfo").on("click", ".af", function(){
    var i = this.parentElement.id;
    if (afs.indexOf(i) > -1) {
        afs.splice(afs.indexOf(i), 1)
    } else if (calcAFs() > 0) {
        afs.push(i); 
    }
    $("#numafs").html(calcAFs())
});
$("#powerinfo").on("click", ".cf", function(){
    var i = this.parentElement.id;
    if (cfs.indexOf(i) > -1) {
        cfs.splice(cfs.indexOf(i), 1)
    } else if (calcCFs() > 0) {
        cfs.push(i); 
    }
    $("#numcfs").html(calcCFs())
});
$("#powerinfo").on("click", ".ef", function(){
    var i = this.parentElement.id;
    if (efs.indexOf(i) > -1) {
        efs.splice(efs.indexOf(i), 1)
    } else if (calcEFs() > 0) {
        efs.push(i); 
    }
    $("#numefs").html(calcEFs())
});
loadPower("generalfeats","generalinfo",false);

// Logging
$("#enterLog").click(function(){
    if ($.trim($("#newEntry").val()).length>0){
        var s = $("#newEntry").val().split("\n").join("<br/>");
        console.log(s);
        $("#logHistory").append("<div style='border-style:double; margin-top:10px; margin-bottom:10px'><p>"+s+"</p></div>");
        $("#newEntry").val("");
        // $("#logHistory").scrollTop($("#logHistory")[0].scrollHeight);
        $('#logHistory').stop().animate({
          scrollTop: $('#logHistory')[0].scrollHeight
        }, 800);
    }
})
// $("#newEntry").keyup(function(event){
//     if(event.keyCode == 13 && $.trim($("#newEntry").val()).length>0){
//         $("#enterLog").click();
//     }
// });

// Saving
function saveCharacter() {
    var mychar = {
        "name":$("#name").val(),
        "race":$("#race").val(),
        "classs":$("#classs").val(),
        "level":$("#level").val(),
        "cha":$("#cha").val(),
        "dex":$("#dex").val(),
        "int":$("#int").val(),
        "wis":$("#wis").val(),
        "str":$("#str").val(),
        "con":$("#con").val(),
        "gp":$("#goldAmt").val(),
        "curhp":$("#curhp").val(),
        "currecoveries":$("#currecoveries").val(),
        "maxrecoveries":$("#maxrecoveries").val(),
        "story":[

        ]
    };
    $("#logHistory").find("p").each(function(){
        mychar["story"].push($(this).html())
    })
    var textToWrite = JSON.stringify(mychar);
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
    var fileNameToSaveAs = $("#saveName").val();

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null)
    {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else
    {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
}
$("#saveButton").click(function(){
    saveCharacter();
});

function saveStory() {
    var story = ""
    $("#logHistory").find("p").each(function(){
        story = story.concat($(this).html()+"\n---\n")
    })
    console.log(story);
    var textToWrite = story;
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
    var fileNameToSaveAs = $("#storytitle").val();

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null)
    {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else
    {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
}
$("#downloadstory").click(function(){
    saveStory();
})
$("#storytitle").keyup(function(event){
    if (event.keyCode == 13 && $.trim($("#storytitle").val()).length>0){
        $("#downloadstory").click();
    }
});

//Loading
function loadFile()
{
    var fileToLoad = document.getElementById("fileToLoad").files[0];

    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent) 
    {
        var mychar = JSON.parse(fileLoadedEvent.target.result);
        console.log(mychar);
        $("#name").val(mychar["name"]);
        $("#race").val(mychar["race"]);
        $("#classs").val(mychar["classs"]);
        console.log($("#classs").val());
        $("#cha").val(mychar["cha"]);
        $("#dex").val(mychar["dex"]);
        $("#int").val(mychar["int"]);
        $("#wis").val(mychar["wis"]);
        $("#str").val(mychar["str"]);
        $("#con").val(mychar["con"]);
        $("#goldAmt").val(mychar["gp"]);
        $("#curhp").val(mychar["curhp"]);
        $("#currecoveries").val(mychar["currecoveries"]);
        $("#maxrecoveries").val(mychar["maxrecoveries"]);
        $("#level").change();
        $("#race").change();
        $("#classs").change();
        console.log("K");
        var story = mychar["story"].reverse();
        for (var i in story) {
            console.log(story[i])
            $("#logHistory").prepend("<div style='border-style:double; margin-top:10px; margin-bottom:10px'><p>"+story[i]+"</p></div>");
        }
    };
    fileReader.readAsText(fileToLoad, "UTF-8");
}
$("#loadButton").click(function(){
    console.log("Click");
    loadFile();
});


