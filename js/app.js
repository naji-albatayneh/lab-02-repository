$(document).ready(function (){
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };

  //read the file to get data
  $.ajax('./data/page-1.json', ajaxSettings)
    .then(data => {
      data.forEach(animal => {
        const horn = new Horn(animal.image_url, animal.title, animal.description, animal.keyword, animal.horns);
        // console.log('Ajax');
        // console.log(horn);
        //$('select').append(`<section><h2>${animal.title}</h2><img src = ${animal.image_url}><p>${animal.description}</p><p>Keyword: ${animal.keyword}</p><p>Number of Horns: ${animal.horns}</p></section>`);
        $('div').append(`<section><h2>${animal.title}</h2><img src = ${animal.image_url}><p>${animal.description}</p><p>Keyword: ${animal.keyword}</p><p>Number of Horns: ${animal.horns}</p></section>`);
      });
    });

  //onclick
//   $('select').on('change', function(){
//   });
});


//Constructor Function
function Horn (url, title, description, keyword, horns){
  this.url=url;
  this.title=title;
  this.description=description;
  this.keyword=keyword;
  this.horns=horns;
//   console.log('Cons');
//   console.log(this);
}
