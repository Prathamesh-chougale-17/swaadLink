import { Request, Response } from 'express';
import Chef from '../models/Chef';

export const getAllChefs = async (req: Request, res: Response) => {
  try {
    const chefs = await Chef.find();
    res.json(chefs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chefs', error });
  }
};

export const getChefById = async (req: Request, res: Response) => {
  try {
    const chef = await Chef.findById(req.params.id);
    if (!chef) {
      return res.status(404).json({ message: 'Chef not found' });
    }
    res.json(chef);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chef', error });
  }
};

export const createChef = async (req: Request, res: Response) => {
  try {
    const newChef = new Chef(req.body);
    const savedChef = await newChef.save();
    res.status(201).json(savedChef);
  } catch (error) {
    res.status(400).json({ message: 'Error creating chef', error });
  }
};

export const updateChef = async (req: Request, res: Response) => {
  try {
    const updatedChef = await Chef.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedChef) {
      return res.status(404).json({ message: 'Chef not found' });
    }
    res.json(updatedChef);
  } catch (error) {
    res.status(400).json({ message: 'Error updating chef', error });
  }
};

export const deleteChef = async (req: Request, res: Response) => {
  try {
    const deletedChef = await Chef.findByIdAndDelete(req.params.id);
    if (!deletedChef) {
      return res.status(404).json({ message: 'Chef not found' });
    }
    res.json({ message: 'Chef deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting chef', error });
  }
};

export const searchChefs = async (req: Request, res: Response) => {
  try {
    const { lat, lng, radius, categories, minPrice, maxPrice, canTakePartyOrders } = req.query;

    const query: any = {};

    if (lat && lng && radius) {
      query.location = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng as string), parseFloat(lat as string)]
          },
          $maxDistance: parseFloat(radius as string) * 1000 // Convert km to meters
        }
      };
    }

    if (categories) {
      query.categories = { $in: (categories as string).split(',') };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice as string);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice as string);
    }

    if (canTakePartyOrders) {
      query.canTakePartyOrders = canTakePartyOrders === 'true';
    }

    const chefs = await Chef.find(query);
    res.json(chefs);
  } catch (error) {
    res.status(500).json({ message: 'Error searching chefs', error });
  }
};