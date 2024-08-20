/* eslint-disable @typescript-eslint/no-explicit-any */
export const CustomContentTreemap = ({
  root,
  depth,
  x,
  y,
  width,
  height,
  index,
  colors,
  name,
  size,
}: any) => {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill:
            depth < 2
              ? colors[Math.floor((index / root.children.length) * 6)]
              : "#ffffff00",
          stroke: "#fff",
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
      {depth === 2 ? (
        <text
          x={x + width / 2}
          y={y + height / 2 + 7}
          textAnchor="middle"
          fill="#fff"
          fontSize={15}
        >
          {`${name} - $${(size as number).toFixed(2)}`}
        </text>
      ) : null}
      {depth === 1 ? (
        <text x={x + 8} y={y + 18} fill="#fff" fontSize={12} fillOpacity={0.9}>
          {name}
        </text>
      ) : null}
    </g>
  );
};
