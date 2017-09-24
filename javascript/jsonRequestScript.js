function wikiSearchTool(event){
  console.log('trying to obtain json request');
  event.preventDefault();
  $.getJSON({
    url:url + document.getElementById('searchCont').value,
    success: function(data){
      var arr = Object.keys(data.query.pages).map(key => data.query.pages[key])
      console.log(arr[1].extract);
      document.querySelector('#centralID2').innerHTML = '';
      arr.forEach(function(a){
        createBlock(a.pageid, a.title, a.extract);
        console.log(a.title);
      })
    }
  })

}
