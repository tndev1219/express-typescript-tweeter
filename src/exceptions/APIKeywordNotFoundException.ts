import HttpException from './HttpException';

class APIKeywordNotFoundException extends HttpException {
  constructor() {
    super(400, 'Keyword not found');
  }
}

export default APIKeywordNotFoundException;
