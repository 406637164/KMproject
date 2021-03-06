var margin = { top: 10, right: 10, bottom: 10, left: 10 },
  width = 1350 - margin.left - margin.right,
  height = 320 - margin.top - margin.bottom;

var svg = d3
  .select(".main_sample")

  .append("svg")
  .attr("transform", `translate(0,0)`)
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g");

drawline();
function drawline() {
  var sum = width / 10 + 30;
  var straightline = width / 10 + 10;
  for (i = 0; i < 9; i++) {
    svg
      .append("line")
      .style("stroke-dasharray", "5, 5")
      .attr("x1", sum)
      .attr("x2", sum)
      .attr("class", "dash")
      .attr("y1", 0)
      .attr("y2", height - margin.bottom)
      .style("stroke", "lightgray")
      .style("stroke-width", 1);
    sum += straightline;
  }

  var sum = 0;
  for (var i = 0; i < 8; i++) {
    svg
      .append("line")
      .style("stroke-dasharray", "5, 5")
      .attr("x1", margin.left * 3)
      .attr("x2", width - 60)
      .attr("y1", sum)
      .attr("y2", sum)
      .style("stroke", "lightgray")
      .style("stroke-width", 0.5);
    sum += 90;
  }

  var today = new Date();
  today.setHours(0, 0, 0, 0);
  todayMillis = today.getTime();

  var main_rank = d3
    .select(".main_rank")

    .text((d) => 1);

  var main_score_text = d3
    .select(".main_score_text")

    .text((d) => 80);
  var main_score = d3
    .select(".main_progress")

    .attr("value", (d) => 80);
  formatDay = d3.timeFormat("%Y/%m/%d ");
  formatTime = d3.timeFormat("%H:%M:%S");
}
var problem0 = [
  [
    {
      Visual: "Sample too dry",
      Photo: "Photo too moisure",
      DNA: "Good",
    },
    { Photo: "", Visual: "", DNA: "" },
    {
      Visual: "Sample too moisure",
      Photo: "Photo too moisure",
      DNA: "Good",
    },
  ],
];
// https://api.inaturalist.org/v1/observations/105593309,108630796,109373865
d3.json(
  "https://api.inaturalist.org/v1/observations/105593309,108630796,109373865"
).then(function (d) {
  // datas = d.results;
  // console.log(datas[0]);
  // console.log(datas);
  showdata2(d.results);
});

function showdata2(data) {
  var rectcolor = ["#EFF4AC", "#34C4E3", "#000000"];
  svg
    .selectAll("rect")
    .data(rectcolor)
    .enter()
    .append("rect")
    .attr("x", 60)
    .attr("y", (d, i) => 93 * i)
    .attr("width", 1250)
    .attr("height", 95)
    .attr("transform", "translate(" + 0 + "," + 5 + ")")
    .attr("fill", (d) => d)
    .attr("opacity", 0.2);

  //   console.log(data);

  let taxon = null;

  data.forEach((d) => {
    date = d.time_observed_at;
    date = date.slice(0, -6);
    d.date = new Date(date);
    d.hour = formatTime(d.date);
    // photoArray = d.photos;
    // d.taxon.iconic_taxon_name;
    data.arc = 50;
    var parts = d.hour.split(/:/);

    var timePeriodMillis =
      parseInt(parts[0], 10) * 60 * 60 * 1000 +
      parseInt(parts[1], 10) * 60 * 1000 +
      parseInt(parts[2], 10) * 1000;
    d.hour = new Date();
    d.hour.setTime(todayMillis + timePeriodMillis);
    picuture = d.photos.map((d) => d.url);
    d.picuture = picuture[0];
  });

  problem0[0].forEach((p, l) => {
    // console.log(data[l]);
    // console.log(p);
    data[l].problem = p;
    // console.log(l);
  });
  var main_collector = d3
    .select("#main_collector")
    .data(data)
    .text((d) => d.user.login);
  var margins = { top: 20, right: 20, bottom: 20, left: 20 },
    widths = 1350 - margins.left - margins.right,
    heights = 40 - margins.top - margins.bottom;

  var xScale = d3
    .scaleTime()
    .domain(d3.extent(data, (d) => d.date))
    .range([margins.left * 3 + 5, widths])
    .nice();

  var xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y/%m/%d"));
  // .ticks(10);
  console.log(d3.extent(data, (d) => d.hour));

  var yScale = d3
    .scaleTime()
    .domain(d3.extent(data, (d) => d.hour))
    .range([margin.bottom, height - margin.bottom])
    .nice(d3.timeDay);
  console.log(d3.extent(data, (d) => d.date));
  console.log(data.hour);
  var yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%H:%M")).ticks(11);
  svg
    .append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(xAxis)
    .selectAll("text")
    .style("font-size", "15px");
  // var yScale = d3.axisLeft()

  svg
    .append("g")
    .attr("transform", "translate(60,0)")
    .call(yAxis)
    .selectAll("text")
    .style("font-size", "15px");

  // A function that change this tooltip when the user hover a point.
  // Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
  var div = d3.select("body").append("div");
  var PI = Math.PI;
  var arcMin = 155; // inner radius of the first arc
  var arcWidth = 25; // width
  var arcPad = 3; // padding between arcs
  var arc = d3
    .arc()
    .innerRadius(7)
    .outerRadius(10)
    .startAngle(5.2)
    .endAngle(7.5);
  var groups = svg.append("g").classed("groups", true);
  // svg
  arcs = groups.attr("transform", "translate(10,0)");

  console.log(data);
  arcs
    .append("g")
    .selectAll("path")
    // .append("path")
    .data(data)
    .join("path")
    .attr("d", arc)

    .filter((d, i) => d.time_observed_at != "" && i.common_name != "")
    .attr("fill", (d) => {
      if (
        d.problem.DNA == "" &&
        d.problem.Photo == "" &&
        d.problem.Visual == ""
      ) {
        return "transparent";
      } else if (
        d.problem.DNA != "" ||
        d.problem.Photo != "" ||
        d.problem.Visual != ""
      ) {
        return "red";
      }
    })

    .attr("stroke", (d) => {
      if (
        d.problem.DNA == "" &&
        d.problem.Photo == "" &&
        d.problem.Visual == ""
      ) {
        return "transparent";
      } else if (
        d.problem.DNA != "" ||
        d.problem.Photo != "" ||
        d.problem.Visual != ""
      ) {
        return "red";
      }
    })
    .attr("stroke-width", function (d) {
      return d;
    })
    .attr(
      "transform",
      (d) => `translate(${xScale(d.date)},${yScale(d.hour) - 10})`
    )
    .style("stroke-width", "2px")
    .style("opacity", 0.7);
  var arc2 = d3
    .arc()
    .innerRadius(24)
    .outerRadius(21)
    .startAngle(3)
    .endAngle(12);

  arcs

    .append("g")
    .classed("uncircle", true)
    .selectAll("path")

    // .append("path")
    .data(data)
    .join("path")
    .classed("circles", true)
    .attr("d", arc2)

    .filter((d, i) => d.time_observed_at != "" && i.common_name != "")
    .attr("fill", "transparent")

    .attr("stroke", "transparent ")
    .attr("stroke-width", function (d) {
      return d / 2;
    })
    .attr(
      "transform",
      (d) => `translate(${xScale(d.date)},${yScale(d.hour) - 5})`
    )
    .style("stroke-width", "2px")
    .style("opacity", 0.7);

  var arrowStartPosition = 5;
  var arrowSpacing = 60;
  var verticalStrokeColor = "black";
  var arrowYStartPosition = 5;
  var arrowYEndStartPosition = 150;
  var m = 150;
  groups
    // .classed("arrow", true)
    .append("g")
    .classed("arrow", true)
    .selectAll("line")
    .data(data)
    .join("line")
    .attr("x1", (d) => xScale(d.date))
    .attr("y1", (d) => yScale(d.hour) + 20)
    .attr("x2", (d) => xScale(d.date))
    .attr("y2", (d) => 320)
    .attr("stroke-width", 2);
  // .style("stroke-dasharray", "5, 5");
  // .style("stroke", "gray");

  var left = groups
    .append("g")
    .classed("arrow-right", true)
    .selectAll("line")
    .data(data)
    .join("line")
    .attr("x1", (d) => xScale(d.date) - 10)
    .attr("y1", 310)
    .attr("x2", (d) => xScale(d.date))
    .attr("y2", (d) => 320)
    .attr("stroke-width", 2);
  // .style("stroke", "black");

  var right = groups
    .append("g")
    .classed("arrow-left", true)
    .selectAll("line")
    .data(data)
    .join("line")
    .attr("x1", (d) => xScale(d.date) + 10)
    .attr("y1", 310)
    .attr("x2", (d) => xScale(d.date))

    .attr("y2", (d) => 320)
    .attr("stroke-width", 2);
  // .style("stroke", "black");
  groups
    .attr("transform", "translate(10,0)")

    .selectAll("circle")

    // .classed("circles", true)
    .data(data)
    .enter()
    .append("g")

    .append("circle")

    .filter((d, i) => d.time_observed_at != "" && i.common_name != "")
    .attr("class", "cir")
    .attr("cx", (d) => xScale(d.date))
    .attr("cy", (d) => yScale(d.hour))
    .attr("fill", (d) => {
      if (
        d.problem.DNA == "" &&
        d.problem.Photo == "" &&
        d.problem.Visual == ""
      ) {
        return "green";
      } else if (
        d.problem.DNA != "" ||
        d.problem.Photo != "" ||
        d.problem.Visual != ""
      ) {
        return "red";
      }
    })
    .on("mouseover", function (event, d) {
      // div
      //   .attr("class", "tooltip")
      //   .style("opacity", 0)
      //   .transition()
      //   .duration(200)
      //   .style("opacity", 0.9)
      //   .style("left", event.pageX + "px")
      //   .style("top", event.pageY - 28 + "px");
      // div
      //   .html(
      //     `${d.species_guess}</br>${d.date}

      //    </br><p class="problem_text">${"Sample too dry"}</br>${"Photo too blurry"}</p> `
      //   )
      //   .style("left", event.pageX + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
      //   .style("top", event.pageY - 28 + "px");
      if (
        d.problem.DNA == "" &&
        d.problem.Photo == "" &&
        d.problem.Visual == ""
      ) {
        //????????????tooltip ??????
        div
          .attr("class", "tooltip2")
          .style("opacity", 0)
          .transition()
          .duration(200)
          .style("opacity", 0.9)
          .style("left", event.pageX + "px")
          .style("top", event.pageY - 28 + "px");
        div
          .html(
            `<div style="background-color:rgb(60, 201, 91);">${d.species_guess}</br>${d.date}</br></div>`
          )
          .style("left", event.pageX + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
          .style("top", event.pageY - 28 + "px");
      } else if (
        d.problem.DNA != "" ||
        d.problem.Photo != "" ||
        d.problem.Visual != ""
      ) {
        //????????????tooltip ??????
        div
          .attr("class", "tooltip")
          .style("opacity", 0)
          .transition()
          .duration(200)
          .style("opacity", 0.9)
          .style("left", event.pageX + "px")
          .style("top", event.pageY - 28 + "px");
        div
          .html(
            `<div style="background-color:rgb(201, 60, 60);">${d.species_guess}</br>${d.date}</br>Visual:${d.problem.Visual}</br>Photo:${d.problem.Photo}</br>DNA:${d.problem.DNA}</div>`
          )
          .style("left", event.pageX + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
          .style("top", event.pageY - 28 + "px");
      }
    })
    .on("mouseout", function (event, d) {
      div.transition().duration(100).style("opacity", 0);
    })

    .on("click", function (d, i) {
      var main =
        this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
          .parentNode;
      var getcirs = d3.select(main).select("svg").selectAll(".cir");

      console.log(d3.select(this)._groups[0][0].__data__.time_observed_at);

      var uncircles = groups.select(".uncircle").selectAll("path")._groups[0];
      console.log(uncircles.parentNode);
      // console.log(
      //   d3.select(groups._groups[0][0]).select(".uncircle")._groups[0][0]
      // );
      $(document).ready(function () {
        $(
          d3.select(groups._groups[0][0]).select(".uncircle")._groups[0][0]
        ).show();
        $(
          d3.select(groups._groups[0][0]).select(".arrow")._groups[0][0]
        ).show();
        $(
          d3.select(groups._groups[0][0]).select(".arrow-right")._groups[0][0]
        ).show();
        $(
          d3.select(groups._groups[0][0]).select(".arrow-left")._groups[0][0]
        ).show();
      });
      uncircles.forEach((items) => {
        // console.log(items.__data__.time_observed_at);

        items.setAttribute("fill", "transparent");
        items.setAttribute("stroke", "transparent");
      });
      uncircles.forEach((items) => {
        // console.log(items.__data__.time_observed_at);

        if (
          items.__data__.time_observed_at ==
          d3.select(this)._groups[0][0].__data__.time_observed_at
        ) {
          items.setAttribute("fill", "blue");
          items.setAttribute("stroke", "blue");
          d3.select(items);
          console.log();
        }
      });

      var arrow = groups.select(".arrow").selectAll("line")._groups[0];
      console.log(groups.select(".arrow"));
      arrow.forEach((item) => {
        // console.log(items.__data__.time_observed_at);

        item.setAttribute("style", "stroke: transparent;");

        // item.setAttribute("stroke", "blue");
      });
      arrow.forEach((items) => {
        // console.log(items.__data__.time_observed_at);

        if (
          items.__data__.time_observed_at ==
          d3.select(this)._groups[0][0].__data__.time_observed_at
        ) {
          items.setAttribute("style", "stroke: 5px, 5px; stroke: blue;");
        }
      });

      var arrow2 = groups.select(".arrow-right").selectAll("line")._groups[0];

      arrow2.forEach((item) => {
        // console.log(items.__data__.time_observed_at);

        item.setAttribute("style", "stroke: transparent;");

        // item.setAttribute("stroke", "blue");
      });
      arrow2.forEach((items) => {
        // console.log(items.__data__.time_observed_at);

        if (
          items.__data__.time_observed_at ==
          d3.select(this)._groups[0][0].__data__.time_observed_at
        ) {
          items.setAttribute("style", "stroke: 5px, 5px; stroke: blue;");
        }
      });
      var arrow3 = groups.select(".arrow-left").selectAll("line")._groups[0];

      arrow3.forEach((item) => {
        // console.log(items.__data__.time_observed_at);

        item.setAttribute("style", "stroke: transparent;");

        // item.setAttribute("stroke", "blue");
      });
      arrow3.forEach((items) => {
        // console.log(items.__data__.time_observed_at);

        if (
          items.__data__.time_observed_at ==
          d3.select(this)._groups[0][0].__data__.time_observed_at
        ) {
          items.setAttribute("style", "stroke: 5px, 5px; stroke: blue;");
        }
      });
      // getcirs.attr("stroke", null).attr("stroke-width", null);
      // d3.select(this).attr("stroke", "blue").attr("stroke-width", "3px");
      main.classList.remove("main_block");
      main.classList.add("active");

      // main.classList.toggle("main_block");

      main.children[1].classList.add("detailactive");
      $(document).ready(function () {
        $(main.children[1]).show();
      });

      // main.children[1].classList.remove("hide_detailcontainer");
      main.children[1].classList.add("row_container1");
      console.log(main.children[1]);
      if (main.children[1].classList.contains("detailactive")) {
        d3.select(main.children[1])
          .html(`    <div class="row_container1"  id="detail1" style="height: 300px;">
     
  
          <div class="row_container2" id="rows2" style="height:300px; ">
             
        
                <div class="detail_content" style="width: 100%; height:470px  ">
                  <div class="row_content1" style="width: 1840px;justify-content:flex-start">
        
                      <div class="quality_block_style" style="width:253px;" >
                   
                          <div class="quality_block" style="height: 100%;display:flex colomn;justify-content: center;align-items:flex-start;font-size: 1rem;">
                             <div  style="display:flex;justify-content: center;align-items:center;background-color:white;">&nbsp&nbsp&#128337;<span id="times">55465</span></div>   
                             <div  style="display:flex;justify-content: center;align-items:center;background-color:white;">&nbsp&nbsp????<span id="sampleid">54654</span></div>   
                            </div>
                           
                              
                           </div>
                    <div class="quality_block_style" style="width: 125px;" >
                   
                      <div class="quality_block" style="height: 100%;">
                          <span>Quality</span>
                          
                        </div>
                       
                          
                       </div>
                     
                       <div class="quality_block_style" style="width: 306px;" >
                   
                        <div class="quality_block" style="height: 100%;">
                            <span>Problem</span>
                            
                          </div>
                         
                            
                         </div>
                         <div class="quality_block_style" style="width: 310px;" >
                   
                          <div class="quality_block" style="height: 100%;">
                              <span> Method to Improve
                              </span>
                              
                            </div>
                           
                              
                           </div>
                           <div class="quality_block_style" style="width: 95px;" >
                   
                           <div class="quality_block" style="height: 100%;">
                               <span>More Details</span>
                               
                             </div>
                            
                               
                            </div>
                           <div class="quality_block_style" style="width: 308px;" >
                   
                            <div class="quality_block" style="height: 100%;">
                                <span>Photo</span>
                                
                              </div>
                             
                                
                             </div>
                           
                             <div class="quality_block_style" style="width: 308px;" >
                   
                              <div class="quality_block" style="height: 100%;">
                                  <span> Map </span>
                                  
                                </div>
                               
                                  
                               </div>
                               <div class="quality_block_style" style="width: 135px;" >
                   
                                <div class="quality_block" style="height: 100%;">
                                    <span>Score</span>
                                    
                                  </div>
                                 
                                    
                                 </div>
         
                
                  </div>
                  <div class="row_content1" style="width: 1840px;">
        
                    <div class="quality_block_style" style="width: 280px;text-align:center" >
                     
                      <div class="quality_block" style="height: 100%;">
                          
                          <span>Sample</span>
                          
                        </div>
                       
                          
                       </div>
                      <div class="quality_block_style" style="width: 140px;" >
                          <div class="quality_block"   >
                              <span>Visual</span>
                              
                            </div>
                            <div class="quality_block" >
                              <span>Photo</span>
                            </div>
                            <div class="quality_block" >
                              <span>DNA</span>
                            </div>  
                            
                      </div>
                      
                      <div class="problem_block_style" style="width: 345px;">
                          <div class="detail_container" >
                              <span>Sample too dry</span>
                              
                            </div>
                            <div class="detail_container" >
                              <span>Photo too blurry</span>
                            </div>
                            <div class="detail_container" >
                              <span>good</span>
                            </div>   
                      </div>
        
                      <div class="problem_block_style" style="width: 345px;">
                          <div class="detail_container" >
                              <span>need to more moisture</span>
                              
                            </div>
                            <div class="detail_container" >
                              <span>take picture on a sunny day</span>
                            </div>
                            <div class="detail_container" >
                              <span>good</span>
                            </div>   
                      </div>
                      <div class="problem_block_style" style="width: 105px;">
                      <div class="detail_container" >
                      <button class="show-modal">More Visual Problem</button>
                          
                        </div>
                        <div class="detail_container" >
                        <button class="show-modal">More Photo Problem</button>
                        </div>
                        <div class="detail_container" >
                        <button class="show-modal">More DNA Problem</button>
                        </div>   

                        <div class="modal hidden">
      <button class="close-modal">&times;</button>
      <h1>I'm a modal window ????</h1>
      <div class="detail_visual">
        <h3>visual problem</h3>
        <div>
         good
        </div>
        <h3>visual to improve</h3>
        <div>
        need to more moisture
       </div>
      </div>
      
   
    </div>
    <div class="overlay hidden"></div>
                  </div>
                      <div class="photo_block_style"style="width: 345px;display:flex; flex-direction: column;">
                          
                             <img src="https://static.inaturalist.org/photos/182181363/large.jpeg" alt="" width="100%" height="100%">
                         
                         
                          </div>
                          <div class="map_block_style" style="width: 345px;">
                               <div  id="mapid"  alt="" width="100px" height="100px"></div>
                          </div>
        
                          <div class="score_block_style" style="height: 100%;">
                          <div class="progress"> 
                          <div class="progress__bar"></div>
                        </div>
                              
                              </progress>
                          </div>
                  </div>
                  <div class="row_content2">
                 <div> 
                        I willing to get another sample 
                      <input type="button" value="Yes">
                  </div>
                      
                    
                 </div>
            
              </div>`);

        d3.select(main.children[1])
          .select(".photo_block_style")
          .node()

          .children[0].setAttribute("src", i.picuture);
        console.log(i.picuture);

        const species_name = d3.select(main.children[1]).node().children[0]
          .children[0].children[0].children[1].children[0];
        species_name.textContent = i.species_guess;
        if (species_name.textContent == "") {
          species_name.textContent = "unknown";
        }

        Array.from(d3.select(main).select("#times"))[0].textContent =
          i.time_observed_at;
      }

      var main_visual_problem = Array.from(
        d3.select(main).selectAll(".problem_block_style")
      )[0].children[0];
      var main_Photo_problem = Array.from(
        d3.select(main).selectAll(".problem_block_style")
      )[0].children[1];
      var main_DNA_problem = Array.from(
        d3.select(main).selectAll(".problem_block_style")
      )[0].children[2];

      if (i.problem.Visual == "") {
        main_visual_problem.textContent = "Good";
      } else if (i.problem.Visual != "") {
        main_visual_problem.textContent = i.problem.Visual;
      }
      if (i.problem.DNA == "") {
        main_DNA_problem.textContent = "Good";
      } else if (i.problem.DNA != "") {
        main_DNA_problem.textContent = i.problem.DNA;
      }
      if (i.problem.Photo == "") {
        main_Photo_problem.textContent = "Good";
      } else if (i.problem.Photo != "") {
        main_Photo_problem.textContent = i.problem.Photo;
      }
      // console.log();
      // console.log(i.geojson.coordinates[1]);
      // console.log(i.geojson.coordinates);
      // console.log(typeof 120.2658450231);
      var map = L.map("mapid").setView(
        [i.geojson.coordinates[1], i.geojson.coordinates[0]],
        13
      );

      const modal = document.querySelector(".modal");
      const overlay = document.querySelector(".overlay");
      const btnCloseModal = document.querySelector(".close-modal");
      const btnsOpenModal = document.querySelectorAll(".show-modal");

      const openModal = function (detailProblemTitle) {
        $(document).ready(function () {
          $(modal).removeClass("hidden");
          $(overlay).removeClass("hidden");
          $(modal).children()[1].textContent = detailProblemTitle;
          console.log(detailProblemTitle);
        });
        // modal.classList.remove("hidden");
        // overlay.classList.remove("hidden");
      };

      const closeModal = function () {
        modal.classList.add("hidden");
        overlay.classList.add("hidden");
      };

      for (let i = 0; i < btnsOpenModal.length; i++)
        btnsOpenModal[i].addEventListener("click", (d) => {
          console.log(btnsOpenModal[i]);
          var detailProblemTitle = btnsOpenModal[i].textContent;
          if (detailProblemTitle == "More Visual Problem") {
            openModal(detailProblemTitle);
          } else if (detailProblemTitle == "More Photo Problem") {
            openModal(detailProblemTitle);
          } else if (detailProblemTitle == "More DNA Problem") {
            openModal(detailProblemTitle);
          }
        });

      btnCloseModal.addEventListener("click", closeModal);
      overlay.addEventListener("click", closeModal);

      document.addEventListener("keydown", function (e) {
        // console.log(e.key);

        if (e.key === "Escape" && !modal.classList.contains("hidden")) {
          closeModal();
        }
      });
      console.log(map);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
      }).addTo(map);

      var popup = L.popup()
        .setLatLng([i.geojson.coordinates[1], i.geojson.coordinates[0]])
        .setContent(i.place_guess)
        .openOn(map);
      function onMapClick(e) {
        console.log(e);

        popup.setLatLng(e.latlng).setContent(e.latlng.toString()).openOn(map);
      }

      map.on("click", onMapClick);
      Array.from(d3.select(main).select("#sampleid"))[0].textContent = i.id;

      var sectionss = Array.from(d3.selectAll(".small>div"));

      var margins = { top: 40, right: 50, bottom: 40, left: 40 },
        widths = 1350 - margins.left - margins.right,
        heights = 340 - margins.top - margins.bottom;

      // console.log(blocks);
      for (k of sectionss) {
        console.log(k.getAttribute("class"));
        if (
          k.getAttribute("class") == "small_clicked active" ||
          k.getAttribute("class") == "small_clicked"
        ) {
          k.setAttribute("class", "small_block");
          k.children[0].classList.remove("row_container2");
          var orgsvg = d3.select(k.children[0]).select("svg");
          orgsvg
            .selectAll("circle")
            .attr("stroke", null)
            .attr("stroke-width", null);
          // console.log(orgsvg);
          var margin = { top: 20, right: 20, bottom: 20, left: 20 },
            width = 1350 - margin.left - margin.right,
            height = 50 - margin.top - margin.bottom;
          orgsvg
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

          const clicked_circle = Array.from(orgsvg.selectAll("circle"));
          const small_data = clicked_circle.map((d) => d.__data__);

          let xScale_small = d3
            .scaleTime()
            .domain(d3.extent(small_data, (d) => d.date))
            .range([margin.left * 6 + 5, width])
            .nice();
          let yScale_small = d3
            .scaleTime()
            .domain(d3.extent(small_data, (d) => d.hour))
            .range([margin.bottom, height - margin.bottom])
            .nice(d3.timeDay);

          orgsvg

            .selectAll("circle")
            .data(small_data)
            .attr("cx", (d) => {
              return xScale_small(d.date);
            })
            .attr("cy", (d) => yScale_small(d.hour));

          d3.select(k.children[0])
            .select(".largerow")
            .append("div")
            .classed("mask", true);
          for (p of Array.from(orgsvg.selectAll("g"))) {
            if (p.classList.contains("groups1")) {
              console.log(p.remove());
            }
            // for (r of Array.from(p.children)) {
            //   if (r.getAttribute("class") !== "cir") {
            //     r.remove();
            //   }
            // }
            if (p.classList.contains("yaxis")) {
              // $(p).hide();

              d3.select(p).attr("display", "none");

              // console.log(p);
            }
          }
        }
      }
    })
    .attr("r", 10.5);
}
