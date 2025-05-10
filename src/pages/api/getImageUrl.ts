import { getImageUrl } from "../../lib/imageUtils";

export default function handler(req: Request) {
  const url = new URL(req.url);
  const path = url.searchParams.get("path");

  if (!path) {
    return new Response("Path parameter is required", { status: 400 });
  }

  const imageUrl = getImageUrl(path);

  // Redirect to the actual image URL
  return new Response(null, {
    status: 302,
    headers: {
      Location: imageUrl,
      "Cache-Control": "public, max-age=86400",
    },
  });
}
