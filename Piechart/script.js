const init = function(){
    let Next = document.getElementById("process2");
    let Generate = document.getElementById("process");
    let Restart = document.getElementById("process3");
    var arrinput = [];
    var strinput = "";
    var num = 1;
    var sum = 0;
    //získání všech elementů button a vytvoření proměnný str a arr do které budeme pomocí funkce split ukládat hodnoty ze str. 
    Next.addEventListener("click", (e) =>{              
        var element = document.getElementById("input");//získání inputu.
        var input = element.value;//získání hodnoty inputu.
         if(input != 0){
            strinput += input + ",";//uložení hodnoty inputu do str.
            element.value= null;//nastavení inputu na null, aby uživatel při zadávání další hodnoty nemusel mazat tu starou.
            arrinput = strinput.split(",");//uložení str do pole pomocí metody split, není potřeba, daleko jednodušší je požít arrinput.push(input), ale v zadání je použít metodu split.
            arrinput.splice(-1,1);//odstranění poslední hodnoty, protože metoda split udělá "čárku" i za poslední hodnotou v str a tím se do pole přidá ještě jedna prázná hodnota.
            console.log(arrinput);
            num++;
            let label = document.getElementById("label").innerHTML= "Sector: " + num;//změnění hodnoty v html sektor 1,sektor 2...
            sum += Number(input);//suma všech zadaných inputů
            console.log(sum);
        }
        else{
            alert("Nezadal si číslo");
        } 
    });
    //událost pro button next, která je typu click. Zajišťuje aby uživatel zadal hodnotu do inputu.
    Generate.addEventListener("click",(e) =>{
        let lastsektor = 0;
        for (let index = 0; index < arrinput.length; index++) {
            var element = Number(arrinput[index]);
            //získá hodnotu z pole a převede ji na číslo.
            var parent = document.getElementById("sektor");//získání id, kam chceme graf vykreslit
            console.log(element);
            var div = document.createElement("div");//vytvoření divu
            div.id = "div" + index;// přiřazení id divu
            div.className = "sektor";//přiřazení class divu
            div.style.transform ="rotate("+ lastsektor + "deg)";//otočení divu, příjde mi to lepší, než vytvořit sektor, který je větší o sektor před ním. 
            lastsektor += 360 * element / sum;//připočítání úhlu otočení
            parent.appendChild(div);//přidání divu do html

            let sektor = new Sektor("#div" + index, {
                arc: false,
                angle: 360 * element / sum,
                sectorColor: getColor(index),
                circleColor: '#60606000', 
                fillCircle: false
            });
            //vytvoření objektu Sektor      
        }
    });
    //událost pro button next, která je typu click. Vykresluje graf pomocí cyklu.
    Restart.addEventListener("click",(e) =>{
        location.reload();
    });
    //událost pro button next, která je typu click. Načte znovu stránku pro vynulování hodnot.
}
document.addEventListener("DOMContentLoaded", init);

function getColor(number) {
    var arr = ["red","blue","green","yellow","orange","navy","violet"]
    if(number > arr.length){
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }  
    else{
        return arr[number];
    }  
}
//generátor barev   