$(document).ready(function () {
  $("button").click(function (event) {
   
    event.preventDefault();

    let valueInput = $("#heroInput").val();
    if (valueInput <= 732&&valueInput>0) {

    

    $.ajax({
      url: "https://superheroapi.com/api.php/1372490626467076/" + valueInput,
        success: function (data) {
        hero = data;
        console.log(hero);
        let name = hero.name;
        let connections = Object.entries(hero.connections); //array con par value key del obj
        let image = hero.image;
        let occupation = hero.work.occupation;
        let firstAppearance = hero.biography["first-appearance"];
        let height = hero.appearance.height;
        let weight = hero.appearance.weight;
        let aliases = hero.biography.aliases;
        let stats =  Object.entries(hero.powerstats)
        let statsForPie =[] 
        console.log(stats)
        console.log(firstAppearance);
       

        let addInfoToCard = function (arr, dom) { //funcion para agregar info
          dom.text("")
          if (Array.isArray(arr) === true){ //para arrays

            arr.forEach(function (elem) {
              if(Array.isArray(elem) === true){
              joinedElem = elem.join(":"); // hacer array un string
              dom.append(`<p> ${joinedElem}</p>`); //donde escribir
            }
           else {
            dom.append(`<p> ${elem}</p>`); //donde escribir

           } 
          });
          }
          else{
            dom.append(`<p> ${arr}</p>`)
          }
        };

        var changeImage = function (i, dom) { //funcion para cambiar imagen de tarjeta
          i = i.url;
          console.log(i);
          dom.attr("src",i);
        };
        stats.forEach(function(power){
          statsForPie.push({label:power[0], y:power[1]})  
      
      }) 
      console.log(statsForPie)
         

        changeImage(image, $(heroImage));
        addInfoToCard(name, $("#name"));
        addInfoToCard(name, $("#postedBy"));
        addInfoToCard(connections, $("#connections"));
        addInfoToCard(occupation, $("#occupation"));
        addInfoToCard(firstAppearance, $("#firstAppearance"));
        addInfoToCard(height, $("#height"));
        addInfoToCard(weight, $("#weight"));
        addInfoToCard(aliases, $("#aliases"));

        var chart = new CanvasJS.Chart("chartContainer", {
          animationEnabled: true,
          title: {
            text: `Estadisticas de Poder de ${name}`
          },
          data: [{
            type: "pie",
            startAngle: 240,
            
            indexLabel: "{label} {y}",
            dataPoints: statsForPie
          }]
        });
        chart.render();
        
        }//success ajax
      


        
    
    }) //ajax
  }
  else{ alert("Hasta el momento solo tenemos 732 heroes en nuestra agencia. Por favor pruebe con un numero del 1 al 732")}  
  }); //evento click
}); //document ready
