// Monthly ICE arrest counts split by ICE's own criminality classification.
// Source: arrests_filtered_20260501_232322.parquet — 713,464 records total.
// All three categories together account for every row in that file.

const months = [
  "2022-10","2022-11","2022-12",
  "2023-01","2023-02","2023-03","2023-04","2023-05","2023-06",
  "2023-07","2023-08","2023-09","2023-10","2023-11","2023-12",
  "2024-01","2024-02","2024-03","2024-04","2024-05","2024-06",
  "2024-07","2024-08","2024-09","2024-10","2024-11","2024-12",
  "2025-01","2025-02","2025-03","2025-04","2025-05","2025-06",
  "2025-07","2025-08","2025-09","2025-10","2025-11","2025-12",
  "2026-01","2026-02","2026-03"
];

const series = [
  {
    key:   "convicted",
    label: "CONVICTED CRIMINAL",
    color: "#6e9ec7",
    counts: [3941,3961,3814,4118,4468,5350,4465,4956,4878,4666,4755,4147,4422,4261,4037,4254,5003,5076,5351,5377,4581,5246,5064,4586,5405,4802,4901,6298,7812,8395,7865,9005,10164,9659,9791,10067,11035,9803,10685,10079,8944,2952],
  },
  {
    key:   "pending",
    label: "PENDING CRIMINAL CHARGES",
    color: "#a0a0a0",
    counts: [1516,1515,1311,1507,1535,1734,1617,1843,1842,1980,1581,1483,1493,1478,1575,1540,1770,1950,2067,2280,2068,2354,2552,2237,2677,2318,2570,3421,5643,6617,6377,7435,7860,7853,8352,9352,10791,10065,10434,10243,8543,3153],
  },
  {
    key:   "violator",
    label: "OTHER IMMIGRATION VIOLATOR",
    color: "#e05a4e",
    // These people have no criminal charge
    counts: [11316,11042,10213,12492,10253,8738,7319,6948,5945,5086,5552,5050,4264,3268,4320,2802,2925,2727,2898,2696,2012,1977,1672,1655,1543,1150,1137,2629,3955,3888,3669,6244,12470,9854,10207,13758,15811,15275,19162,17769,12538,4263],
  },
];



const chartContainer = document.getElementById("chart");
const totalWidth  = Math.min(chartContainer.clientWidth || 920, 960);
const margin      = { top: 24, right: 24, bottom: 88, left: 72 };
const chartWidth  = totalWidth - margin.left - margin.right;
const chartHeight = Math.round(chartWidth * 0.50);


// converts string into js obj

const parseMonth = d3.timeParse("%Y-%m");
const dates = months.map(parseMonth);


const xScale = d3.scaleTime()
  .domain([ dates[0], dates[dates.length - 1] ])
  .range([ 0, chartWidth ]);

const highestCount = d3.max(series, s => d3.max(s.counts));

const yScale = d3.scaleLinear()
  .domain([ 0, highestCount * 1.08 ])
  .range([ chartHeight, 0 ])  
  .nice();

const svg = d3.select("#chart")
  .append("svg")
  .attr("width",  totalWidth)
  .attr("height", chartHeight + margin.top + margin.bottom)
  .style("display", "block");

svg.append("rect")
  .attr("width",  totalWidth)
  .attr("height", chartHeight + margin.top + margin.bottom)
  .attr("fill", "#0d0d0d");

const chart = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);



chart.append("g")
  .call(
    d3.axisLeft(yScale)
      .ticks(5)
      .tickSize(-chartWidth)   
      .tickFormat("")           
  )
  .call(axis => axis.select(".domain").remove())
  .call(axis => axis.selectAll(".tick line")
    .attr("stroke", "#1a1a1a")
    .attr("stroke-width", 1)
  );

chart.append("g")
  .attr("transform", `translate(0, ${chartHeight})`)
  .call(
    d3.axisBottom(xScale)
      .ticks(d3.timeMonth.every(1))
      .tickSize(-chartHeight)
      .tickFormat("")
  )
  .call(axis => axis.select(".domain").remove())
  .call(axis => axis.selectAll(".tick line")
    .attr("stroke",       tick => tick.getMonth() === 0 ? "#2a2a2a" : "#181818")
    .attr("stroke-width", tick => tick.getMonth() === 0 ? 1 : 0.5)
  );


//X AXIS (months along the bottom) 
//labels are rotated 90° so they fit without overlapping.
//january shows the year ("Jan '25"); other months show just the abbreviation.

function formatMonthLabel(date) {
  if (date.getMonth() === 0) {
    return d3.timeFormat("%b '%y")(date);  // "Jan '25"
  }
  return d3.timeFormat("%b")(date);        // "Feb", "Mar", ...
}

chart.append("g")
  .attr("transform", `translate(0, ${chartHeight})`)
  .call(
    d3.axisBottom(xScale)
      .ticks(d3.timeMonth.every(1))
      .tickFormat(formatMonthLabel)
      .tickSize(4)
  )
  .call(axis => axis.select(".domain").attr("stroke", "#2e2e2e"))
  .call(axis => axis.selectAll(".tick line").attr("stroke", "#2e2e2e"))
  .call(axis => axis.selectAll(".tick text")
    .attr("fill",        tick => tick.getMonth() === 0 ? "#6a6a6a" : "#404040")
    .attr("font-family", "monospace")
    .attr("font-size",   "9px")
    .attr("text-anchor", "end")
    .attr("dx",          "-0.5em")
    .attr("dy",          "0.3em")
    .attr("transform",   "rotate(-90)")
  );


//Y AXIS (arrest counts along the left) 

chart.append("g")
  .call(
    d3.axisLeft(yScale)
      .ticks(5)
      .tickFormat(count => count >= 1000 ? `${count / 1000}k` : count)
      .tickSize(4)
  )
  .call(axis => axis.select(".domain").attr("stroke", "#2e2e2e"))
  .call(axis => axis.selectAll(".tick line").attr("stroke", "#2e2e2e"))
  .call(axis => axis.selectAll(".tick text")
    .attr("fill",        "#4a4a4a")
    .attr("font-family", "monospace")
    .attr("font-size",   "10px")
    .attr("dx",          "-6px")
  );

//Y-axis label, rotated sideways
chart.append("text")
  .attr("transform",   "rotate(-90)")
  .attr("x",           -chartHeight / 2)
  .attr("y",           -58)
  .attr("text-anchor", "middle")
  .attr("fill",        "#383838")
  .attr("font-family", "monospace")
  .attr("font-size",   "9px")
  .attr("letter-spacing", "0.09em")
  .text("APPREHENSIONS / MONTH");


//TRUMP INAUGURATION MARKER 

const inaugurationX = xScale(parseMonth("2025-01"));

chart.append("line")
  .attr("x1", inaugurationX)
  .attr("x2", inaugurationX)
  .attr("y1", 0)
  .attr("y2", chartHeight)
  .attr("stroke",           "#2e2e2e")
  .attr("stroke-width",     1)
  .attr("stroke-dasharray", "4 3");

chart.append("text")
  .attr("x",           inaugurationX)
  .attr("y",           -8)
  .attr("text-anchor", "middle")
  .attr("fill",        "#404040")
  .attr("font-family", "monospace")
  .attr("font-size",   "9px")
  .attr("letter-spacing", "0.06em")
  .text("TRUMP INAUGURATION  JAN 20, 2025");


const lineGenerator = d3.line()
  .x((count, index) => xScale(dates[index]))
  .y(count => yScale(count))
  .curve(d3.curveCatmullRom.alpha(0.5));

const drawOrder = ["convicted", "pending", "violator"];

drawOrder.forEach(key => {
  const thisSeries = series.find(s => s.key === key);

  chart.append("path")
    .datum(thisSeries.counts)
    .attr("fill",             "none")
    .attr("stroke",           thisSeries.color)
    .attr("stroke-width",     key === "violator" ? 2.2 : 1.6)
    .attr("stroke-linejoin",  "round")
    .attr("stroke-linecap",   "round")
    .attr("opacity",          key === "violator" ? 1 : 0.7)
    .attr("d", lineGenerator);
});


const allPoints = [];

series.forEach((thisSeries, seriesIndex) => {
  thisSeries.counts.forEach((count, monthIndex) => {
    if (count > 0) {
      allPoints.push({
        x:           xScale(dates[monthIndex]),
        y:           yScale(count),
        seriesIndex: seriesIndex,
      });
    }
  });
});


const delaunay = d3.Delaunay.from(allPoints, point => point.x, point => point.y);
const voronoi  = delaunay.voronoi([ 0, 0, chartWidth, chartHeight ]);

series.forEach((thisSeries, seriesIndex) => {


  const pointsInThisSeries = allPoints
    .map((point, index) => ({ ...point, allPointsIndex: index }))
    .filter(point => point.seriesIndex === seriesIndex);

  let bestPoint    = null;
  let bestArea     = -Infinity;
  let bestCell     = null;

  pointsInThisSeries.forEach(point => {
    const cell = voronoi.cellPolygon(point.allPointsIndex);
    if (!cell) return;
    const area = Math.abs(d3.polygonArea(cell));
    if (area > bestArea) {
      bestArea  = area;
      bestPoint = point;
      bestCell  = cell;
    }
  });

  if (!bestPoint || !bestCell) return;


  const cellCentroid = d3.polygonCentroid(bestCell);

  let labelX = bestPoint.x;
  let labelY = bestPoint.y;

  const nudgeX = (cellCentroid[0] - labelX) / 50;
  const nudgeY = (cellCentroid[1] - labelY) / 50;

  const labelBackground = chart.append("rect")
    .attr("rx",           2)
    .attr("fill",         "#0d0d0d")
    .attr("fill-opacity", 0.88);

  const labelText = chart.append("text")
    .attr("x",              labelX)
    .attr("y",              labelY)
    .attr("dy",             "0.35em")
    .attr("fill",           thisSeries.color)
    .attr("font-family",    "monospace")
    .attr("font-size",      seriesIndex === 2 ? "11.5px" : "10.5px")
    .attr("font-weight",    "700")
    .attr("letter-spacing", "0.06em")
    .text(thisSeries.label);

  for (let attempt = 0; attempt < 50; attempt++) {
    const box = labelText.node().getBBox();
    const padding = 4;

    const labelOverlapsAPoint = allPoints.some(point =>
      point.x >= box.x - padding &&
      point.x <= box.x + box.width  + padding &&
      point.y >= box.y - padding &&
      point.y <= box.y + box.height + padding
    );

    if (!labelOverlapsAPoint) break;

    labelX += nudgeX;
    labelY += nudgeY;
    labelText.attr("x", labelX).attr("y", labelY);
  }

  const finalBox    = labelText.node().getBBox();
  const pillPadding = { x: 5, y: 3 };

  labelBackground
    .attr("x",      finalBox.x - pillPadding.x)
    .attr("y",      finalBox.y - pillPadding.y)
    .attr("width",  finalBox.width  + pillPadding.x * 2)
    .attr("height", finalBox.height + pillPadding.y * 2);

  labelText.raise();
});


// ── PEAK CALLOUT ──────────────────────────────────────────────────────────────
// Mark the December 2025 peak for "Other Immigration Violator": 19,162 arrests,
// a 17× increase over December 2024 (which had 1,137).

const peakMonthIndex = months.indexOf("2025-12");

if (peakMonthIndex >= 0) {
  const violatorSeries = series.find(s => s.key === "violator");
  const peakCount      = violatorSeries.counts[peakMonthIndex];
  const peakX          = xScale(dates[peakMonthIndex]);
  const peakY          = yScale(peakCount);

  chart.append("circle")
    .attr("cx",   peakX)
    .attr("cy",   peakY)
    .attr("r",    3.5)
    .attr("fill", "#e05a4e");

  chart.append("text")
    .attr("x",           peakX - 6)
    .attr("y",           peakY - 18)
    .attr("text-anchor", "end")
    .attr("fill",        "#e05a4e")
    .attr("font-family", "monospace")
    .attr("font-size",   "9.5px")
    .attr("font-weight", "700")
    .attr("letter-spacing", "0.05em")
    .text("19,162  ↑ 17× vs. Dec 2024");
}
