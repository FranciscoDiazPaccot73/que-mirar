const FilterIcon = ({ height = 24, width = 24, color = '#c9c9c9', hidden = false }) => (
  <svg
    className={`${hidden ? 'hidden' : ''}`}
    fill="none"
    height={height}
    stroke={color}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width={width}
  >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

export default FilterIcon;
