// Win rate of closed deals by close month, 2017.
// Source: capstone analysis of 8,800 CRM opportunities (Maven Analytics dataset).
// "monthOfQuarter" 3 means the last month of a quarter.
const months = [
  { label: "Mar", value: 82, monthOfQuarter: 3 },
  { label: "Apr", value: 49, monthOfQuarter: 1 },
  { label: "May", value: 54, monthOfQuarter: 2 },
  { label: "Jun", value: 83, monthOfQuarter: 3 },
  { label: "Jul", value: 49, monthOfQuarter: 1 },
  { label: "Aug", value: 57, monthOfQuarter: 2 },
  { label: "Sep", value: 79, monthOfQuarter: 3 },
  { label: "Oct", value: 49, monthOfQuarter: 1 },
  { label: "Nov", value: 53, monthOfQuarter: 2 },
  { label: "Dec", value: 78, monthOfQuarter: 3 },
];

// Win rate as reported to management, by full quarter.
// Q1 holds March only: no deal in the data closes before 1 March 2017.
const quarters = [
  { label: "Q1", from: 0, to: 0, reported: 82.1 },
  { label: "Q2", from: 1, to: 3, reported: 61.7 },
  { label: "Q3", from: 4, to: 6, reported: 61.4 },
  { label: "Q4", from: 7, to: 9, reported: 60.3 },
];

function svgEl(name, attrs, text) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", name);
  for (const key in attrs) el.setAttribute(key, attrs[key]);
  if (text !== undefined) el.textContent = text;
  return el;
}

function drawWinRateChart(svg) {
  const W = 560;
  const H = 420;
  const m = { top: 56, right: 8, bottom: 84, left: 58 };
  const plotW = W - m.left - m.right;
  const plotH = H - m.top - m.bottom;
  const slot = plotW / months.length;
  const barW = slot * 0.68;
  const y = (v) => m.top + plotH * (1 - v / 100);
  const x = (i) => m.left + slot * i;

  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);

  // Horizontal gridlines
  [0, 50, 100].forEach((v) => {
    svg.appendChild(
      svgEl("line", { class: "grid-line", x1: m.left, x2: W - m.right, y1: y(v), y2: y(v) })
    );
    svg.appendChild(
      svgEl("text", { class: "chart-text", x: m.left - 8, y: y(v) + 5, "text-anchor": "end" }, v + "%")
    );
  });

  // Bars (value labels are added last so the dashed lines never cut through them)
  const valueLabels = [];
  months.forEach((d, i) => {
    const high = d.monthOfQuarter === 3;
    const bx = x(i) + (slot - barW) / 2;
    svg.appendChild(
      svgEl("rect", {
        class: "bar " + (high ? "bar-high" : "bar-low"),
        x: bx,
        y: y(d.value),
        width: barW,
        height: y(0) - y(d.value),
        rx: 2,
        style: `animation-delay:${i * 60}ms`,
      })
    );
    valueLabels.push(
      svgEl("text", { class: "chart-value", x: bx + barW / 2, y: y(d.value) - 7 }, d.value)
    );
    svg.appendChild(
      svgEl("text", { class: "chart-text", x: bx + barW / 2, y: y(0) + 20, "text-anchor": "middle" }, d.label)
    );
  });

  // Quarter as reported: dashed line across the quarter plus the figure underneath
  quarters.forEach((q) => {
    const x1 = x(q.from) + 3;
    const x2 = x(q.to + 1) - 3;
    svg.appendChild(
      svgEl("line", { class: "ref-line", x1, x2, y1: y(q.reported), y2: y(q.reported) })
    );
    const cx = (x1 + x2) / 2;
    svg.appendChild(
      svgEl("text", { class: "chart-text", x: cx, y: y(0) + 46, "text-anchor": "middle" }, q.label)
    );
    svg.appendChild(
      svgEl(
        "text",
        { class: "chart-value", x: cx, y: y(0) + 66 },
        q.reported.toFixed(1) + "%"
      )
    );
  });

  valueLabels.forEach((el) => svg.appendChild(el));

  // Direct annotations
  svg.appendChild(
    svgEl("text", { class: "chart-note accent", x: m.left, y: 18 }, "Last month of each quarter: 78 to 83%")
  );
  svg.appendChild(
    svgEl("text", { class: "chart-note quiet", x: m.left, y: 40 }, "Every other month: 49 to 57%")
  );
}

const chart = document.getElementById("winrate-chart");
if (chart) drawWinRateChart(chart);

// Open the project that a link points to (for example #project-3)
function openFromHash() {
  const id = decodeURIComponent(location.hash.slice(1));
  const target = id ? document.getElementById(id) : null;
  if (target && target.tagName === "DETAILS") target.open = true;
}
window.addEventListener("hashchange", openFromHash);
openFromHash();
