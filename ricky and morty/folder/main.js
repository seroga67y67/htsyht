let speciesTrigger = false;
let speciesValue;
let skill;
let episodeTrigger = false;
let listWatch = JSON.parse(localStorage.getItem('listWatch')) || [];
let yel = 'rgb(227, 204, 77)';
let bl = 'rgb(77, 172, 227)';
let gr = 'rgb(85, 255, 0)'
let frontColor
let backColor
$('.watchListCount').text(listWatch.length);

fetch('https://rickandmortyapi.com/api/episode')
    .then(res => {
        return res.json();
    })
    .then(data => {
        console.log(data);
        for (let el of data.results) {
            $('.episodeContainer').append(`<div class="episodeItem">
            <h3>${el.name}</h3>
            <button class="saveBtn" id="${el.id}">add</button>
            </div>`);
        }


        $('.saveBtn').click((e) => {
            let trg = e.target.id;
            getEpisodeById(trg);
            showWatchList()
        })
    })



    function getEpisodeById(id) {
        fetch(`https://rickandmortyapi.com/api/episode/${id}`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                listWatch.push(data);
                localStorage.setItem('listWatch', JSON.stringify(listWatch));
                $('.watchListCount').text(listWatch.length);
            })
    }



    function showWatchList() {
        $('.watchListContainer').empty();
        for (let el of listWatch) {
            $('.watchListContainer').append(`<div class="episodeItem">
                <h3>${el.name}</h3>
                <button class="removeBtn" id="${el.id}">remove</button>
                </div>`);
        }
    
    }
    showWatchList()


function getCharacterPage(page) {
    let src = `https://rickandmortyapi.com/api/character?page=${page}`;
    if (speciesTrigger == true) {
        src = `https://rickandmortyapi.com/api/character?page=${page}&speciec=${speciesValue}`
        console.log(speciesValue);
    }
    else if (episodeTrigger == true){
        src = `https://rickandmortyapi.com/api/episode`
    }
    fetch(src)
        .then(res => res.json())
        .then(data => {




            $('.characterContainer').empty();
            for (let el of data.results) {
                const characterItem = $(`
                    <div class='characterItem'>
                        <h3>${el.name}</h3>
                        <img src="${el.image}" alt="character">
                        <p><b>Gender: </b>${el.gender}</p>
                        <button class="moreBtn" id="${el.id}">More</button>
                    </div>`);

                characterItem.find('.moreBtn').click(() => displayCharacterDetails(el.id));

                $('.characterContainer').append(characterItem);
            }
        });
}

function displayCharacterDetails(characterId) {
    // alert(characterId);
    fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
        .then(res => res.json())
        .then(characterData => {
            console.log('Character Details:', characterData);


            $('.popupContainer').append(`
                <img src='${characterData.image}'>
                <div>${characterData.name}</div>
                 <div>${characterData.status}</div>
            <div>${characterData.species}</div>
                <div>${characterData.origin.name}</div>
                 <div>${characterData.location.name}</div>`);

            $('.popup').css('display', 'flex');
        });


}

let currentPage = 1;
getCharacterPage(currentPage);

$('#nextBtn').click(function () {
    if (currentPage < 41) {
        currentPage++;
        getCharacterPage(currentPage);
        $('#pageNumber').text(currentPage);
    }
});

$('#prewBtn').click(function () {
    if (currentPage >= 2) {
        currentPage--;
        getCharacterPage(currentPage);
        $('#pageNumber').text(currentPage);
    }
});




function getAllCharacters(species, mode) {


    fetch(`https://rickandmortyapi.com/api/character/?${mode}=${species}`)
        .then(res => res.json())
        .then(data => {

            for (let el of data.results) {
                const characterItem = $(`
                    <div class='characterItem'>
                        <h3>${el.name}</h3>
                        <img src="${el.image}" alt="character">
                        <p><b>Gender: </b>${el.gender}</p>
                        <button class="moreBtn" id="${el.id}">More</button>
                    </div>`);

                characterItem.find('.moreBtn').click(() => displayCharacterDetails(el.id));

                $('.characterContainer').append(characterItem);
            }
        });


}

function changeColor(color, sColor){
    if(colorTrigger==true){
        $('.wrap').css('background-color',`${color}`)
        $('.episodeContainer').css('background-color',`${color}`)
        $('.episodeItem').css('border-color', `${sColor}`)
        $('.moreBtn').css('border-color',`${sColor}`)
        $('.moreBtn').css('background-color',`${color}`)
    }else{
        $('.header').css('background-color',`${color}`)
        $('.fBtn').css('background-color',`${color}`)
        $('.episodeItem').css('background-color',`${color}`)
        $('.characterItem').css('background-color',`${color}`)
        
    }
}

$('#addSpecies').click(function () {
    speciesValue = $('#speciesFinder').val()
    speciesTrigger = true;
    $('.characterContainer').empty();
    skill='species'
    getAllCharacters(speciesValue,skill);
})

$('#addGender').click(function () {
    speciesValue = $('#speciesFinder').val()
    speciesTrigger = true;
    $('.characterContainer').empty();
    skill='gender'
    getAllCharacters(speciesValue,skill);
})

$('#addStatus').click(function () {
    speciesValue = $('#speciesFinder').val()
    speciesTrigger = true;
    $('.characterContainer').empty();
    skill='status'
    getAllCharacters(speciesValue,skill);
})

$('#addName').click(function () {
    speciesValue = $('#speciesFinder').val()
    speciesTrigger = true;
    $('.characterContainer').empty();
    skill='name'
    getAllCharacters(speciesValue,skill);
})
$('#closeBtn').click(function (){
    $('.popupContainer').empty()
    $('.popup').css('display','none')
})
$('#character').click(function (){
    $('.watchListContainer').css('display','none')
    $('.episodeContainer').css('display','none')
    $('.characterContainer').css('display','flex')
})
$('#episode').click(function (){
    $('.watchListContainer').css('display','none')
    $('.episodeContainer').css('display','flex')
    $('.characterContainer').css('display','none')
})
$('#watchList').click(function (){
    $('.watchListContainer').css('display','flex')
    $('.episodeContainer').css('display','none')
    $('.characterContainer').css('display','none')
})
$('#closeStyle').click(function(){
    $('.styleCol').css('display','none')
    $('#openStyle').css('display','flex')
})
$('#openStyle').click(function(){
    $('.styleCol').css('display','flex')
    $('#openStyle').css('display','none')
})
$('.yellow').click(function(){
    colorTrigger=false
    frontColor=yel
    changeColor(frontColor)
})
$('.blue').click(function(){
    colorTrigger=false
    frontColor=bl
    changeColor(frontColor)
})
$('.green').click(function(){
    colorTrigger=false
    frontColor=gr
    changeColor(frontColor)
})
$('.light').click(function(){
    colorTrigger=true
    frontColor='#ccc'
    backColor='#333'
    changeColor(frontColor,backColor)
})
$('.black').click(function(){
    colorTrigger=true
    frontColor='black'
    backColor='#333'
    changeColor(frontColor,backColor)
})