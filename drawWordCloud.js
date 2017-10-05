var width = 1050,
    height = 800;


// var width = winWidth*0.7,
//     height = width*0.6;

var fill = d3.scale.category20();


d3.json('JulKW.json',function(data){
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

  d3.layout.cloud().size([width, height])
      .words(words)
      .padding(0)

      .font("Impact")
      .fontSize(function(d) { return fontScale(d.size); })
      .on("end", drawCloud)
      .start();
});

//button to swap over datasets
// d3.select("#word-cloud").append("button")
//     .text("change data")
//     .on("click",function(){
//         //select new data
//         d3.json('MayKW.json',function(data){
//           var words=[]
//           data.forEach(function(element){
//             words.push({text:element.word,size:element.count})
//           });
//           console.log(words);
//
//           // font scale
//           //array of count of each element in json file
//           var arrCount = data.map(function(d){return d.count});
//           console.log(arrCount);
//           var fontScale = d3.scale.linear()
//               .domain([d3.min(arrCount),d3.max(arrCount)])
//               .range([30,90])
//
//         //rejoin data
//         var text = svgDoc.select("g").selectAll("text")
//             .data(data);
//
//         text.exit().remove();//remove unneeded texts
//         // text here is the elements already on the page, we just update them
//         text.attr("class", "update");
//         text.enter().append("text")
//             .style("font-size", function(d) { return d.size + "px"; })
//             .style("font-family", "Impact")
//             .style("fill", function(d, i) { return fill(i); })
//             .attr("text-anchor", "middle")
//             .attr("transform", function(d) {
//                 return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
//             })
//             .text(function(d) { return d.text; });//create any new texts needed
//
//         // //update all texts to new positions
//         // text.transition()
//         //     .duration(500)
//         //     .attr("cx",function(d,i){
//         //         var spacing = lineLength/(eval("dataArray"+dataIndex).length);
//         //         return xBuffer+(i*spacing)
//         //     })
//         //     .attr("cy",yBuffer)
//         //     .attr("r",function(d,i){return d});
//         //
//         // d3.select("text").text("dataset"+dataIndex);
//
//     });
//   );//end onclick function
//


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


function changeJson(){
  d3.json('MayKW.json',function(data){
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

    d3.layout.cloud().size([width, height])
        .words(words)
        .padding(0)
  //      .rotate(function() { return ~~(Math.random() * 2) * 90; })
        .font("Impact")
        .fontSize(function(d) { return fontScale(d.size); })
        .on("end", drawCloud)
        .start();
  });
}
