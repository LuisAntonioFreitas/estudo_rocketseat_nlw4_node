import { Request, Response } from 'express';
import { getCustomRepository, Timestamp } from 'typeorm'; 
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

class AnswerController {
  // EXECUTE
  async execute(request: Request, response: Response) {
    const body = request.body;
    console.log(body);
    const params = request.params;
    console.log(params);
    const query = request.query;
    console.log(query);

    const { value } = request.params;
    const { id } = request.query;
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    // Verifica Existencia
    const surveysUsersAlreadyExists = await surveysUsersRepository.findOne({
      id: String(id)
    })
    if (!surveysUsersAlreadyExists) {
      return response.status(400).json({ 
        error: "Answer already exists!"
      })
    }
    const surveyUser = surveysUsersAlreadyExists;

    surveyUser.value = Number(value);
    surveyUser.updated_at = new Date();

    await surveysUsersRepository.save(surveyUser);

    return response.status(200).json(surveyUser);
    // return response.status(200).send();
  }
}

export { AnswerController };