import Option from './Option';

export default interface Vote {
  id: number;
  option: Option;
  timestamp: Date;
}
