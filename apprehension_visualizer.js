(function () {
  // ── DATA ──────────────────────────────────────────────────────────────────
  // Monthly ICE arrest counts by criminality type (Oct 2022 – Mar 2026)
  // Source: arrests_filtered_20260501_232322.parquet — 713,464 records
  // Categories are ICE's own field labels in `apprehension_criminality`.
  const DATA = {
    months: [
      "2022-10","2022-11","2022-12",
      "2023-01","2023-02","2023-03","2023-04","2023-05","2023-06",
      "2023-07","2023-08","2023-09","2023-10","2023-11","2023-12",
      "2024-01","2024-02","2024-03","2024-04","2024-05","2024-06",
      "2024-07","2024-08","2024-09","2024-10","2024-11","2024-12",
      "2025-01","2025-02","2025-03","2025-04","2025-05","2025-06",
      "2025-07","2025-08","2025-09","2025-10","2025-11","2025-12",
      "2026-01","2026-02","2026-03"
    ],
    series: [
      {
        key: "convicted",
        label: "CONVICTED CRIMINAL",
        shortLabel: "Convicted Criminal",
        values: [3941,3961,3814,4118,4468,5350,4465,4956,4878,4666,4755,4147,4422,4261,4037,4254,5003,5076,5351,5377,4581,5246,5064,4586,5405,4802,4901,6298,7812,8395,7865,9005,10164,9659,9791,10067,11035,9803,10685,10079,8944,2952],
      },
      {
        key: "pending",
        label: "PENDING CRIMINAL CHARGES",
        shortLabel: "Pending Charges",
        values: [1516,1515,1311,1507,1535,1734,1617,1843,1842,1980,1581,1483,1493,1478,1575,1540,1770,1950,2067,2280,2068,2354,2552,2237,2677,2318,2570,3421,5643,6617,6377,7435,7860,7853,8352,9352,10791,10065,10434,10243,8543,3153],
      },
      {
        key: "violator",
        label: "OTHER IMMIGRATION VIOLATOR",
        shortLabel: "Other Immigration Violator",
        // No criminal charge — only an immigration rule violation
        values: [11316,11042,10213,12492,10253,8738,7319,6948,5945,5086,5552,5050,4264,3268,4320,2802,2925,2727,2898,2696,2012,1977,1672,1655,1543,1150,1137,2629,3955,3888,3669,6244,12470,9854,10207,13758,15811,15275,19162,17769,12538,4263],
      },
    ],
  };

  // Colors: "Other Immigration Violator" is the main story — give it heat.
  const COLORS = {
    convicted: "#6e9ec7",  // steel blue  — steady, institutional
    pending:   "#a0a0a0",  // mid gray    — ambiguous status
    violator:  "#e05a4e",  // warm red    — the surge, the point
  };

  const months = DATA.months;
  const series = DATA.series.map(s => ({ ...s, color: COLORS[s.key] }));

  // ── LAYOUT ────────────────────────────────────────────────────────────────
  const el     = document.getElementById("chart");
  const totalW = Math.min(el.clientWidth || 920, 960);
  const margin = { top: 24, right: 24, bottom: 88, left: 72 };
  const W      = totalW - margin.left - margin.right;
  const H      = Math.round(W * 0.50);

  // ── SCALES ────────────────────────────────────────────────────────────────
  const parseMonth = d3.timeParse("%Y-%m");
  const dates      = months.map(parseMonth);

  const xScale = d3.scaleTime()
    .domain([dates[0], dates[dates.length - 1]])
    .range([0, W]);

  const yMax = d3.max(series, s => d3.max(s.values));
  const yScale = d3.scaleLinear()
    .domain([0, yMax * 1.08])
    .range([H, 0])
    .nice();

  // ── SVG ───────────────────────────────────────────────────────────────────
  const svg = d3.select("#chart")
    .append("svg")
    .attr("width",  totalW)
    .attr("height", H + margin.top + margin.bottom)
    .style("display", "block");

  svg.append("rect")
    .attr("width",  totalW)
    .attr("height", H + margin.top + margin.bottom)
    .attr("fill",   "#0d0d0d");

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // ── HORIZONTAL GRID ───────────────────────────────────────────────────────
  g.append("g")
    .call(
      d3.axisLeft(yScale)
        .tickSize(-W)
        .ticks(5)
        .tickFormat("")
    )
    .call(ax => ax.select(".domain").remove())
    .call(ax => ax.selectAll(".tick line")
      .attr("stroke", "#1a1a1a")
      .attr("stroke-width", 1));

  // ── VERTICAL GRID (one line per month) ───────────────────────────────────
  g.append("g")
    .attr("transform", `translate(0,${H})`)
    .call(
      d3.axisBottom(xScale)
        .ticks(d3.timeMonth.every(1))
        .tickSize(-H)
        .tickFormat("")
    )
    .call(ax => ax.select(".domain").remove())
    .call(ax => ax.selectAll(".tick line")
      .attr("stroke", d => d.getMonth() === 0 ? "#2a2a2a" : "#181818")
      .attr("stroke-width", d => d.getMonth() === 0 ? 1 : 0.5));

  // ── X AXIS ────────────────────────────────────────────────────────────────
  // Show every month; rotate labels -90° so they read upward.
  // January ticks include the year ("Jan '25"); other months show only the
  // abbreviation ("Feb") to keep things uncluttered.
  const monthFmt = d => d.getMonth() === 0
    ? d3.timeFormat("%b '%y")(d)   // "Jan '25"
    : d3.timeFormat("%b")(d);      // "Feb"

  g.append("g")
    .attr("transform", `translate(0,${H})`)
    .call(
      d3.axisBottom(xScale)
        .ticks(d3.timeMonth.every(1))
        .tickFormat(monthFmt)
        .tickSize(4)
    )
    .call(ax => ax.select(".domain").attr("stroke", "#2e2e2e"))
    .call(ax => ax.selectAll(".tick line").attr("stroke", "#2e2e2e"))
    .call(ax => ax.selectAll(".tick text")
      .attr("fill", d => d.getMonth() === 0 ? "#6a6a6a" : "#404040")
      .attr("font-family", "monospace")
      .attr("font-size", "9px")
      .attr("text-anchor", "end")
      .attr("dx", "-0.5em")
      .attr("dy", "0.3em")
      .attr("transform", "rotate(-90)"));

  // ── Y AXIS ────────────────────────────────────────────────────────────────
  g.append("g")
    .call(
      d3.axisLeft(yScale)
        .ticks(5)
        .tickFormat(d => d >= 1000 ? `${d / 1000}k` : d)
        .tickSize(4)
    )
    .call(ax => ax.select(".domain").attr("stroke", "#2e2e2e"))
    .call(ax => ax.selectAll(".tick line").attr("stroke", "#2e2e2e"))
    .call(ax => ax.selectAll(".tick text")
      .attr("fill", "#4a4a4a")
      .attr("font-family", "monospace")
      .attr("font-size", "10px")
      .attr("dx", "-6px"));

  g.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -H / 2)
    .attr("y", -58)
    .attr("text-anchor", "middle")
    .attr("fill", "#383838")
    .attr("font-family", "monospace")
    .attr("font-size", "9px")
    .attr("letter-spacing", "0.09em")
    .text("APPREHENSIONS / MONTH");

  // ── TRUMP INAUGURATION REFERENCE LINE ────────────────────────────────────
  const inaugX = xScale(parseMonth("2025-01"));

  g.append("line")
    .attr("x1", inaugX).attr("x2", inaugX)
    .attr("y1", 0).attr("y2", H)
    .attr("stroke", "#2e2e2e")
    .attr("stroke-width", 1)
    .attr("stroke-dasharray", "4 3");

  // Label above the line
  g.append("text")
    .attr("x", inaugX)
    .attr("y", -8)
    .attr("text-anchor", "middle")
    .attr("fill", "#404040")
    .attr("font-family", "monospace")
    .attr("font-size", "9px")
    .attr("letter-spacing", "0.06em")
    .text("TRUMP INAUGURATION  JAN 20, 2025");

  // ── LINE GENERATOR ────────────────────────────────────────────────────────
  const lineGen = d3.line()
    .x((_, i) => xScale(dates[i]))
    .y(d => yScale(d))
    .curve(d3.curveCatmullRom.alpha(0.5));

  // Draw less-important lines first so the "violator" line renders on top
  const drawOrder = ["convicted", "pending", "violator"];
  drawOrder.forEach(key => {
    const s = series.find(s => s.key === key);
    g.append("path")
      .datum(s.values)
      .attr("fill", "none")
      .attr("stroke", s.color)
      .attr("stroke-width", key === "violator" ? 2.2 : 1.6)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("opacity", key === "violator" ? 1 : 0.7)
      .attr("d", lineGen);
  });

  // ── DIRECTLY LABEL LINES (Voronoi approach) ───────────────────────────────
  //
  // Adapted from H. Stevens, "Directly labelling lines"
  // observablehq.com/@harrystevens/directly-labelling-lines
  //
  // Steps:
  //  1. Flatten all non-zero points across all series into a single array.
  //  2. Build a Voronoi diagram (d3.Delaunay) over those points.
  //  3. Per series: find the point whose Voronoi cell has the largest area —
  //     this is where that series is most spatially isolated from all others.
  //  4. Place the label there, then nudge it incrementally toward the cell
  //     centroid until its bounding box no longer overlaps any data point.

  // 1. Flatten
  const flat = [];
  series.forEach((s, si) => {
    s.values.forEach((v, mi) => {
      if (v > 0) {
        flat.push({ x: xScale(dates[mi]), y: yScale(v), si });
      }
    });
  });

  if (flat.length < 3) return;

  // 2. Voronoi
  const delaunay = d3.Delaunay.from(flat, d => d.x, d => d.y);
  const voronoi  = delaunay.voronoi([0, 0, W, H]);

  // 3 & 4. Label each series
  series.forEach((s, si) => {
    const pts = flat
      .map((d, i) => ({ ...d, fi: i }))
      .filter(d => d.si === si);

    let bestPt   = null;
    let bestArea = -Infinity;
    let bestCell = null;

    pts.forEach(pt => {
      const cell = voronoi.cellPolygon(pt.fi);
      if (!cell) return;
      const area = Math.abs(d3.polygonArea(cell));
      if (area > bestArea) {
        bestArea = area;
        bestPt   = pt;
        bestCell = cell;
      }
    });

    if (!bestPt || !bestCell) return;

    const centroid = d3.polygonCentroid(bestCell);
    let lx = bestPt.x;
    let ly = bestPt.y;
    const ndx = (centroid[0] - lx) / 50;
    const ndy = (centroid[1] - ly) / 50;

    // Background pill
    const pill = g.append("rect")
      .attr("rx", 2)
      .attr("fill", "#0d0d0d")
      .attr("fill-opacity", 0.88);

    const label = g.append("text")
      .attr("x", lx)
      .attr("y", ly)
      .attr("dy", "0.35em")
      .attr("fill", s.color)
      .attr("font-family", "monospace")
      .attr("font-size", si === 2 ? "11.5px" : "10.5px")  // emphasize violator
      .attr("font-weight", "700")
      .attr("letter-spacing", "0.06em")
      .text(s.label);

    // Nudge until bounding box clears all data points
    for (let iter = 0; iter < 50; iter++) {
      const bb  = label.node().getBBox();
      const pad = 4;
      const overlaps = flat.some(
        pt =>
          pt.x >= bb.x - pad && pt.x <= bb.x + bb.width  + pad &&
          pt.y >= bb.y - pad && pt.y <= bb.y + bb.height + pad
      );
      if (!overlaps) break;
      lx += ndx;
      ly += ndy;
      label.attr("x", lx).attr("y", ly);
    }

    // Fit pill to final label position
    const bb2 = label.node().getBBox();
    const px = 5, py = 3;
    pill
      .attr("x",      bb2.x - px)
      .attr("y",      bb2.y - py)
      .attr("width",  bb2.width  + px * 2)
      .attr("height", bb2.height + py * 2);

    label.raise();
  });

  // ── 17× CALLOUT on the "Other Immigration Violator" peak ─────────────────
  // Dec 2025 peak: 19,162
  const peakMi  = months.indexOf("2025-12");
  if (peakMi >= 0) {
    const peakX = xScale(dates[peakMi]);
    const peakY = yScale(DATA.series[2].values[peakMi]);

    g.append("circle")
      .attr("cx", peakX)
      .attr("cy", peakY)
      .attr("r", 3.5)
      .attr("fill", "#e05a4e");

    // Offset annotation to avoid overlapping the label
    const annX = peakX - 6;
    const annY = peakY - 18;

    g.append("text")
      .attr("x", annX)
      .attr("y", annY)
      .attr("text-anchor", "end")
      .attr("fill", "#e05a4e")
      .attr("font-family", "monospace")
      .attr("font-size", "9.5px")
      .attr("font-weight", "700")
      .attr("letter-spacing", "0.05em")
      .text("19,162  ↑ 17× vs. Dec 2024");
  }
})();
