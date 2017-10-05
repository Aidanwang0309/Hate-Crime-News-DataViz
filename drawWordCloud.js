var inputValue = null;
var month = ["Feb","Mar","Apr","May","Jun","Jul","Aug"];

// when the input range changes update the value
d3.select("#timeslide").on("input", function() {
    update(+this.value);
});


function update(value) {
    document.getElementById("range").innerHTML=month[value];
    inputValue = month[value];
    console.log(inputValue);
    changeJson(inputValue);
    // d3.selectAll(".incident")
    //     .attr("fill", dateMatch);
}


var width = 1050,
    height = 800;


// var width = winWidth*0.7,
//     height = width*0.6;

var fill = d3.scale.category20();


d3.json('FebKW.json',function(data){
  var words=[]
  data.forEach(function(element){
    words.push({text:element.word,size:element.count})
  });
  // console.log(words);

  // font scale
  //array of count of each element in json file
  var arrCount = data.map(function(d){return d.count});
  console.log(arrCount);
  var fontScale = d3.scale.linear()
      .domain([d3.min(arrCount),d3.max(arrCount)])
      .range([30,90])

  d3.layout.cloud().size([width, height])
      .words(words)
      .padding(0)

      .font("Impact")
      .fontSize(function(d) { return fontScale(d.size); })
      .on("end", drawCloud)
      .start();
});





function drawCloud(words) {
    d3.select("#word-cloud").select("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate("+(width / 2)+","+(height / 2)+")")
    .selectAll("text")
    .data(words)
    .enter().append("text")
    .style("font-size", function(d) { return d.size + "px"; })
    .style("font-family", "Impact")
    .style("fill", function(d, i) { return fill(i); })
    .attr("text-anchor", "middle")
    .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    })
    .text(function(d) { return d.text; });


}


function changeJson(month){
  //select new data
  d3.json(month+'KW'+'.json',function(data){
    var words=[]
    data.forEach(function(element){
      words.push({text:element.word,size:element.count})
    });

  console.log(words);

  // font scale
  //array of count of each element in json file
  var arrCount = data.map(function(d){return d.count});
  console.log(arrCount);
  var fontScale = d3.scale.linear()
      .domain([d3.min(arrCount),d3.max(arrCount)])
      .range([30,90])

  d3.select("svg").selectAll("g").remove();

  d3.layout.cloud().size([width, height])
      .words(words)
      .padding(0)

      .font("Impact")
      .fontSize(function(d) { return fontScale(d.size); })
      .on("end", drawCloud)
      .start();

});
}
