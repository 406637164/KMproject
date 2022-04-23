const url = "https://api.inaturalist.org/v1/observations/80365";
// d3.json("https://api.inaturalist.org/v1/observations/80365").then(function (d) {
//   showdata(data);
// });
// d3.csv("observations-217852.csv").then(dataloaded);
// function dataloaded(data) {
//   showdata(data);
// }
datas = [
  "https://api.inaturalist.org/v1/observations?user_login=yenshu1&year=2022&order=desc&order_by=created_at",
  "https://api.inaturalist.org/v1/observations?user_login=xin883238&year=2022&order=desc&order_by=created_at",
  "https://api.inaturalist.org/v1/observations?user_login=ssnp100&year=2022&order=desc&order_by=created_at",
  "https://api.inaturalist.org/v1/observations?user_login=wairambar_rainforest&year=2022&order=desc&order_by=created_at",
  "https://api.inaturalist.org/v1/observations?user_login=jeff314&year=2022&order=desc&order_by=created_at",
  "https://api.inaturalist.org/v1/observations?user_login=michaelpatrickyoon&year=2022&order=desc&order_by=created_at",
  "https://api.inaturalist.org/v1/observations?user_login=nikitacoppisetti&year=2022&order=desc&order_by=created_at",

  "https://api.inaturalist.org/v1/observations?user_login=frankhuang1&year=2022&order=desc&order_by=created_at",
  "https://api.inaturalist.org/v1/observations?user_login=naturalist25592500&year=2022&order=desc&order_by=created_at",
  "https://api.inaturalist.org/v1/observations?user_login=wollihuang&year=2022&order=desc&order_by=created_at",
  "https://api.inaturalist.org/v1/observations?user_login=naturalist3828&year=2022&order=desc&order_by=created_at",
  "https://api.inaturalist.org/v1/observations?user_login=naturalist29475&year=2022&order=desc&order_by=created_at",
];
for (let i = 0; i < datas.length; i++) {
  d3.select("body").append("section").attr("id", i).attr("class", "small")
    .html(` <div class="small_block">
<div class="row_container1">
<div class="small_rank row"><p></p></div>
<div class="small_collector row"><p></p></div>
<div class="small_sample row largerow">
<div class="mask"></div>
 
</div>
<div class="small_score row">
<div class="progress"> 
<div class="progress__bar"></div>
</div>
    
    </progress>
</div>
</div>
<div class="detailactive">
<div class="row_container2"></div>
</div>
</div>`);

  d3.json(datas[i]).then(function (d) {
    datas = d.results;

    showdata(d.results);
    function showdata(data) {
      // console.log(data);
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      todayMillis = today.getTime();
      // console.log(new Date(data[i].time_observed_at));
      data.forEach((d) => {
        d.date = new Date(d.time_observed_at);
        d.hour = formatTime(d.date);

        var parts = d.hour.split(/:/);

        var timePeriodMillis =
          parseInt(parts[0], 10) * 60 * 60 * 1000 +
          parseInt(parts[1], 10) * 60 * 1000 +
          parseInt(parts[2], 10) * 1000;
        d.hour = new Date();
        d.hour.setTime(todayMillis + timePeriodMillis);
      });
      // console.log(data[i]);

      let blocks = Array.from(d3.selectAll(".small"))[i];
      // console.log(data[i].user);

      d3.select(blocks).select(".small_collector>p").node().textContent =
        data[i].user.login;

      d3.select(blocks).select(".small_rank>p").node().textContent = i + 2;
      $(document).ready(function () {
        $(Array.from(d3.select(blocks).selectAll(".row_container1"))[1]).hide();
      });
      console.log(
        d3
          .select(blocks)
          .select("#small_progress")
          .attr("value", (d) => 60)
      );
      // console.log(d3.select(blocks).select(".small_sample").node());

      var margin = { top: 20, right: 20, bottom: 20, left: 20 },
        width = 1350 - margin.left - margin.right,
        height = 50 - margin.top - margin.bottom;

      let xScale_small = d3
        .scaleTime()
        .domain(d3.extent(data, (d) => d.date))
        .range([margin.left * 6 + 5, width])
        .nice();
      // console.log(d3.extent(data, (d) => d.date));

      let yScale_small = d3
        .scaleTime()
        .domain(d3.extent(data, (d) => d.hour))
        .range([margin.bottom, height])
        .nice(d3.timeDay);
      var xAxis_small = d3
        .axisBottom(xScale_small)
        .tickFormat(d3.timeFormat("%Y/%m/%d"))
        .ticks(7);
      var yAxis_small = d3
        .axisLeft(yScale_small)
        .tickFormat(d3.timeFormat("%H:%M"))
        .ticks(10);
      // console.log(d3.extent(data, (d) => d.hour));

      var div = d3.select("body").append("div");

      const smallsvg = d3
        .select(blocks)
        .select(".small_sample")

        .append("svg")
        .attr("transform", `translate(0,0)`)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g");
      // console.log(data);
      let margins = { top: 40, right: 50, bottom: 40, left: 40 },
        widths = 1350 - margins.left - margins.right,
        heights = 360 - margins.top - margins.bottom;
      d3.select(blocks).on("click", function () {
        this.children[0].children[0].classList.add("row_container2");
        this.children[0].classList.remove("small_block");
        this.children[0].classList.add("small_clicked");
        d3.select(this.children[0]).select(".mask").remove();
        d3.select(this.children[0])
          .select("svg")
          .attr("height", heights + margin.top + margin.bottom);

        xScale_small.range([margins.left + 25, widths + margin.right]);

        // xScale_small.range([margins.left + 25, 1300]).nice();
        yScale_small.range([margins.bottom, heights]);
        let clicked_svg = d3
          .select(this.children[0])
          .select(".small_sample")
          .select("svg");
        // console.log(d3.select(this.children[0]));

        console.log(data);
        console.log(clicked_svg.selectAll("circle").data(data));

        clicked_svg

          .selectAll("circle")
          .data(data)
          .join("circle")
          .attr("class", "cir")

          .attr("cx", (d) => {
            return xScale_small(d.date);
          })
          .attr("cy", (d) => yScale_small(d.hour) - 15);

        clicked_svg

          .selectAll("circle")
          .data(data)
          .join("circle")
          .attr("class", "cir")

          .attr("cx", (d) => {
            return xScale_small(d.date);
          })
          .attr("cy", (d) => yScale_small(d.hour) - 15);
        clicked_svg
          .append("g")
          .attr("transform", `translate(0,${heights})`)
          .call(xAxis_small)
          .selectAll("text")
          .style("font-size", "15px");

        var arc1 = d3
          .arc()
          .innerRadius(7)
          .outerRadius(10)
          .startAngle(5.2)
          .endAngle(7.5);

        // console.log(
        //   d3.select(clicked_svg).selectAll(".groups1") !== "undefined"
        // );
        // clicked_svg.forEach((g) => {
        //   console.log(g);
        // });

        let group2s = clicked_svg.append("g").classed("groups1", true);

        var gro = Array.from(
          d3
            .select(d3.select(clicked_svg._groups[0][0]).node())
            .selectAll(".groups1")
        );

        for (var o = 0; o < gro.length; o++) {
          if (o != 0) {
            gro[o].remove();
          }
          // console.log(gro[o]);
        }

        // if (!clicked_svg.selectAll("g").classList.contains("groups1")) {
        //   console.log(
        //     !clicked_svg.selectAll("g").classList.contains("groups1")
        //   );
        // }

        // var rectcolor = ["#EFF4AC", "#34C4E3", "#000000"];
        // clicked_svg
        //   .selectAll("rect")
        //   .data(rectcolor)
        //   .enter()
        //   .append("rect")
        //   .attr("x", 60)
        //   .attr("y", (d, i) => 93 * i)
        //   .attr("position", "relative")
        //   .attr("z-index", "-10")
        //   .attr("width", 1250)
        //   .attr("height", 95)
        //   .attr("transform", "translate(" + 0 + "," + 5 + ")")
        //   .attr("fill", (d) => d)
        //   .attr("opacity", 0.2);
        arcs = group2s.attr("transform", "translate(10,0)");
        arcs
          .append("g")
          .selectAll("path")
          // .append("path")
          .data(data)
          .join("path")
          .attr("d", arc1)

          .filter((d, i) => d.time_observed_at != "" && i.common_name != "")
          .attr("fill", "red")

          .attr("stroke", "red")
          .attr("stroke-width", function (d) {
            return d;
          })
          .attr(
            "transform",
            (d) =>
              `translate(${xScale_small(d.date) + 20},${
                yScale_small(d.hour) - 15
              })`
          )
          .style("stroke-width", "2px")
          .style("opacity", 0.7);
        var arc2 = d3
          .arc()
          .innerRadius(14)
          .outerRadius(17)
          .startAngle(3)
          .endAngle(12);

        arcs

          .append("g")
          .classed("uncircle", true)
          .selectAll("path")

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
            (d) =>
              `translate(${xScale_small(d.date) + 20},${
                yScale_small(d.hour) + 5
              })`
          )
          .style("stroke-width", "2px")
          .style("opacity", 0.7);
        var arrowStartPosition = 5;
        var arrowSpacing = 60;
        var verticalStrokeColor = "black";
        var arrowYStartPosition = 5;
        var arrowYEndStartPosition = 150;
        var m = 150;
        group2s
          // .classed("arrow", true)
          .append("g")
          .classed("arrow", true)
          .selectAll("line")
          .data(data)
          .join("line")
          .attr("x1", (d) => xScale_small(d.date) + 20)
          .attr("y1", (d) => yScale_small(d.hour) + 23)
          .attr("x2", (d) => xScale_small(d.date) + 20)
          .attr("y2", (d) => 320)
          .attr("stroke-width", 2)
          .style("stroke-dasharray", "5, 5");
        // .style("stroke", "gray");
        var left = group2s
          .append("g")
          .classed("arrow-right", true)
          .selectAll("line")
          .data(data)
          .join("line")
          .attr("x1", (d) => xScale_small(d.date) + 10)
          .attr("y1", 310)
          .attr("x2", (d) => xScale_small(d.date) + 20)
          .attr("y2", (d) => 320)
          .attr("stroke-width", 2);
        // .style("stroke", "black");

        var right = group2s
          .append("g")
          .classed("arrow-left", true)
          .selectAll("line")
          .data(data)
          .join("line")
          .attr("x1", (d) => xScale_small(d.date) + 30)
          .attr("y1", 310)
          .attr("x2", (d) => xScale_small(d.date) + 20)

          .attr("y2", (d) => 320)
          .attr("stroke-width", 2);
        // .style("stroke", "black");
        var arccir = d3
          .arc()
          .innerRadius(14)
          .outerRadius(17)
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
          .attr("d", arccir)

          .filter((d, i) => d.time_observed_at != "" && i.common_name != "")
          .attr("fill", "transparent")

          .attr("stroke", "transparent")
          .attr("stroke-width", function (d) {
            return d / 2;
          })
          .attr(
            "transform",
            (d) =>
              `translate(${xScale_small(d.date) + 20},${
                yScale_small(d.hour) + 5
              })`
          )
          .style("stroke-width", "2px")
          .style("opacity", 0.7);
        // if (!clicked_svg.selectAll("g").classList.contains("circle2")) {
        clicked_svg
          .append("g")
          .classed("circle2", true)

          .attr("transform", "translate(60,0)")
          .call(yAxis_small)
          .selectAll("text")
          .style("font-size", "15px");
        // }

        for (i of d3.selectAll("section")) {
          if (this.getAttribute("id") != i.getAttribute("id")) {
            // i.children[0].classList.add("small_block");
            if (!i.children[0].classList.contains("small_block")) {
              if (
                !i.children[0].classList.contains("main_block") &&
                i.children[0].getAttribute("id") != "main"
              ) {
                if (i.children[0].classList.contains("active")) {
                  i.children[0].classList.remove("active");
                }
                i.children[0].classList.add("small_block");
                i.children[0].classList.remove("small_clicked");
                xScale_small.range([margin.left * 8 + 5, width + margin.right]);
                yScale_small.range([margin.bottom, height - margin.bottom]);
                var orgsvg = d3
                  .select(i.children[0])
                  .select("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom);
                orgsvg
                  .selectAll("circle")
                  .attr("class", "cir")
                  .data(data)
                  .join("circle")
                  .filter(
                    (d, i) => d.time_observed_at != "" && i.common_name != ""
                  )
                  .attr("cx", (d) => {
                    // console.log(xScale_small(d.date));
                    return xScale_small(d.date);
                  })
                  .attr("cy", (d) => yScale_small(d.hour));
                orgsvg
                  .selectAll("circle")
                  .attr("stroke", null)
                  .attr("stroke-width", null);
                for (p of Array.from(orgsvg.selectAll("g"))) {
                  if (p.classList.contains("groups1")) {
                    p.remove();
                  }
                  for (r of Array.from(p.children)) {
                    if (r.getAttribute("class") !== "cir") {
                      r.remove();
                    }
                  }
                }
                d3.select(i.children[0])
                  .select(".largerow")
                  .append("div")
                  .classed("mask", true);
                i.children[0].children[0].classList.remove("row_container2");
              } else if (i.children[0].getAttribute("id") == "main") {
                if (i.children[0].classList.contains("active")) {
                  $(document).ready(function () {
                    $(d3.select(main).select(".detailactive").node()).hide();
                    main.classList.remove("active");
                    main.classList.add("main_block");
                    $(document).ready(function () {
                      $(
                        d3.select(main).select(".groups").select(".uncircle")
                          ._groups[0][0]
                      ).hide();
                      $(
                        d3.select(main).select(".groups").select(".arrow")
                          ._groups[0][0]
                      ).hide();
                      $(
                        d3.select(main).select(".groups").select(".arrow-right")
                          ._groups[0][0]
                      ).hide();

                      $(
                        d3.select(main).select(".groups").select(".arrow-left")
                          ._groups[0][0]
                      ).hide();
                    });
                    // console.log(
                    //   d3.select(main).select(".groups").select(".arrow-left")
                    //     ._groups[0][0]
                    // );
                    // d3.select(main)
                    //   .select(".groups")
                    //   .selectAll(".uncircle")
                    //   .remove();
                    // d3.select(main)
                    //   .select(".groups")
                    //   .selectAll(".arrow")
                    //   .remove();
                    // d3.select(main)
                    //   .select(".groups")
                    //   .selectAll(".arrow-right")
                    //   .remove();
                    // d3.select(main)
                    //   .select(".groups")
                    //   .selectAll(".arrow-left")
                    //   .remove();
                  });

                  // console.log(d3.select(i).select(".detailactive"));
                }
                // console.log(i.children[0]);
              }
            }

            // i.children[0].classList.add("small_block");
            // i.children[0].children[0].remove("row_container2");
          }
          // console.log(i.getAttribute("id"));
        }
        // console.log(this.getAttribute("id"));
      });

      d3.selectAll(".mask").on("click", function (s, q) {
        // s.preventDefault();
        console.log(s);
      });

      xScale_small.range([margins.left + 25, widths + margin.right]);
      smallsvg
        .attr("transform", `translate(30,20)`)
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("class", "cir")
        .attr("cx", (d) => {
          return xScale_small(d.date);
        })
        .attr("cy", (d) => yScale_small(d.hour))
        .attr("r", 10.5)
        .on("mouseover", function (event, d) {
          div
            .attr("class", "tooltip")
            .style("opacity", 0)
            .transition()
            .duration(200)
            .style("opacity", 0.9)
            .style("left", event.pageX + "px")
            .style("top", event.pageY - 28 + "px");

          div
            .html(`${d.species_guess}</br>${d.date}</br>`)
            .style("left", event.pageX + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
            .style("top", event.pageY - 28 + "px");
        })
        .on("mouseout", function (event, d) {
          div.transition().duration(100).style("opacity", 0);
        })
        .on("click", function (d, i) {
          // var getcirs = d3.select(blocks).select("svg").selectAll(".cir");
          // getcirs.attr("stroke", null).attr("stroke-width", null);
          // d3.select(this).attr("stroke", "blue").attr("stroke-width", "3px");
          // console.log(d3.select(this)._groups[0][0].__data__.time_observed_at);

          var groups = d3
            .select(d3.select(this)._groups[0][0].parentNode.parentNode)
            .select(".groups1");

          groups = d3.select(groups).node()._groups[0][0];
          // console.log(groups);
          var uncircles = d3
            .select(groups)
            .select(".uncircle")
            .selectAll("path")._groups[0];
          console.log(d3.select(groups).node());
          uncircles.forEach((items) => {
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
            }
          });

          var arrow = d3.select(groups).select(".arrow").selectAll("line")
            ._groups[0];

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
              items.setAttribute(
                "style",
                "stroke-dasharray: 5px, 5px; stroke: gray;"
              );
            }
          });

          var arrow = d3.select(groups).select(".arrow-right").selectAll("line")
            ._groups[0];

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
              items.setAttribute(
                "style",
                "stroke-dasharray: 5px, 5px; stroke: gray;"
              );
            }
          });

          var arrow = d3.select(groups).select(".arrow-left").selectAll("line")
            ._groups[0];

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
              items.setAttribute(
                "style",
                "stroke-dasharray: 5px, 5px; stroke: gray;"
              );
            }
          });

          //防止其他元素點及影響
          // for (j of d3.selectAll(".small")) {
          //   if (
          //     j.getAttribute("id") !=
          //     this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute(
          //       "id"
          //     )
          //   ) {
          //     d3.select(j)
          //       .selectAll("circle")
          //       .on("click", function (q, w) {
          //         // console.log(q);
          //         q.stopPropagation();
          //       });
          //   }
          //   console.log(d);
          // }
          // console.log(
          //   d3.select(blocks).append("div").classed("detailactive", true)
          // );
          //
          var detailblock =
            this.parentNode.parentNode.parentNode.parentNode.parentNode.classList.add(
              "active"
            );
          var activeblocks =
            (this.parentNode.parentNode.parentNode.parentNode.parentNode.children[1].innerHTML = `
              <div class="row_container1"  id="detail1" style="height: 300px;">
     
  
              <div class="row_container2" id="rows2" style="height:300px; ">
                 
            
                    <div class="detail_content" style="width: 100%; height:470px  ">
                      <div class="row_content1" style="width: 1840px;justify-content:flex-start">
            
                          <div class="quality_block_style" style="width:265px;" >
                       
                          <div class="quality_block" style="height: 100%;display:flex colomn;justify-content: center;align-items:flex-start;font-size: 1rem;">
                              <div  style="display:flex;justify-content: center;align-items:center;background-color:white;">&#128337;<span id="times">55465</span></div>   
                              <div  style="display:flex;justify-content: center;align-items:center;background-color:white;">🆔<span id="sampleid">54654</span></div>   
                                </div>
                               
                                  
                               </div>
                        <div class="quality_block_style" style="width: 150px;" >
                       
                          <div class="quality_block" style="height: 100%;">
                              <span>Quality</span>
                              
                            </div>
                           
                              
                           </div>
                         
                           <div class="quality_block_style" style="width: 325px;" >
                       
                            <div class="quality_block" style="height: 100%;">
                                <span>Problem</span>
                                
                              </div>
                             
                                
                             </div>
                             <div class="quality_block_style" style="width: 325px;" >
                       
                              <div class="quality_block" style="height: 100%;">
                                  <span> Method to Improve
                                  </span>
                                  
                                </div>
                               
                                  
                               </div>
                               <div class="quality_block_style" style="width: 325px;" >
                       
                                <div class="quality_block" style="height: 100%;">
                                    <span>Photo</span>
                                    
                                  </div>
                                 
                                    
                                 </div>
                                 <div class="quality_block_style" style="width: 325px;" >
                       
                                  <div class="quality_block" style="height: 100%;">
                                      <span> Map </span>
                                      
                                    </div>
                                   
                                      
                                   </div>
                                   <div class="quality_block_style" style="width: 141px;" >
                       
                                    <div class="quality_block" style="height: 100%;">
                                        <span>Score</span>
                                        
                                      </div>
                                     
                                        
                                     </div>
             
                    
                      </div>
                      <div class="row_content1" style="width: 1840px;">
            
                        <div class="quality_block_style" style="width: 280px;" >
                         
                          <div class="quality_block" style="height: 100%;">
                              
                              <span>Sample</span>
                              
                            </div>
                           
                              
                           </div>
                          <div class="quality_block_style" style="width: 160px;" >
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
                   
                          <div class="photo_block_style"style="width: 345px;display:flex; flex-direction: column;">
                              
                                 <img src="https://static.inaturalist.org/photos/182181363/large.jpeg" alt="" width="100%" height="100%">
                             
                                 <div background-image: url("ina.png");  alt="" width="100px" height="100px"></div>
                              </div>
                              <div class="map_block_style" style="width: 345px;">
                                  <img src="ina.png" alt="" width="100%" height="100%">
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
                
                  </div>
              `);
          d3.select(blocks.children[0].children[1])
            .select(".photo_block_style")
            .node()
            .children[0].setAttribute("src", i.photos[0].url);
          const small_speices = Array.from(
            d3.select(
              blocks.children[0].children[1].children[0].children[0].children[0]
                .children[1].children[0]
            )
          )[0];
          small_speices.textContent = i.species_guess;
          if (small_speices.textContent == "") {
            small_speices.textContent = "unknown";
          }

          Array.from(d3.select(blocks).select("#times"))[0].textContent =
            i.time_observed_at;
          Array.from(d3.select(blocks).select("#sampleid"))[0].textContent =
            i.id;

          // var margins = { top: 40, right: 50, bottom: 40, left: 40 },
          //   widths = 1350 - margins.left - margins.right,
          //   heights = 360 - margins.top - margins.bottom;

          // d3.select(blocks)
          //   .select("svg")
          //   .node()
          //   .setAttribute("height", heights + margin.top + margin.bottom);
          // xScale_small.range([margins.left + 25, widths]);
          // yScale_small.range([margins.bottom, heights - margins.bottom]);

          // d3.select(blocks)
          //   .select("svg")
          //   .selectAll("circle")
          //   .attr("cx", (d) => {
          //     console.log(xScale_small(d.date));
          //     return xScale_small(d.date);
          //   })
          //   .attr("cy", (d) => yScale_small(d.hour));
          // smallsvg
          //   .append("g")
          //   .attr("transform", `translate(0,${heights - margins.bottom})`)
          //   .call(xAxis_small)
          //   .selectAll("text")
          //   .style("font-size", "15px");
          // // var yScale = d3.axisLeft()

          // smallsvg
          //   .append("g")
          //   .attr("transform", "translate(60,0)")
          //   .call(yAxis_small)
          //   .selectAll("text")
          //   .style("font-size", "15px");

          // var sections = Array.from(d3.selectAll(".small>div"));
        });
    }
  });
}
