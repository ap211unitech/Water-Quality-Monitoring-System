// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from "../../config/connect"
import Location from '../../models/Location'

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;

  switch (method) {
    case 'GET': {
      const allLocations = await Location.find();
      res.status(200).json(allLocations);
      break
    }
    case 'POST': {

      break
    }
    default:
      res.status(400).json({ success: false })
      break
  }
}
