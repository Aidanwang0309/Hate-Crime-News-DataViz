var margin = 75;
var width = 960-margin,height = 500-margin;

// append SVG element to the body of the page
var svg = d3.select('body')
  .append('svg')
    .attr('height',height)
    .attr('width',width)
    .attr('fill','#fff')
  // initiating the pack layout
var pack = d3.layout.pack()
  .size([width,height])
  .padding(-10)
// read keywords from file.
d3.json('keywords.json',function(keywords){

  var nodeData = {title:"Ranked Keywords",value:100,children:keywords};
  nodeData = pack.nodes(nodeData);

  // font scale for the circles
  var nodeR = keywords.map(function(d){return d.value});
  var fontScale = d3.scale.linear()
      .domain([d3.min(nodeR),d3.max(nodeR)])
      .range([1,4])
    // create the nodes and append text
    svg.selectAll('.node')
    .data(nodeData)
    .enter()
    .append('g')
      .attr('class','node')
      .attr('transform',function(d){return "translate("+d.x+","+d.y+")"})
    .append('text')
      .text(function(d){return d.key})
      .attr('text-anchor','middle')
      .attr('fill','#000')
      .style({
        'font-family':'"Open sans",sans-serif',
        'font-size':function(d){return fontScale(d.value)+'em'}
      })
})
