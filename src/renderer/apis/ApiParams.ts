import Request from 'models/request/Request';

type ApiParams<T extends Request> = Omit<T, 'method' | 'authrization'>;

export default ApiParams;
