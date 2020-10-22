import { Request, Response, NextFunction, Router } from 'express';
import * as Twit from 'twit';
import APIKeywordNotFoundException from '../exceptions/APIKeywordNotFoundException';
import APIRequestException from '../exceptions/APIRequestException';
import UserNotFoundException from '../exceptions/UserNotFoundException';
import Controller from '../interfaces/controller.interface';

class APIConstroller implements Controller {
  public path = '/';
  public router = Router();
  public T = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  });

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}search`, this.getTweets);
    this.router.get(`${this.path}users/:user_id`, this.getUserById);
  }

  private getTweets = async (request: Request, response: Response, next: NextFunction) => {
    const keyword = request.query.q;

    if (keyword) {
      try {
        const res = await this.T.get('search/tweets', { q: `${keyword}`, include_entities: true, count: 100 });
        if (res) {
          response.send(res.data);
        } else {
          next(new APIRequestException());
        }
      } catch (err) {
        next(new APIRequestException());
      }
    } else {
      next(new APIKeywordNotFoundException());
    }
  }

  private getUserById = async (request: Request, response: Response, next: NextFunction) => {
    const user_id = request.params.user_id;

    if (user_id) {
      try {
        const res = await this.T.get('users/show', { user_id: parseInt(user_id, 10) });
        if (res) {
          response.send(res.data);
        } else {
          next(new UserNotFoundException(user_id));
        }
      } catch (err) {
        next(new UserNotFoundException(user_id));
      }
    } else {
      next(new APIKeywordNotFoundException());
    }
  }
}

export default APIConstroller;
