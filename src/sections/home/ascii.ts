const glyphs = ' .:-=+xX#8';
function createPattern(columns: number, rows: number, centerRow: number, horizontalRadius: number, verticalRadius: number) {
  const samples = Array.from({ length: rows * columns }, (_, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);
    const x = (column - columns / 2) / horizontalRadius;
    const y = (row - centerRow) / verticalRadius;
    return {
      radius: Math.hypot(x, y) + Math.sin(x * 3 + y * 2) * .025,
      texture: column * 13 + row * 7,
    };
  });
  return { columns, samples };
}

const desktopPattern = createPattern(220, 54, 48, 51, 20);
const mobilePattern = createPattern(92, 44, 40, 49, 20);

export function renderAsciiArches(time = 0, mobile = false): string {
  const { columns, samples } = mobile ? mobilePattern : desktopPattern;
  return samples.map(({ radius, texture }, index) => {
    const phase = ((radius + .08 - time * .07) % .66 + .66) % .66;
    const distance = Math.abs(phase - .33);
    const density = Math.max(0, 1 - distance / .12);
    const shimmer = .78 + Math.sin(texture + time * 1.8) * .22;
    const glyph = glyphs[Math.floor(density * shimmer * (glyphs.length - 1))];
    return (index + 1) % columns === 0 && index < samples.length - 1 ? `${glyph}\n` : glyph;
  }).join('');
}
