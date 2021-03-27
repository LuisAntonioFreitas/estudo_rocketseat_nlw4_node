import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm'; 
import { UsersRepository } from '../repositories/UsersRepository';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';

class UserController {
  // CREATE
  async create(request: Request, response: Response) {
    const body = request.body;
    console.log(body);

    const { name, email } = request.body;

    // Validação
    const schema = yup.object().shape({
      name: yup.string().required("Nome é obrigatório"),
      email: yup.string().email("Email não é válido").required("Email é obrigatório")
    });
    try { 
      await schema.validate(request.body, { abortEarly: false });
    } catch (ex) {
      return response.status(400).json({ error: ex });
    }

    const usersRepository = getCustomRepository(UsersRepository);

    // Verifica Existencia
    // SELECT * FROM users WHERE email = 'email' 
    const userAlreadyExists = await usersRepository.findOne({
      email: email
    })
    if (userAlreadyExists) {
      let error_code = 400;
      let error_message = "User already exists!";
      // return response.status(error_code).json({ error: error_message })
      throw new AppError(error_message);
    }

    const user = usersRepository.create({ 
      name: name, 
      email: email 
    });

    await usersRepository.save(user);

    return response.status(201).json(user);
    // return response.status(201).send();
  }
}

export { UserController };