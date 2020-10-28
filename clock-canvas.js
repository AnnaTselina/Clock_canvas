var cnvs = document.getElementById('clock');
cnvs.width = 600;
cnvs.height = 600;
var ctx = cnvs.getContext('2d');
var center = cnvs.width/2; //координата центра круга
var distance = cnvs.width/2/6*5; //расстояние от центра большого круга до маленьких
var littleCircleRadius = 40; //радиус маленьких кругов
var angleThirty = 30; //угол, через который будут находиться элементы
var angleSix = 6; //1 секунда = 6 градусов
var strokeEnd = -10; // отступ кончика стрелки

//толщина стрелок
var secondWidth = 4;
var minuteWidth= 8;
var hourWidth = 12;

//рисуем то, что будет всегда(циферблат)
const drawStatic = () => {
    //рисуем большой круг
    ctx.beginPath()
    ctx.arc(center, center, (center - 1), 0, 2 *Math.PI, false);
    ctx.fillStyle = '#ebd0ab';
    ctx.fill();
    ctx.lineWidth = 1; //толщина линии
    ctx.strokeStyle = '#ebd0ab';
    ctx.stroke();
    
    for (let i=1; i<=12; ++i) {
        var angle = i*angleThirty/180*Math.PI;
    
        //координаты центров маленьких кругов
        var littleCircleX = center + distance*Math.sin(angle);
        var littleCircleY = center - distance*Math.cos(angle);
    
       //рисуем маленькие круги
        ctx.beginPath()
        ctx.arc(littleCircleX, littleCircleY, littleCircleRadius, 0, 2 *Math.PI, false);
        ctx.fillStyle = '#a84900';
        ctx.fill();
        ctx.lineWidth = 1; //толщина линии
        ctx.strokeStyle = '#a84900';
        ctx.stroke();
    
        //рисуем цифры в кругах
        ctx.beginPath()
        ctx.fillStyle = 'black';
        ctx.strokeStyle = 'black';
        ctx.font = "24px Georgia";
        ctx.textAlign = "center";
        ctx.textBaseline = 'middle';
        ctx.fillText(i, littleCircleX, littleCircleY);
        ctx.stroke();
    }
    }
drawStatic();

const tick = () => { 
//функция создания стрелок
const drawStroke = (length, angle) => {
            ctx.save(); //сохраняем положение всего что нарисовано
            ctx.lineCap = 'round';
            ctx.beginPath();            
			ctx.translate(center, center); //начало стрелки в центре
			ctx.rotate(-180 * Math.PI/180); // корректировка на 180
			ctx.rotate(angle * Math.PI/180);
			ctx.moveTo(0, strokeEnd);
			ctx.lineTo(0, length);
			ctx.stroke();
			ctx.closePath();
            ctx.restore(); //восстанавливаем предварительно сохраненную картинку            
            }

ctx.clearRect(0, 0, cnvs.width, cnvs.height); //очищаем область
drawStatic(); //рисуем заново

var date = new Date();

//для секундной стрелки
var seconds = date.getSeconds();
ctx.lineWidth = secondWidth;
drawStroke(distance/10*9, seconds * angleSix);

//для минутной стрелки
var minutes = date.getMinutes();
ctx.lineWidth = minuteWidth;;
drawStroke(distance/10*7, minutes*angleSix);

//для часовой стрелки
var hours = date.getHours();
ctx.LineWidth = hourWidth;
drawStroke(distance/10*5, (hours*angleThirty+minutes*0.5));

//текущее время в центре
    ctx.beginPath()
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'black';
    ctx.font = "30px Georgia";
    ctx.fillText(('0' + hours).slice(-2)+':'+('0'+ minutes).slice(-2) +':'+('0'+ seconds).slice(-2), center, center/1.5);
    ctx.stroke();
}



setInterval(tick, 1000);