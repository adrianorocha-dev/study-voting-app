import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import Poll from './Poll';
import Vote from './Vote';

@Entity()
export default class Option {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @ManyToOne(type => Poll, poll => poll.options)
  poll: Poll;

  @OneToMany(type => Vote, vote => vote.option)
  @JoinColumn()
  votes: Vote[];
}
