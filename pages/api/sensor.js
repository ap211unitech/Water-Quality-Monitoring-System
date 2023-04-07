import dbConnect from "../../config/connect";
import Sensor from '../../models/Sensor';
import Location from '../../models/Location';
import { createResponse } from "@/utils/response";
import shortid from "shortid";

export default async function handler(req, res) {
    await dbConnect();
    const { method } = req;

    switch (method) {
        case 'GET': {
            try {
                const sensors = await Sensor.find().populate({ path: 'location', model: Location });
                const modifiedResponse = {};
                sensors.forEach(sensor => {
                    if (modifiedResponse[sensor.location._id]?.sensors?.length > 0) {
                        modifiedResponse[sensor.location._id].sensors.push(
                            {
                                _id: sensor._id,
                                sensorId: sensor.sensorId,
                                name: sensor.name,
                                type: sensor.type,
                                createdAt: sensor.createdAt,
                                updatedAt: sensor.updatedAt
                            }
                        )
                    }
                    else {
                        modifiedResponse[sensor.location._id] = {
                            _id: sensor.location._id,
                            name: sensor.location.name,
                            createdAt: sensor.location.createdAt,
                            updatedAt: sensor.location.updatedAt,
                            sensors: [
                                {
                                    _id: sensor._id,
                                    sensorId: sensor.sensorId,
                                    name: sensor.name,
                                    type: sensor.type,
                                    createdAt: sensor.createdAt,
                                    updatedAt: sensor.updatedAt
                                }
                            ]
                        };
                    }

                })
                res.status(200).json(createResponse(Object.values(modifiedResponse), 200, true));
            }
            catch (error) {
                res.status(400).json(createResponse(error.message, 400, false));
            }
            break
        }
        case 'POST': {
            const { location, sensorName, type } = req.body;
            try {
                // Check if location exists
                const findLocation = await Location.findOne({ _id: location });
                if (!findLocation) {
                    return res.status(400).json(createResponse('No such Location exists', 400, false));
                }

                const sensorsOnLocation = await Sensor.find({ location });
                // Check whether total sensors available on that location is less than 3
                if (sensorsOnLocation.length >= 3) {
                    return res.status(400).json(createResponse('Maximum 3 sensors are allowed on one location', 400, false));
                }

                // Check that same type of sensor is not available already
                const sensorTypes = sensorsOnLocation.map(sensor => sensor.type);

                if (sensorTypes.includes(type.toLowerCase())) {
                    return res.status(400).json(createResponse('All sensors on a particular location must be of different type', 400, false));
                }

                // Create new sensor
                const newSensor = new Sensor({
                    location,
                    name: sensorName,
                    sensorId: shortid.generate(),
                    type
                });

                await newSensor.save();
                const response = { ...newSensor._doc, location: findLocation }
                return res.status(201).json(createResponse(response, 201, true));
            }
            catch (error) {
                if (error.kind === 'ObjectId') {
                    return res.status(400).json(createResponse('No such Location exists', 400, false));
                }
                res.status(400).json(createResponse(error.message, 400, false));
            }
            break
        }
        case 'DELETE': {
            const { sensorId } = req.body;
            try {
                await Sensor.deleteOne({ _id: sensorId });
                res.status(200).json(createResponse('Sensor deleted', 200, true));
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
