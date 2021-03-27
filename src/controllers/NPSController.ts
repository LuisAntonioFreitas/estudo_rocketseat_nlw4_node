import { Request, Response } from 'express';
import { getCustomRepository, Not, IsNull } from 'typeorm'; 
import { AppError } from '../errors/AppError';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

// NPS
/* 
Notas: 0 1 2 3 4 5 6 7 8 9 10

Detratores => 0 ao 6
Passivos   => 7 e 8
Promotores => 9 e 10

Formula: 
((Qtd.Promotores - Qtd.Detratores) / 
 (Qtd.Promotores + Qtd.Passivos + Qtd.Detratores)) * 100
*/

class NPSController {
  // EXECUTE
  async execute(request: Request, response: Response) {
    const body = request.body;
    console.log(body);
    const params = request.params;
    console.log(params);
    const query = request.query;
    console.log(query);

    const { survey_id } = request.params;
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    // Verifica Existencia
    const surveysUsersAlreadyExists = await surveysUsersRepository.find({
      survey_id: survey_id,
      value: Not(IsNull())
    })
    if (!surveysUsersAlreadyExists || surveysUsersAlreadyExists.length === 0) {
      let error_code = 400;
      let error_message = "NPS not already exists!";
      // return response.status(error_code).json({ error: error_message })
      throw new AppError(error_message);
    }
    const surveysUsers = surveysUsersAlreadyExists;

    const detractor = surveysUsers.filter(
      (survey) => survey.value >= 0 && survey.value <= 6
    ).length;

    const promoters = surveysUsers.filter(
      (survey) => survey.value >= 9 && survey.value <= 10
    ).length;

    const passive = surveysUsers.filter(
      (survey) => survey.value >= 7 && survey.value <= 8
    ).length;

    const totalAnswers = surveysUsers.length;

    const calculate = Number((((promoters - detractor) / totalAnswers) * 100).toFixed(2));

    return response.status(200).json({
      detractor,
      promoters,
      passive,
      totalAnswers,
      nps: calculate
    });
    // return response.status(200).send();
  }
}

export { NPSController };