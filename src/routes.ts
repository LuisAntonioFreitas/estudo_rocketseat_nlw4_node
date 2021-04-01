import { Router } from 'express';

import { UserController } from "./controllers/UserController";
import { SurveyController } from "./controllers/SurveyController";
import { SendMailSurveyUserController } from "./controllers/SendMailSurveyUserController";
import { AnswerController } from './controllers/AnswerController';
import { NPSController } from './controllers/NPSController';

const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();

const sendMailSurveyUserController = new SendMailSurveyUserController();
const answerController = new AnswerController();
const npsController = new NPSController();

process.env.PATH = String('api').trim().toLowerCase();
process.env.VERSION = String('v1').trim().toLowerCase();
const caminho = String("/" + process.env.PATH + "/" + process.env.VERSION)?.trim().toLowerCase();

router.post(caminho + "/users", userController.create);

router.post(caminho + "/surveys", surveyController.create);
router.get(caminho + "/surveys", surveyController.show);

router.post(caminho + "/sendmailsurveysusers", sendMailSurveyUserController.execute);
router.get(caminho + "/answers/:value", answerController.execute);
router.get(caminho + "/nps/:survey_id", npsController.execute)

export { router, caminho };
