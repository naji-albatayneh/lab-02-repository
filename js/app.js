const array = []; //Holding objects of type Horn
const options = []; //Holding unique and not repeated keywords for select options

$(document).ready(function (){
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };

  //Read the file to get data
  $.ajax('./data/page-1.json', ajaxSettings)
    .then(data => {
      data.forEach(animal => {
        const horn = new Horn(animal.image_url, animal.title, animal.description, animal.keyword, animal.horns);

        // Updating keywords in the select options
        if(!(options.includes(animal.keyword))){
          options.push(animal.keyword);
          $('select').append(`<option>${animal.keyword}</option>`);
        }

        //Inisial rendering of all objects
        $('div').append(`<section><h2>${animal.title}</h2><img src = ${animal.image_url}><p>${animal.description}</p><p>Keyword: ${animal.keyword}</p><p>Number of Horns: ${animal.horns}</p></section>`);
      });
    });

  //Event Handler upon changing the value of the select elemnet
  $('select').on('change', function(){
    $('div').empty();
    array.forEach(hornObj => {
      if(hornObj.keyword === $(this).val()){
        $('div').append(`<section><h2>${hornObj.title}</h2><img src = ${hornObj.url}><p>${hornObj.description}</p><p>Keyword: ${hornObj.keyword}</p><p>Number of Horns: ${hornObj.horns}</p></section>`);
      }
    });
  });
});

//Constructor Function
function Horn (url, title, description, keyword, horns){
  this.url=url;
  this.title=title;
  this.description=description;
  this.keyword=keyword;
  this.horns=horns;
  array.push(this);
//   console.log('Cons');
//   console.log(this);
}
