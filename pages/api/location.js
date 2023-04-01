import dbConnect from "../../config/connect";
import Location from '../../models/Location';
import { createResponse } from "@/utils/response";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;

  switch (method) {
    case 'GET': {
      try {
        const allLocations = await Location.find().sort("-createdAt");
        res.status(200).json(createResponse(allLocations, 200, true));
      }
      catch (error) {
        res.status(400).json(createResponse(error.message, 400, false));
      }
      break
    }
    case 'POST': {
      const { locationText } = req.body;
      try {
        const newLocation = new Location({ name: locationText });
        await newLocation.save();
        res.status(201).json(createResponse(newLocation, 201, true));
      }
      catch (error) {
        res.status(400).json(createResponse(error.message, 400, false));
      }
      break
    }
    default:
      res.status(400).json({ success: false })
      break
  }
}
