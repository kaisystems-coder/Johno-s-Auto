// next/image custom loader. Unsplash URLs get CDN-side resizing + format
// negotiation; local brand files are served as-is (the width param is inert,
// it only satisfies next/image's "loader must use width" check).
export default function imageLoader({ src, width, quality }) {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality || 70));
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "crop");
    return url.toString();
  }
  return `${src}?w=${width}`;
}
