result();
async function result() {
    try {
        var data = await fetch(`https://api.openbrewerydb.org/v1/breweries?by_country=England`);
        var res = await data.json();
        //console.log(res);
        
        var select = document.getElementById("brewery");
        for (var i = 0; i < res.length; i++) {
          if(res[i].website_url!=null){
            const opt = document.createElement("option");
            opt.value = res[i].name;
            opt.innerText = res[i].name;
            select.append(opt);
          }
        }
        
        document.querySelector("button").addEventListener("click", (ele) => {
        ele.onclick = display(res);
        })
        
    }
    catch (error) {
        console.log(error);
    }
}
function display(x) {
    var select = document.getElementById("brewery");
    var value = select.options[select.selectedIndex].text;
    //console.log(value);
    var brewery_data = x.filter((element) => {
      if (element.name == value) {
        return element;
      }
    });
    var y=brewery_data[0];
    //console.log(y);

    var card_div = document.createElement("div");
    card_div.className = "col-lg-12 col-md-8 col-sm-6 col d-flex justify-content-center ";
    card_div.id = "card";
    if(document.querySelector("#card")!==null){
        var parent = document.querySelector("#card");
        parent.innerHTML = `<div class="card text-white bg-dark mb-3" style="max-width: 18rem;">
        <div class="card-header">Brewery details</div>
        <div class="card-body">
          <p class="card-text">Name : ${y.name}</p>
          <p class="card-text">City : ${y.city}</p>
          <p class="card-text">State : ${y.state}</p>
          <p class="card-text">Country : ${y.country}</p>
          <a href="${y.website_url}" target="_blank">Learn more from the website </a>
        </div>`
    }
    else{
        card_div.innerHTML = `<div class="card text-white bg-dark mb-3" style="max-width: 18rem;">
        <div class="card-header">Brewery details</div>
        <div class="card-body">
          <p class="card-text">Name : ${y.name}</p>
          <p class="card-text">City : ${y.city}</p>
          <p class="card-text">State : ${y.state}</p>
          <p class="card-text">Country : ${y.country}</p>
          <a href="${y.website_url}" target="_blank">Learn more from the website </a>
        </div>`
        var parent = document.querySelector(".container");
        parent.append(card_div);
    }
    
}