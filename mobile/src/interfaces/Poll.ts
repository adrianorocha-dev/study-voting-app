import Option from './Option';

export default interface Poll {
  id: number;
  title: string;
  description: string;
  views: number;
  creationDate: string;
  closingDate: string;
  options: Option[];
  votes?: number;
}
