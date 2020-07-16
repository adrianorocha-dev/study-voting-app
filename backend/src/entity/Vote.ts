import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import Poll from './Poll';
import Option from './Option';

@Entity()
export default class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Option, option => option.votes)
  option: Option;

  @CreateDateColumn()
  timestamp: Date;
}
