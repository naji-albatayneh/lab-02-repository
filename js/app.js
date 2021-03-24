let collectionFlag = 1;
const collection1 = []; //Holding objects from page-1.json
const collection2 = []; //Holding objects from page-2.json

const renderedCollection = []; //Holding objects that are currently rendered on the page, to be used for sorting function
// console.log('inisial');
// console.log(renderedCollection.length);

const collectionOptions = ['Collection I', 'Collection II']; //To update the select #collection to defualt option each time the page is refreshed

const filterOptions1 = ['All - Filter by keyword']; //Holding unique and not repeated keywords for select options in collection 1
const filterOptions2 = ['All - Filter by keyword']; //Holding unique and not repeated keywords for select options in collection 2

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
      getCollection(collection1, filterOptions1);
      $('#collection').empty();
      collectionOptions.forEach(option => {
        $('#collection').append(`<option>${option}</option>`);
      });
    });

  //This function is called by eventListener triggered by choosing a collection to render
  function getCollection(arr1, arr2){
    $('div').empty();
    renderedCollection.splice(0, renderedCollection.length);//empty the array before pushing new collection of items
    // console.log('after empty');
    // console.log(renderedCollection.length);
    arr1.forEach(item => {
      $('div').append(item.renderHorn());
      renderedCollection.push(item);
      // console.log('after push');
      // console.log(renderedCollection.length);
    });
    $('#filter').empty();
    arr2.forEach(option => {
      $('#filter').append(`<option>${option}</option>`);
    });
  }

  //Constructor Function
  function Horn (url, title, description, keyword, horns){
    this.url=url;
    this.title=title;
    this.description=description;
    this.keyword=keyword;
    this.horns=horns;
  }

  //Moustache Template Feature// for Rendering Objects
  Horn.prototype.renderHorn = function () {
    // 1. Get the template from the HTML document
    let template = $('.horn-template').html();
    // 2. Use Mustache to "render" new html by merging the template with the data
    let card = Mustache.render(template, this);
    // 3. Do not forget to return the HTML from this method
    return card;
  };

  //Filtering Feature//Event Handler upon changing the value of the #filter select elemnet
  $('#filter').on('change', function(){
    // console.log($(this).val());
    $('div').empty();
    renderedCollection.splice(0, renderedCollection.length);//empty the array before pushing new collection of items
    // console.log('after empty');
    // console.log(renderedCollection.length);
    if(collectionFlag===1){
      collection1.forEach(hornObj => {
        if($(this).val()==='All - Filter by keyword'){
          $('div').append(hornObj.renderHorn());
          renderedCollection.push(hornObj);
          // console.log('after push #filter');
          // console.log(renderedCollection);
        }else if(hornObj.keyword === $(this).val()){
          $('div').append(hornObj.renderHorn());
          renderedCollection.push(hornObj);
          // console.log('after push #filter');
          // console.log(renderedCollection);
        }
      });
    }else{
      collection2.forEach(hornOb => {
        if($(this).val()==='All - Filter by keyword'){
          $('div').append(hornOb.renderHorn());
          renderedCollection.push(hornOb);
          // console.log('after push #filter');
          // console.log(renderedCollection);
        }else if(hornOb.keyword === $(this).val()){
          $('div').append(hornOb.renderHorn());
          renderedCollection.push(hornOb);
          // console.log('after push #filter');
          // console.log(renderedCollection);
        }
      });
    }
  });

  //Pagination Feature//Event Handler upon changing the value of the #collection select elemnet
  $('#collection').on('change', function(){

    if($(this).val()==='Collection I'){
      collectionFlag=1;
      getCollection(collection1, filterOptions1);
    }else if($(this).val()==='Collection II'){
      collectionFlag=2;
      getCollection(collection2, filterOptions2);
    }
  });

  //Sort Fearture//Event Handler upon changing the value of the #sort select elemnet
  $('#sort').on('change', function(){
    if($(this).val()==='Sort By Title - Ascending'){
      renderedCollection.sort(function (a, b) {
        if(a.title > b.title){
          return a.title - b.title;
        }else if(a.title < b.title){
          return b.title - a.title;
        }else{
          return 0;
        }
      });
    }else if($(this).val()==='Sort By Title - Descending'){
      renderedCollection.sort(function (a, b) {
        if(a.title < b.title){
          return a.title - b.title;
        }else if(a.title > b.title){
          return b.title - a.title;
        }else{
          return 0;
        }
      });
    }else if($(this).val()==='Sort By Horns - Ascending'){
      renderedCollection.sort(function (a, b) {
        if(a.horns > b.horns){
          return b.horns - a.horns;
        }else if(a.horns < b.horns){
          return a.horns - b.horns;
        }else{
          return 0;
        }
      });
    }else if($(this).val()==='Sort By Horns - Descending'){
      renderedCollection.sort(function (a, b) {
        if(a.horns > b.horns){
          return a.horns - b.horns;
        }else if(a.horns < b.horns){
          return b.horns - a.horns;
        }else{
          return 0;
        }
      });
    }
    $('div').empty();
    renderedCollection.forEach(item => {
      $('div').append(item.renderHorn());
    });
  });
});

