/* 
    OpenSlide HCJS.
    Versão: 1.0
    Created on : 10/02/2017, 02:49:16
*/
var configOS = {
    'Start_time': 0, //Deley para o slide começar a funcionar. 1000 é igual a 1 segundo.
    'Delay_slide': 2000, //Delay entre cada apresentação de slide 1000 é igual a 1 segundo.
};


//Dessa linha a baixo mexa apenas se você souber!
var slides = $('.box-slide');
var valSlides = slides.length;
console.log(valSlides);
var needleSlide = 0;
var clock_timer_slide;
var timer_slide;
var boxIS = $('#info-slide'); //Objeto referente ao info-slide.
var desc_openslide = $('#desc-open-slide'); //Objeto referente a descrisão no info-slide

$('head').append('<link rel="stylesheet" type="text/css" href="slide.css">');

function loadOpenSlide() {
    $(slides[0]).removeClass('hidden-slide');
    $(slides[0]).addClass('show-slide');
    alter_info_slide(slides[0]);
}


function alter_info_slide(s) {
    $('.title-slide').html($(s).attr("data-title"));
    $('.desc-slide').html($(s).attr("data-desc"));
    $('.urlofslide').attr('href',$(s).attr("data-url"));
    $('.cont-slide').html((needleSlide + 1) + ' / ' + valSlides);
}

function next_slide() {
    if (needleSlide + 1 == valSlides) {
        $(slides[needleSlide]).removeClass('show-slide');
        $(slides[needleSlide]).addClass('hidden-slide');
        needleSlide = 0;
        $(slides[0]).removeClass('hidden-slide');
        $(slides[0]).addClass('show-slide');
        alter_info_slide(slides[0]);
    } else {
        $(slides[needleSlide]).removeClass('show-slide');
        $(slides[needleSlide]).addClass('hidden-slide');
        needleSlide++;
        $(slides[needleSlide]).removeClass('hidden-slide');
        $(slides[needleSlide]).addClass('show-slide');
        alter_info_slide(slides[needleSlide]);
    }
}

function back_slide() {
    console.log(needleSlide);
    if ((needleSlide - 1) == -1) {
        $(slides[needleSlide]).removeClass('show-slide');
        $(slides[needleSlide]).addClass('hidden-slide');
        needleSlide = valSlides - 1;
        $(slides[needleSlide]).removeClass('hidden-slide');
        $(slides[needleSlide]).addClass('show-slide');
        alter_info_slide(slides[needleSlide]);
    } else {
        $(slides[needleSlide]).removeClass('show-slide');
        $(slides[needleSlide]).addClass('hidden-slide');
        needleSlide--;
        $(slides[needleSlide]).removeClass('hidden-slide');
        $(slides[needleSlide]).addClass('show-slide');
        alter_info_slide(slides[needleSlide]);
    }
}

timer_slide = function timer_slide() {
    clock_timer_slide = setInterval(function () {
        next_slide();
        
    }, configOS.Delay_slide);
};

function restart_timer_slide() {
    clearInterval(clock_timer_slide);
    timer_slide();
}
function stop_timer_slide() {
    clearInterval(clock_timer_slide);
}

/*Controlador de slides*/
/*next*/
$('#btn-next-slide').click(function () {
    next_slide();
    restart_timer_slide();
});
/*back*/
$('#btn-back-slide').click(function () {
    back_slide();
    restart_timer_slide();
});


/*Controle do box informacional do OpenSlide*/
function control_infoSlide(op) {
    
    if (op == 'h') {
        $(boxIS).removeAttr('class');
        $(boxIS).attr('class','info-slide');
        $(desc_openslide).removeAttr('class');
        $(desc_openslide).attr('class','desc-open-slide-off');
    }else if (op == 'f'){
        $(boxIS).removeAttr('class');
        $(desc_openslide).removeAttr('class');
        $(desc_openslide).attr('class','desc-open-slide-on');
        $(boxIS).attr('class','info-slide-all');
        setTimeout(function () {
            $(boxIS).removeAttr('class');
            $(boxIS).attr('class','info-slide-all-fix');
        },1060);
    }
}
$('#info-slide').mouseover(function () {  
   stop_timer_slide();
}).mouseout(function () {
    timer_slide();
});
/*Controlador de expansão*/
$("#btn-close-info-slide").click(function () {
    var op = $(this).html();
    if (op == '+') {
        $(this).html('-');
        control_infoSlide('f');
    }else if (op == '-'){
        $(this).html('+');
        control_infoSlide('h');
    }
});


/*Inicializador*/
setTimeout(function () {
    loadOpenSlide();
    timer_slide();
}, configOS.Start_time);
 
