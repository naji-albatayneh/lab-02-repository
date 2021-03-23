let collectionFlag = 1;
const collection1 = []; //Holding objects from page-1.json
const collection2 = []; //Holding objects from page-2.json

const filterOptions1 = []; //Holding unique and not repeated keywords for select options in collection 1
const filterOptions2 = []; //Holding unique and not repeated keywords for select options in collection 2

$(document).ready(function (){
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };

  //Read file1 to get data
  $.ajax('./data/page-1.json', ajaxSettings)
    .then(data => {
      data.forEach(animal => {
        const horn = new Horn(animal.image_url, animal.title, animal.description, animal.keyword, animal.horns);
        collection1.push(horn);
        // Updating keywords in the select options
        if(!(filterOptions1.includes(animal.keyword))){
          filterOptions1.push(animal.keyword);
        }
      });
    });

  //Read file2 to get data
  $.ajax('./data/page-2.json', ajaxSettings)
    .then(data => {
      data.forEach(animal => {
        const horn = new Horn(animal.image_url, animal.title, animal.description, animal.keyword, animal.horns);
        collection2.push(horn);
        // Updating keywords in the select options
        if(!(filterOptions2.includes(animal.keyword))){
          filterOptions2.push(animal.keyword);
        }
      });
    });

  //This function is called by eventListener triggered by choosing a collection to render
  function getCollection(arr1, arr2){
    $('div').empty();
    arr1.forEach(item => {
      $('div').append(item.renderHorn());
    });
    $('#filter').empty();
    arr2.forEach(option => {
      $('#filter').append(`<option>${option}</option>`);
    });
  }

  getCollection(collection1, filterOptions1);

  //Constructor Function
  function Horn (url, title, description, keyword, horns){
    this.url=url;
    this.title=title;
    this.description=description;
    this.keyword=keyword;
    this.horns=horns;
  }

  //Moustache Template for Rendering Objects
  Horn.prototype.renderHorn = function () {
    // 1. Get the template from the HTML document
    let template = $('#horn-template').html();
    // 2. Use Mustache to "render" new html by merging the template with the data
    let card = Mustache.render(template, this);
    // 3. Do not forget to return the HTML from this method
    return card;
  };

  //Event Handler upon changing the value of the #filter select elemnet
  $('#filter').on('change', function(){
    $('div').empty();
    if(collectionFlag===1){
      collection1.forEach(hornObj => {
        if(hornObj.keyword === $(this).val()){
          $('div').append(hornObj.renderHorn());
        }
      });
    }
    if(collectionFlag===2){
      collection2.forEach(hornOb => {
        if(hornOb.keyword === $(this).val()){
          $('div').append(hornOb.renderHorn());
        }
      });
    }
  });

  //Event Handler upon changing the value of the #collection select elemnet
  $('#collection').on('change', function(){

    if($(this).val()==='Collection I'){
      collectionFlag=1;
      getCollection(collection1, filterOptions1);
    }
    if($(this).val()==='Collection II'){
      collectionFlag=2;
      getCollection(collection2, filterOptions2);
    }
  });
});

