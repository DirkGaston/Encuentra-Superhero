$(document).ready(function ($) {

    let search = $('#main_Form-search')
    let inputData = $('#main_Form-input')
    let contentHeroData = $('#heroData')



    search.click((e) => {

        e.preventDefault()
        let id = inputData.val()
        var validation = /^[0-9]+$/
        if (id.match(validation)) {
            findSuperhero(id)
        } else {
            alert('Ingrese el número de ID de un SuperHeroe (entre el 1 y el 731')
        }

    })

    const findSuperhero = (id) => {
        $.ajax({
            url: `https://superheroapi.com/api/4905856019427443/${id}`,
            type: 'GET',
            dataType: 'json',

            success: function (response) {

                const data = response

                const infoSuperhero = {
                    name: data['name'],
                    photo: data.image['url'],
                }

                const { name, photo, fullName } = infoSuperhero

                displayHero(name, photo, fullName)

                const list = $('ul > li#dataBio');
                const list2 = $('ul > li#dataAppearance');
                const list3 = $('ul > li#dataWork');
                const list4 = $('ul > li#dataConnections')
                const heroBio = data.biography;
                const heroAppearance = data.appearance
                const heroWork = data.work
                const heroConnections = data.connections
                const heroStats = data.powerstats
                
                const info = []

                Object.entries(heroBio).forEach(([key, value]) => list.append(`<p class="tag">${key}: ${value} <br> </p>`))

                Object.entries(heroAppearance).forEach(([key, value]) => list2.append(`<p class="tag">${key}: ${value} <br> </p>`))

                Object.entries(heroWork).forEach(([key, value]) => list3.append(`<p class="tag">${key}: ${value} <br> </p>`))

                Object.entries(heroConnections).forEach(([key, value]) => list4.append(`<p class="tag">${key}: ${value} <br> </p>`))

                Object.entries(heroStats).forEach(([key, value]) => info.push({
                    y: value,
                    indexLabel: key
                }));


                const chart = new CanvasJS.Chart("chartContainer",
                    {
                        backgroundColor: "#FFFF00",
                        title: {
                            fontFamily: "calibri",
                            text: `${name}'s POWER STATS`,
                        },
                        data: [
                            {
                                type: "pie",
                                showInLegend: false,
                                legendText: "{indexLabel}",
                                dataPoints: info
                            }
                        ]

                    });
                chart.render();

            },
        })

    }

    const displayHero = (name, photo) => {
        contentHeroData.html(``)
        contentHeroData.html(`<div class="card" id="heroCard">
            <img src="${photo}" class="card-img-top" alt="HeroCard">
            <div class="card-body">
                <h3 class="card-title text-uppercase">${name}</h3>
                <hr>
            </div>
        
            <ul class="list-group list-group-flush">
                <h5 class="list-group-item">BIOGRAPHY</h5>
                <li class="list-group-item" id="dataBio"></li>
                <br>
                <h5 class="list-group-item">APPEARANCE</h5>
                <li class="list-group-item" id="dataAppearance"></li>
                <br>
                <h5 class="list-group-item">WORK</h5>
                <li class="list-group-item" id="dataWork"></li>
                <br>
                <h5 class="list-group-item">CONNECTIONS</h5>
                <li class="list-group-item" id="dataConnections"></li>
            </ul>
        
            <div class="card-body py-4">
        
            </div>
        </div>`)
    }

});




