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

router.post("/users", userController.create);

router.post("/surveys", surveyController.create);
router.get("/surveys", surveyController.show);

router.post("/sendmailsurveysusers", sendMailSurveyUserController.execute);
router.get("/answers/:value", answerController.execute);
router.get("/nps/:survey_id", npsController.execute)

export { router };
