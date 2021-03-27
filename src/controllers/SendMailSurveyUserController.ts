import { Request, Response } from 'express';
import { getCustomRepository, Repository } from 'typeorm'; 
import { resolve } from 'path';
import { UsersRepository } from '../repositories/UsersRepository';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import SendMailNPSService from '../services/SendMailNPSService';

class SendMailSurveyUserController {
  // EXECUTE
  async execute(request: Request, response: Response) {
    const body = request.body;
    console.log(body);

    const { email, survey_id } = request.body;
    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const userAlreadyExists = await usersRepository.findOne({
      email: email
    });
    if (!userAlreadyExists) {
      return response.status(400).json({ 
        error: "User does not exists!"
      })
    }
    const user = userAlreadyExists;

    const surveyAlreadyExists = await surveysRepository.findOne({
      id: survey_id
    });
    if (!surveyAlreadyExists) {
      return response.status(400).json({ 
        error: "Survey does not exists!"
      })
    }
    const survey = surveyAlreadyExists;

    // OR  | where: [{user_id: user.id}, {survey_id: survey.id}, {value: null}],
    // AND | where: {user_id: user.id, survey_id: survey.id, value: null},
    const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
      where: {user_id: user.id, survey_id: survey.id, value: null},
      relations: ["user", "survey"]
    });
    let tempSurveyUser: any;
    if (!surveyUserAlreadyExists) {

      tempSurveyUser = surveysUsersRepository.create({ 
        user_id: user.id, 
        survey_id: survey.id
      });
      await surveysUsersRepository.save(tempSurveyUser);

    } else {
      tempSurveyUser = surveyUserAlreadyExists;
    }
    const surveyUser = tempSurveyUser;

    try {
      const variables = {
        name: user.name,
        title: survey.title,
        description: survey.description,
        id: surveyUser.id,
        link: process.env.URL_MAIL
      }
      const path = resolve(__dirname, "..", "views", "emails", "npsMail.hbs")

      await SendMailNPSService.execute(
        user.email, 
        survey.title, 
        variables, 
        path
      );
    }
    catch (ex) {
      const findExists = await surveysUsersRepository.find({
        id: surveyUser.id
      });
      if (findExists) {
        await surveysUsersRepository.delete({
          id: surveyUser.id
        });
      }

      console.log(ex);
      return response.status(400).json({ 
        error: "Não foi possível completar a solicitação!",
        name: ex.name,
        message: ex.message,
        code: ex.code,
        command: ex.command
      })
    }

    if (!surveyUserAlreadyExists) {
      return response.status(201).json(surveyUser);
      // return response.status(201).send();
    } else {
      return response.status(200).json(surveyUser);
      // return response.status(200).send();
    }
  }

  // SHOW
  // async show(request: Request, response: Response) {
  //   const itensRepository = getCustomRepository(SurveysRepository);

  //   const all = await itensRepository.find();

  //   return response.status(200).json(all);
  // }
}

export { SendMailSurveyUserController };