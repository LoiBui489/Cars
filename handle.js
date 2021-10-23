$(document).ready(function () {
    /* gototop */
    $("#gototop").hide()

    $(window).scroll(function () { 
        if ($(this).scrollTop() >= 200)
            $("#gototop").slideDown("slow")
        else
            $("#gototop").slideUp("slow")
    });

    $("#gototop").click(function () { 
        $("html, body").animate({
            scrollTop: 0
        }, 700)

        $(this).animate({
            bottom: "100%"
            }, 700, function() {$(this).css({
                "bottom": "20px"
            });
        })
    });

    /* quick find */
    $("#open").click(function () { 
        $("#close").css("padding", "0px 5px 30px 0px");
        $("#header_container_2 > .contents > ul > #quick_find:hover .subcontent").fadeIn(500);
        $("#header_container_2 #open").hide();
        $("#header_container_2 #close").show();
    });

    $("#close").click(function () {
        $("#header_container_2 > .contents > ul > #quick_find:hover .subcontent").fadeOut(500);
        $("#header_container_2 #open").show();
        $("#header_container_2 #close").hide();
    });

    /* input mileages */
    $("input[type=number]").keydown(function (e) { 
        if (e.code  == "NumpadSubtract" || e.code == "Minus") {
            e.preventDefault();
            return false;
        }
    });

    /* slider */
    let maxPos = String($("#slider_container").css("width"));
    maxPos = Number(maxPos.slice(0, maxPos.indexOf("x") - 1));

    let oldPos;
    let price1;
    let price2;

    $("#handle2 circle, #handle1 circle").mousedown(function (e) { 
        oldPos = e.clientX;
    });

    $("#handle1 circle").mousemove(function (e) { 
        if (e.buttons == 1) {
            var newPos = e.clientX;
            var presentPos = String($("#handle1").css("left"));
            presentPos = Math.round(Number(presentPos.slice(0, presentPos.indexOf("x") - 1)) + newPos - oldPos);
            price1 = presentPos / maxPos * 4300000;
            if (presentPos > 0)  {
                $("#handle1").css("left", `${presentPos}px`);
                oldPos = newPos;
                $(".col_select > h5").html(`$${Math.round(price1).toLocaleString()} - $${Math.round(price2).toLocaleString()}`);
            }
        }
    });

    $("#handle2 circle").mousemove(function (e) { 
        if (e.buttons == 1) {
            var newPos = e.clientX;
            var presentPos = String($("#handle2").css("left"));
            presentPos = Math.round(Number(presentPos.slice(0, presentPos.indexOf("x") - 1)) + newPos - oldPos);
            price2 = presentPos / maxPos * 4300000;
            if (presentPos / (maxPos*0.9) < 1) {
                $("#handle2").css("left", `${presentPos}px`);
                oldPos = newPos;
                $(".col_select > h5").html(`$${Math.round(price1).toLocaleString()} - $${Math.round(price2).toLocaleString()}`);
            }
        }
    });

    /*img_vehicle .menu*/
    $("#img_vehicle .menu a").on("mouseover mouseout", function(){
        $(this).toggleClass("checking");
    });

    $("#img_vehicle .menu a").on("click", function(){
        $("#img_vehicle .menu a.checked").removeClass("checked");
        $(this).addClass("checked");
    });

    $("#img_vehicle .menu a").click(function (e) { 
        e.preventDefault();
        let choosenBrand = $(this).attr("rel");
        let cars = $(".img_menu > div").get();
        if (choosenBrand.toLowerCase() != "all") {
            cars.forEach(car => {
                if ($(car).css("display") == "block") {
                    $(car).fadeOut(700);
                }
                setTimeout(() => {
                    if ($(car).attr("class") == choosenBrand.toLowerCase()) {
                        $(car).fadeIn(700);
                    }
                }, 700);
            });
        } else {
            cars.forEach(car => {
                if ($(car).css("display") == "block") {
                    $(car).fadeOut(700);
                }
                setTimeout(() => {
                    $(car).fadeIn(700);
                }, 700);
            });
        }
    });

    /*img_vehicle img_menu*/
    $(".img_menu").on("mouseenter", "> div", function () {
        $(this).addClass("on");
        $(".on > #popup").css({
            "top": "10%",
            "transition": "top 0.7s",
        });
        $(".on > #detail").css({
            "bottom": "0%",
            "transition": "bottom 0.7s",
        });
    });

    $(".img_menu").on("mouseleave", "> div", function () {
        $(this).removeClass("on");
        $(".img_menu #popup").css("top", "-30%");
        $(".img_menu #detail").css("bottom", "-50%");
    });
    /*popup*/
    $(".img_menu #popup i").click(function () { 
        let srcPopup = $(".img_menu div.on #car_img").attr("src");
        $("#popup_img").attr("src", srcPopup);
        $("#popup_container").css("display", "block");
        $("body").css("overflow", "hidden");
    });

    $("#popup_container").click(function (e) { 
        e.preventDefault();
        $(this).css("display", "none");
        $("body").css("overflow", "scroll");
    });
    /**email */
    $("#email input[type=button]").click(function (e) { 
        e.preventDefault();
        let email = $("#email input[type=email]").val();
        if (email.indexOf("@") == -1) {
            alert("Please enter true email form !!!")
        } else {
            $("#email input[type=email]").val("");
            $("#verify").css("display", "block");
            $("body").css("overflow", "hidden");
        }
    });

    $("#verify input[type=button]").click(function (e) { 
        e.preventDefault();
        let code = $("#verify input[type=number]").val();
        if (code == "123456") {
            alert("Subscribe successful.\nThank you.")
            $("#verify").css("display", "none");
            $("body").css("overflow", "scroll");
        } else {
            alert("Please make sure you enter the right code.")
        }
    });
});