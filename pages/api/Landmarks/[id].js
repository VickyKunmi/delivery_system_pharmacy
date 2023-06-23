import getLandmark_location from "@/controller/landmark";



export default function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
    const { landmarkId } = req.query;
    return getLandmark_location(req, res, landmarkId);
  }
  res.status(405).end();
}

