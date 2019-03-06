import React, { useEffect } from "react";
import * as d3 from "d3";

var height = 500,
  width = 500,
  margin = 70,
  min = 0,
  max = 4,
  lawfulness = ["Lawful", "Orderly", "Neutral", "Whimsical", "Chaotic"],
  goodness = ["Good", "Generous", "Neutral", "Selfish", "Evil"];

var svg = d3
  .select("body")
  .append("svg")
  .attr("class", "axis")
  .attr("width", width)
  .attr("height", height);

var yAxisLength = height - 2 * margin,
  xAxisLength = width - 2 * margin;

var xScale = d3
    .scaleLinear()
    .domain([min, max])
    .range([0, xAxisLength]),
  yScale = d3
    .scaleLinear()
    .domain([max, min])
    .range([0, yAxisLength]),
  colorscale = d3
    .scaleLinear()
    .domain([min, max])
    .interpolate(d3.interpolateHcl)
    .range([d3.rgb("#0000ff"), d3.rgb("#8B0000")]);
{
  // First, render the Y and X axes.
  renderYAxis();
  renderXAxis();
}
const Viz = props => {
  useEffect(() => {
    var law = props.law,
      good = props.good,
      answered = props.answered;

    // first question answered, so render it.
    if (answered == 1) renderPoint(law, good, 100 / answered);
    // otherwise it already exists, so move it.
    else if (answered > 1) movePoint(law, good, 100 / answered);
  });
  return <div className=".viz" />;
};

function renderXAxis() {
  var xAxis = d3
    .axisBottom()
    .ticks(lawfulness.length)
    .tickFormat(t => {
      return lawfulness[t];
    })
    .scale(xScale);

  svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", function() {
      return "translate(" + margin + "," + (height - margin) + ")";
    })
    .attr("opacity", 1)
    .call(xAxis);

  d3.selectAll("g.x-axis g.tick")
    .append("line")
    .classed("grid-line", true)
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 0)
    .attr("y2", -(height - 2 * margin))
    .attr("opacity", 0.4);
}

function renderYAxis() {
  var yAxis = d3
    .axisLeft()
    .ticks(goodness.length)
    .tickFormat(t => {
      return goodness[t];
    })
    .scale(yScale);

  svg
    .append("g")
    .attr("class", "y-axis")
    .attr("transform", function() {
      return "translate(" + margin + "," + margin + ")";
    })
    .call(yAxis);

  d3.selectAll("g.y-axis g.tick")
    .append("line")
    .classed("grid-line", true)
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", yAxisLength)
    .attr("y2", 0)
    .attr("fill", colorscale(0));
}
function renderPoint(x, y, size) {
  svg
    .append("circle")
    .attr("transform", function() {
      return "translate(" + margin + "," + margin + ")";
    })
    .attr("class", "circle")
    .attr("cx", xScale(x))
    .attr("cy", yScale(y))
    .attr("fill", colorscale((x + y) / 2))
    .attr("r", size);
}
// This method causes the dot to smoothly transition to its next state.
function movePoint(x, y, size) {
  var t = d3
    .transition()
    // Set how long the transition should take, and on what function should it transition?
    .duration(750)
    .ease(d3.easeLinear);

  d3.select("circle")
    .transition(t)
    // this will cause it to move to the next X & Y Positions
    .attr("cx", xScale(x))
    .attr("cy", yScale(y))
    // This updates it's color to reflect it's new position.
    .attr("fill", colorscale((x + y) / 2))
    // This grows / shrinks the circle as necessary.
    .attr("r", size);
}
export default Viz;
