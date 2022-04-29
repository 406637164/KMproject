const url = "https://api.inaturalist.org/v1/observations/80365";
// d3.json("https://api.inaturalist.org/v1/observations/80365").then(function (d) {
//   showdata(data);
// });
// d3.csv("observations-217852.csv").then(dataloaded);
// function dataloaded(data) {
//   showdata(data);
// }
var problems = [
  [
    {
      Visual: "Sample too dry",
      Photo: "Photo too moisure",
      DNA: "Good",
    },
    { Photo: "", Visual: "", DNA: "" },
  ],
  [
    { Photo: "", Visual: "", DNA: "" },
    { Photo: "", Visual: "", DNA: "" },
  ],
  [
    { Photo: "", Visual: "", DNA: "" },
    { Photo: "", Visual: "", DNA: "" },
    {
      Visual: "Sample too dry",
      Photo: "Sample too dry",
      DNA: "Good",
    },
  ],
  [
    { Photo: "", Visual: "", DNA: "" },
    { Photo: "", Visual: "", DNA: "" },
    { Photo: "", Visual: "", DNA: "" },
  ],
  [
    { Photo: "", Visual: "", DNA: "" },
    { Photo: "", Visual: "", DNA: "" },
  ],
  [
    { Photo: "", Visual: "", DNA: "" },
    { Photo: "", Visual: "", DNA: "" },
  ],
  [
    { Photo: "", Visual: "", DNA: "" },
    { Photo: "", Visual: "", DNA: "" },
  ],
  [
    { Photo: "", Visual: "", DNA: "" },
    { Photo: "", Visual: "", DNA: "" },
  ],
  [
    { Photo: "", Visual: "", DNA: "" },
    { Photo: "Sample too moisure", Visual: "", DNA: "" },
    { Photo: "", Visual: "", DNA: "" },
  ],
];
var datas = [
  "https://api.inaturalist.org/v1/observations/107962329,110522145",
  "https://api.inaturalist.org/v1/observations/113298253,112452043",
  "https://api.inaturalist.org/v1/observations/113298231,113184014,113183791",
  "https://api.inaturalist.org/v1/observations/112166949,103694054,101404843",
  "https://api.inaturalist.org/v1/observations/113298234,113298234",
  "https://api.inaturalist.org/v1/observations/113138861,113138859",
  "https://api.inaturalist.org/v1/observations/113214311,113214308",
  "https://api.inaturalist.org/v1/observations/113216028,113205321",
  "https://api.inaturalist.org/v1/observations/110507257,112615472,110500020",
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
        // d.problem={"Visual":"too"}
        var parts = d.hour.split(/:/);

        var timePeriodMillis =
          parseInt(parts[0], 10) * 60 * 60 * 1000 +
          parseInt(parts[1], 10) * 60 * 1000 +
          parseInt(parts[2], 10) * 1000;
        d.hour = new Date();
        d.hour.setTime(todayMillis + timePeriodMillis);
        // d.problem = problems[i];
        // console.log(d);
      });
      problems[i].forEach((p, l) => {
        // console.log(data[l]);
        // console.log(p);
        data[l].problem = p;
        // console.log(l);
      });
      // problems[i].forEach((p) => {

      //   data.forEach((ds) => {
      //     ds.problem = p;

      //   });
      // });
      // console.log(data);
      // console.log(data[i]);

      let blocks = Array.from(d3.selectAll(".small"))[i];
      // console.log(data[i].user);
      // console.log(data[0].user.login);
      // console.log(data[i]);
      // console.log(data[i].user);
      console.log(datas);
      d3.select(blocks).select(".small_collector>p").node().textContent =
        data[0].user.login;
      console.log(problems[i]);
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

        // xScale_small.range([margins.left + 25, widths + margin.right]);

        // xScale_small.range([margins.left + 25, 1300]).nice();
        // yScale_small.range([margins.bottom, heights]);

        let clicked_svg = d3
          .select(this.children[0])
          .select(".small_sample")
          .select("svg");
        // console.log(d3.select(this.children[0]));

        const xScale_smalls = d3
          .scaleTime()
          .domain(d3.extent(data, (d) => d.date))
          .range([50, widths + margin.right])
          .nice();
        // console.log(d3.extent(data, (d) => d.date));

        const xAxis_smalls = d3
          .axisBottom(xScale_smalls)
          .tickFormat(d3.timeFormat("%Y/%m/%d"))
          .ticks(7);
        const yScale_smalls = d3
          .scaleTime()
          .domain(d3.extent(data, (d) => d.hour))
          .range([margins.bottom, 300])
          .nice(d3.timeDay);
        var yAxis_smalls = d3
          .axisLeft(yScale_smalls)
          .tickFormat(d3.timeFormat("%H:%M"))
          .ticks(10);
        console.log(data);
        console.log(clicked_svg.selectAll("circle").data(data));
        // clicked_svg.selectAll("cir")
        clicked_svg
          .select(".cirss")
          .selectAll(".cir")
          .data(data)
          .join("circle")
          .transition()
          .duration(1000)
          .attr("cx", (d) => xScale_smalls(d.date))
          .attr("cy", (d) => yScale_smalls(d.hour) - 10);
        // .attr("r")
        // smallsvg.selectAll("circle").remove();
        // clicked_svg
        // .append("g")
        // .attr("transform", `translate(10,0)`)
        // .selectAll("circle")
        // .data(data)
        // .join("circle")
        // .attr("class", "cir2")

        // .attr("cx", (d) => {
        //   return xScale_small(d.date) + 30;
        // })
        // .attr("cy", (d) => yScale_small(d.hour))
        // .attr("r", 10.5);

        // clicked_svg

        //   .selectAll("circle")
        //   .data(data)
        //   .join("circle")
        //   .attr("class", "cir")

        //   .attr("cx", (d) => {
        //     return xScale_small(d.date);
        //   })
        //   .attr("cy", (d) => yScale_small(d.hour) - 15);
        // console.log(Array.from(clicked_svg.selectAll(".xaxis")));

        // console.log(Array.from(clicked_svg.selectAll(".xaxis")).length);
        clicked_svg.select(".yaxis").attr("display", "visible");
        if (Array.from(clicked_svg.selectAll(".xaxis")).length == 0) {
          clicked_svg
            .append("g")
            .attr("class", "xaxis")
            .attr("transform", `translate(0,${heights})`)

            .call(xAxis_smalls)
            .selectAll("text")
            .style("font-size", "15px");
          clicked_svg
            .append("g")
            .attr("class", "yaxis")
            .attr("transform", `translate(50,-20)`)

            .call(yAxis_smalls)
            .selectAll("text")
            .style("font-size", "15px");
        }

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
          .attr("fill", (d) => {
            if (
              d.problem.DNA == "" &&
              d.problem.Photo == "" &&
              d.problem.Visual == ""
            ) {
              console.log(d);
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
              console.log(d);
              return "transparent";
            } else if (
              d.problem.DNA != "" ||
              d.problem.Photo != "" ||
              d.problem.Visual != ""
            ) {
              return "red";
            }
          })
          .transition()
          .duration(1000)
          .attr("stroke-width", function (d) {
            return d;
          })
          .attr(
            "transform",
            (d) =>
              `translate(${xScale_smalls(d.date) - 10},${
                yScale_smalls(d.hour) - 20
              })`
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
          .attr("transform", `translate(-30,-20)`)
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
              `translate(${xScale_smalls(d.date) + 20},${
                yScale_smalls(d.hour) + 5
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
          .attr("transform", `translate(-30,0)`)
          .classed("arrow", true)

          .selectAll("line")

          .data(data)
          .join("line")

          .attr("x1", (d) => xScale_smalls(d.date) + 20)
          .attr("y1", (d) => yScale_smalls(d.hour) + 5)
          .attr("x2", (d) => xScale_smalls(d.date) + 20)
          .attr("y2", (d) => 320)
          .attr("stroke-width", 2)
          .style("stroke", "5, 5");
        // .style("stroke", "gray");
        var left = group2s
          .append("g")
          .classed("arrow-right", true)
          .attr("transform", `translate(-30,0)`)
          .selectAll("line")
          .data(data)
          .join("line")

          .attr("x1", (d) => xScale_smalls(d.date) + 10)
          .attr("y1", 310)
          .attr("x2", (d) => xScale_smalls(d.date) + 20)
          .attr("y2", (d) => 320)
          .attr("stroke-width", 2);
        // .style("stroke", "black");

        var right = group2s
          .append("g")
          .classed("arrow-left", true)
          .attr("transform", `translate(-30,0)`)
          .selectAll("line")
          .data(data)
          .join("line")
          .attr("x1", (d) => xScale_smalls(d.date) + 30)
          .attr("y1", 310)
          .attr("x2", (d) => xScale_smalls(d.date) + 20)

          .attr("y2", (d) => 320)
          .attr("stroke-width", 2);
        // .style("stroke", "black");
        var arccir = d3
          .arc()
          .innerRadius(7)
          .outerRadius(10)
          .startAngle(3)
          .endAngle(12);

        arcs

          .append("g")
          .classed("uncircle", true)
          .attr("transform", `translate(-40,0)`)
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
              `translate(${xScale_smalls(d.date)},${
                yScale_smalls(d.hour) + 15
              })`
          )
          .style("stroke-width", "2px")
          .style("opacity", 0.7);
        // if (!clicked_svg.selectAll("g").classList.contains("circle2")) {
        // clicked_svg
        //   .append("g")
        //   .classed("circle2", true)

        //   .attr("transform", "translate(60,0)")
        //   .call(yAxis_smalls)
        //   .selectAll("text")
        //   .style("font-size", "15px");
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
                // xScale_small.range([margin.left * 8 + 5, width + margin.right]);
                // yScale_small.range([margin.bottom, height - margin.bottom]);
                var data2s = Array.from(
                  d3.select(i).select(".cirss").selectAll("circle")
                ).map((q) => q.__data__);
                let xScale_small = d3
                  .scaleTime()
                  .domain(d3.extent(data2s, (d) => d.date))
                  .range([margin.left * 6 + 5, width])
                  .nice();
                // console.log(d3.extent(data, (d) => d.date));
                // console.log(data);
                // console.log(data2s);
                // console.log(datas);

                let yScale_small = d3
                  .scaleTime()
                  .domain(d3.extent(data2s, (d) => d.hour))
                  .range([margin.bottom, height])
                  .nice(d3.timeDay);
                var orgsvg = d3
                  .select(i.children[0])
                  .select("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom);
                console.log(data);

                // d3.select(i).select(".cirss").selectAll("circle")._groups[0]
                orgsvg

                  .select(".cirss")
                  .selectAll("circle")
                  .data(data2s)
                  .attr("cx", (d) => xScale_small(d.date))
                  .attr("cy", (d) => yScale_small(d.hour))
                  .attr("fill", (d) => {
                    console.log(d.problem);
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
                  });
                //   .attr("class", "cir")
                //   .data(data)
                //   .join("circle")
                //   .filter(
                //     (d, i) => d.time_observed_at != "" && i.common_name != ""
                //   )
                // .attr("cx", (d) => {
                // console.log(xScale_small(d.date));
                // return xScale_small(d.date);
                // })
                // .attr("cy", (d) => yScale_small(d.hour));

                for (q of Array.from(orgsvg.selectAll("g"))) {
                  if (q.classList.contains("yaxis")) {
                    // $(p).hide();

                    d3.select(q).attr("display", "none");

                    // console.log(p);
                  }
                  if (q.classList.contains("groups1")) {
                    q.remove();
                  }
                  // for (r of Array.from(p.children)) {
                  // if (r.getAttribute("class") !== "cir") {

                  //   $(document).ready(function () {
                  //     $(r).hide();
                  //     console.log(r);
                  //   });
                  // }
                  // if (p.classList.contains("xaxis")) {
                  //   // console.log(p);
                  //   $(document).ready(function () {
                  //     $(p).hide();
                  //   });
                  // }

                  // }
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
        // .attr("transform", `translate(30,20)`)
        .attr("class", "cirss")
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("class", "cir")
        .attr("cx", (d) => {
          return xScale_small(d.date);
        })
        .attr("cy", (d) => yScale_small(d.hour))
        .attr("r", 10.5)
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
          console.log(d.problem.DNA);
          if (
            d.problem.DNA == "" &&
            d.problem.Photo == "" &&
            d.problem.Visual == ""
          ) {
            //妹問題的tooltip 綠色
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
            //有問題的tooltip 紅色
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
              items.setAttribute("style", "stroke: 5px, 5px; stroke: blue;");
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
              items.setAttribute("style", "stroke: 5px, 5px; stroke: blue;");
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
              items.setAttribute("style", "stroke: 5px, 5px; stroke: blue;");
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
                              <div  style="display:flex;justify-content: center;align-items:center;background-color:white;">&nbsp&nbsp&#128337;<span id="times">55465</span></div>   
                              <div  style="display:flex;justify-content: center;align-items:center;background-color:white;">&nbsp&nbsp🆔<span id="sampleid"></span></div>   
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
                              
                              </div>
                              <div class="map_block_style" style="width: 345px;">
                              <div style="width: 250px;height:230px"></div>
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

          //visual problem
          console.log(i.problem.Photo);
          console.log(i.problem.DNA);
          console.log(i.problem.Visual);
          var visual_problem = Array.from(
            d3.select(blocks).selectAll(".problem_block_style")
          )[0].children[0];
          var Photo_problem = Array.from(
            d3.select(blocks).selectAll(".problem_block_style")
          )[0].children[1];
          var DNA_problem = Array.from(
            d3.select(blocks).selectAll(".problem_block_style")
          )[0].children[2];
          console.log(i);
          console.log(i.problem);
          if (i.problem.Visual == "") {
            visual_problem.textContent = "Good";
          } else if (i.problem.Visual != "") {
            visual_problem.textContent = i.problem.Visual;
          }
          if (i.problem.DNA == "") {
            DNA_problem.textContent = "Good";
          } else if (i.problem.DNA != "") {
            DNA_problem.textContent = i.problem.DNA;
          }
          if (i.problem.Photo == "") {
            Photo_problem.textContent = "Good";
          } else if (i.problem.Photo != "") {
            Photo_problem.textContent = i.problem.Photo;
          }

          // if (i.problem.Photo == "") {
          //   Photo_problem.textContent = "good";
          // } else if (i.problem.Photo != "") {
          //   Photo_problem.textContent = i.problem.Photo;
          // }

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
          function randStr(length) {
            // result container
            var result = [];

            // characters pool
            var chars =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            // create random string
            for (var i = 0; i < length; i++) {
              // get random position character
              result.push(
                chars.charAt(Math.floor(Math.random() * chars.length))
              );
            }

            // return result
            return result.join("");
          }
          const ids = randStr(8);
          console.log(ids);

          d3.select(blocks).select(".map_block_style>div").attr("id", ids);

          // d3.select(blocks)
          //   .select(ids)
          //   .attr("height", "230px")
          //   .attr("width", "230px");
          console.log(d3.select(blocks).select(".map_block_style>div"));

          var maps = L.map(ids).setView(
            [i.geojson.coordinates[1], i.geojson.coordinates[0]],
            13
          );
          console.log(maps);
          L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          ).addTo(maps);

          L.marker([i.geojson.coordinates[1], i.geojson.coordinates[0]])
            .addTo(maps)
            .bindPopup(i.place_guess)
            .openPopup();
          // L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          //   attribution:
          //     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          // }).addTo(map);

          // L.marker([i.geojson.coordinates[1], i.geojson.coordinates[0]])
          //   .addTo(map)
          //   .bindPopup(i.place_guess)
          //   .openPopup();
          //   [i.geojson.coordinates[1], i.geojson.coordinates[0]],
          //   13
          // );
          // L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          //   attribution:
          //     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          // }).addTo(map);

          // L.marker([i.geojson.coordinates[1], i.geojson.coordinates[0]])
          //   .addTo(map)
          //   .bindPopup(i.place_guess)
          //   .openPopup();
          // var osm = new L.TileLayer(osmUrl, { minZoom: 6, maxZoom: 16 });
          // map.addLayer(osm);

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
