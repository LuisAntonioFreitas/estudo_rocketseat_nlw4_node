import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm'; 
import { SurveysRepository } from '../repositories/SurveysRepository';

class SurveyController {
  // CREATE
  async create(request: Request, response: Response) {
    const body = request.body;
    console.log(body);

    const { title, description } = request.body;
    const itensRepository = getCustomRepository(SurveysRepository);

    // Verifica Existencia
    // SELECT * FROM surveys WHERE title = 'title' 
    const itemAlreadyExists = await itensRepository.findOne({
      title: title
    })
    if (itemAlreadyExists) {
      return response.status(400).json({ 
        error: "Survey already exists!"
      })
    }

    const item = itensRepository.create({ 
      title: title, 
      description: description 
    });

    await itensRepository.save(item);

    return response.status(201).json(item);
    // return response.status(201).send();
  }

  // SHOW
  async show(request: Request, response: Response) {
    const itensRepository = getCustomRepository(SurveysRepository);

    const all = await itensRepository.find();

    return response.status(200).json(all);
  }
}

export { SurveyController };