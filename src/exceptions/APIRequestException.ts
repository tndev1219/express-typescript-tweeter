import HttpException from './HttpException';

class APIRequestException extends HttpException {
  constructor() {
    super(404, 'Content not found');
  }
}

export default APIRequestException;
