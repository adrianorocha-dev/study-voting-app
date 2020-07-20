import Poll from './Poll';
import Vote from './Vote';

export default interface Option {
  id: number;
  name: string;
  poll: Poll;
  votes: Vote[];
}
