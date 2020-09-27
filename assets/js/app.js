var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight + 40);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


var chosenXAxis = "poverty";
var chosenYAxis = "healthcare";
// /////////////////////////////////////////////////

function xScale(data, chosenXAxis) {
    // create scales
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d[chosenXAxis]) * 0.8,
        d3.max(data, d => d[chosenXAxis]) * 1.2
      ])
      .range([0, width]);
  
    return xLinearScale;
  
  };
  
// function used for updating x-scale var upon click on axis label
function yScale(data, chosenYAxis) {
    // create scales
    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d[chosenYAxis]) * 0.8,
        d3.max(data, d => d[chosenYAxis]) * 1.2
      ])
      .range([height, 0]);
  
    return yLinearScale;
  
  };

  // update xAxis var when label is clicked
  function renderXAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
  
    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);
  
    return xAxis;
  };
  
  // update yAxis var when label is clicked
  function renderYAxes(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);
  
    yAxis.transition()
      .duration(1000)
      .call(leftAxis);
  
    return yAxis;
  }
  
  // update circles group with transitions
  function renderCircles(circlesGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {
  
    circlesGroup.transition()
      .duration(1000)
      .attr("cx", d => newXScale(d[chosenXAxis]))
      .attr("cy", d => newYScale(d[chosenYAxis]));
  
    return circlesGroup;
  }  
  // update circles group with transitions
  function renderLabels(chosenLabels, newXScale, chosenXAxis, newYScale, chosenYAxis) {
  
    chosenLabels.transition()
      .duration(1000)
      .attr("x", d => newXScale(d[chosenXAxis]))
      .attr("y", d => newYScale(d[chosenYAxis]));
  
    return chosenLabels;
  }
  
  // update circles group with new tooltip
  function updateToolTip(circlesGroup, chosenXAxis, chosenYAxis) {
    var xLabel = chosenXAxis;
    var yLabel = chosenYAxis;
    if (chosenXAxis === "poverty") {
      var xlabel = "In Poverty (%): ";
    }
    else if (chosenXAxis === "Age") {
        var xlabel = "Age (Median): ";
    }
    else {
      var xlabel = "Household Income (Median): $";
    };  

    if (chosenYAxis === "healthcare") {
      var ylabel = "Lacks Healthcare (%): ";
    }
    else if (chosenYAxis === "obese") {
        var ylabel = "Obese (%): ";
    }
    else {
      var ylabel = "Smokers (%): ";
    }
  
    var toolTip = d3.tip()
      .attr("class", "tooltip d3-tip")
      .offset([80, -60])
      .html(d => {
        return (`${d.state} (${d.abbr})<br>${ylabel}${d[chosenYAxis]}<br>${xlabel}${d[chosenXAxis]}`);
      });
  
    circlesGroup.call(toolTip);


    circlesGroup
    // mouseover event - show tooltip
        .on("mouseover", function(data, index) {
      toolTip.show(data, this);
        })
      // onmouseout event - hide tooltip
        .on("mouseout", function(data, index) {
        toolTip.hide(data, this);
        });
  
    return circlesGroup;
  }


// function xScale(stateData, chosenXAxis) {
//     // Create Scales.
//     var xLinearScale = d3.scaleLinear()
//         .domain([d3.min(stateData, d => d[chosenXAxis]) * .8,
//             d3.max(stateData, d => d[chosenXAxis]) * 1.2
//         ])
//         .range([0, width]);

//     return xLinearScale;

// }

// // Function used for updating y-scale variable upon click on axis label.
// function yScale(stateData, chosenYAxis) {
//     // Create Scales.
//     var yLinearScale = d3.scaleLinear()
//         .domain([d3.min(stateData, d => d[chosenYAxis]) * .8,
//             d3.max(stateData, d => d[chosenYAxis]) * 1.2
//         ])
//         .range([height, 0]);

//     return yLinearScale;
// }

// // Function used for updating xAxis var upon click on axis label.
// function renderXAxes(newXScale, xAxis) {
//     var bottomAxis = d3.axisBottom(newXScale);

//     xAxis.transition()
//         .duration(1000)
//         .call(bottomAxis);

//     return xAxis;
// }

// // Function used for updating yAxis var upon click on axis label.
// function renderYAxes(newYScale, yAxis) {
//     var leftAxis = d3.axisLeft(newYScale);

//     yAxis.transition()
//         .duration(1000)
//         .call(leftAxis);

//     return yAxis;
// }

// // Function used for updating circles group with a transition to new circles.
// function renderCircles(circlesGroup, newXScale, newYScale, chosenXAxis, chosenYAxis) {

//     circlesGroup.transition()
//         .duration(1000)
//         .attr("cx", d => newXScale(d[chosenXAxis]))
//         .attr("cy", d => newYScale(d[chosenYAxis]));

//     return circlesGroup;
// }

// // Function used for updating text in circles group with a transition to new text.
// function renderText(circletextGroup, newXScale, newYScale, chosenXAxis, chosenYAxis) {
//     circletextGroup.transition()
//         .duration(1000)
//         .attr("x", d => newXScale(d[chosenXAxis]))
//         .attr("y", d => newYScale(d[chosenYAxis]));
    
//     return circletextGroup;
// }

// // Function used for updating circles group with new tooltip.
// function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {

//     // Conditional for X Axis.
//     if (chosenXAxis === "poverty") {
//         var xlabel = "Poverty: ";
//     }
//     else if (chosenXAxis === "income") {
//         var xlabel = "Median Income: "
//     }
//     else {
//         var xlabel = "Age: "
//     }

//     // Conditional for Y Axis.
//     if (chosenYAxis === "healthcare") {
//         var ylabel = "Lacks Healthcare: ";
//     }
//     else if (chosenYAxis === "smokes") {
//         var ylabel = "smokes: "
//     }
//     else {
//         var ylabel = "obese: "
//     }

//     var toolTip = d3.tip()
//         .attr("class", "tooltip")
//         .style("background", "black")
//         .style("color", "white")
//         .offset([120, -60])
//         .html(function(d) {
//             if (chosenXAxis === "age") {
//                 // All yAxis tooltip labels presented and formated as %.
//                 // Display Age without format for xAxis.
//                 return (`${d.state}<hr>${xlabel} ${d[chosenXAxis]}<br>${ylabel}${d[chosenYAxis]}%`);
//               } else if (chosenXAxis !== "poverty" && chosenXAxis !== "Age") {
//                 // Display Income in dollars for xAxis.
//                 return (`${d.state}<hr>${xlabel}$${d[chosenXAxis]}<br>${ylabel}${d[chosenYAxis]}%`);
//               } else {
//                 // Display Poverty as percentage for xAxis.
//                 return (`${d.state}<hr>${xlabel}${d[chosenXAxis]}%<br>${ylabel}${d[chosenYAxis]}%`);
//               }      
//         });
    
//     circlesGroup.call(toolTip);

//     // Create "mouseover" event listener to display tool tip.
//     circlesGroup
//         // .on("mouseover", function() {
//         // d3.select(this)
//         //     .transition()
//         //     .duration(3000)
//         //     .attr("r", 20)
//         //     .attr("fill", "blue");
//         // })
//         .on("click", function(data) {
//             toolTip.show(data, this);
//         })
//         // .on("mouseout", function() {
//         //     d3.select(this)
//         //     // .transition()
//         //     // .duration(1000)
//         //     // .attr("r", 15)
//         //     // .attr("fill", "green")
//         //     toolTip.hide()
//         // });
//         .on("mouseout", function(data) {
//             toolTip.hide(data)
//         });

//     return circlesGroup;
// }

  

/////////////////////////////////////////////////////

d3.csv("assets/data/data.csv").then(function(stateData, err){
    if (err) throw err;
    stateData.forEach(function(data){

        data.age = +data.age;
        data.smokes = +data.smokes;
        data.obesity = +data.obesity;
        data.healthcare = +data.healthcare;
        data.poverty = +data.poverty;
        data.income = +data.income;
    });
    var xLinearScale = xScale(stateData, chosenXAxis);
    var yLinearScale = yScale(stateData, chosenYAxis);
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    var yAxis = chartGroup.append("g")
        .classed("y-axis", true)
        .call(leftAxis);
      
        var circlesGroup = chartGroup.selectAll("circle")
        .data(stateData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d[chosenXAxis]))
        .attr("cy", d => yLinearScale(d[chosenYAxis]))
        .attr("r", 15)
        .attr("opacity", ".75")
        .classed("stateCircle", true);
    // var circlesGroup = chartGroup.selectAll("circle")
    //     .data(stateData)
    //     .enter()
    //     .append("g")
    //     .attr("cx", d => xLinearScale(d[chosenXAxis]))
    //     .attr("cy", d => yLinearScale(d[chosenYAxis]))
    //     .attr("fill", "blue")
    //     .attr("opacity", ".75");
    // // var circlesGroup = chartGroup.selectAll("circle")
    // //     .data(stateData)
    // //     .enter()
    // //     .append("g")
    // //     .classed("circle", true);
    // var circlesXY = circlesGroup.append("circle")
    //     .attr("cx", d => xLinearScale(d[chosenXAxis]))
    //     .attr("cy", d => yLinearScale(d[chosenYAxis]))
    //     .attr("r", 15)
    //     .classed("stateCircle", true);
    // var circleText = circlesGroup.append("text")
    //     .text(d => d.abbr)
    //     .attr("dx", d => xLinearScale(d[chosenXAxis]))
    //     .attr("dy", d => yLinearScale(d[chosenYAxis]) + 5)
    //     .classed("stateText", true);
    var circlesText = chartGroup.selectAll(".textLabels")
    .data(stateData)
    .enter()
    .append("text")
    .text(d => d.abbr)
    .attr("x", d => xLinearScale(d[chosenXAxis]))
    .attr("y", d => yLinearScale(d[chosenYAxis])+4)
    .classed("textLabels stateText", true);

    var xlabelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20})`);
    // X Axis
    var ylabelsGroup = chartGroup.append("g");

    
    var povertyLabel = xlabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 60)
        .attr("value", "poverty")
        .classed("active", true)
        .text("In Poverty (%)");
        


    var ageLabel = xlabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 40)
        .attr("value", "Age")
        .classed("inactive", true)
        .text("Age (Median)");

    var incomeLabel = xlabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 80)
        .attr("value", "income")
        .classed("inactive", true)
        .text("Household Income (Median)");

    // Y Axis

    var healthcareLabel = ylabelsGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -80)
        .attr("x", -(height/2))
        .attr("value", "healthcare")
        .classed("active", true)
        .text("Lacks Healthcare (%)");

    
    
    
    var smokesLabel = ylabelsGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -40)
        .attr("x", -(height/2))
        .attr("value", "smokes")
        .classed("inactive", true)
        .text("Smokes ($)");

    var obeseLabel = ylabelsGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -60)
        .attr("x", -(height/2))
        .attr("value", "obese")
        .classed("inactive", true)
        .text("Obese (%)");


    // var circlesGroup = updateToolTip(circlesGroup, chosenXAxis, chosenYAxis, circlesText);    
    circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);
    xlabelsGroup.selectAll("text")
        .on("click", function(){
            var value = d3.select(this).attr("value");
            if (value !== chosenXAxis){
                chosenXAxis = value;
                xLinearScale = xScale(stateData, chosenXAxis);
                xAxis = renderXAxes(xLinearScale, xAxis);
                circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);
                circlesText = renderLabels(circlesText, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);
                circlesGroup = updateToolTip(circlesGroup, chosenXAxis, chosenYAxis, circlesText);
                if (chosenXAxis==="Age"){
                    ageLabel
                        .classed("active", true)
                        .classed("inactive", false);
                    povertyLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    incomeLabel
                        .classed("active", false)
                        .classed("inactive", true);
                }
                else if (chosenXAxis==="income"){
                    povertyLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    ageLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    incomeLabel
                        .classed("active", true)
                        .classed("inactive", false);
                 }
                else {
                    povertyLabel
                        .classed("active", true)
                        .classed("inactive", false);
                    ageLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    incomeLabel
                        .classed("active", false)
                        .classed("inactive", true);

                   
                        

                }
            }
        });
    ylabelsGroup.selectAll("text")
        .on("click", function(){
            var value = d3.select(this).attr("value");
        if (value !== chosenYAxis){
            chosenYAxis = value;
            yLinearScale = yScale(stateData, chosenYAxis);
            yAxis = renderYAxes(yLinearScale, yAxis);
            circlesGroup = renderCircles(circlesGroup, xLinearScale, yLinearScale, chosenYAxis, chosenYAxis);
            circlesText = renderLabels(circlesText,xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);
            circlesGroup = updateToolTip(circlesGroup, chosenXAxis, chosenYAxis, circlesText);
            if (chosenYAxis === "smokes"){
                healthcareLabel
                    .classed("active", true)
                    .classed("inactive", false);
                smokesLabel
                    .classed("active", false)
                    .classed("inactive", true);
                obeseLabel
                    .classed("active", false)
                    .classed("inactive", true);   
            }
                else if (chosenXAxis === "obese"){
                healthcareLabel
                    .classed("active", true)
                    .classed("inactive", false);
                smokesLabel
                    .classed("active", true)
                    .classed("inactive", false);   
                obeseLabel
                    .classed("active", true)
                    .classed("inactive", false);
                }

                else {
                healthcareLabel
                    .classed("active", true)
                    .classed("inactive", false);
                smokesLabel
                    .classed("active", false)
                    .classed("inactive", true);
                obeseLabel
                    .classed("active", false)
                    .classed("inactive", true);

                }
            }
          });

}).catch(function(error){
    console.log(error);
});




    // chartGroup.append("text")
    // .attr("transform", "rotate(-90)")
    // .attr("y", 0 - margin.left)
    // .attr("x", 0 - (height/2))
    // .attr("dy", "1em")
    // .classed("axis-text", true)
    // .text("smokes")














//smokers vs. age//