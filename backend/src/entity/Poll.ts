import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  Index,
  JoinColumn,
} from 'typeorm';
import Vote from './Vote';
import Option from './Option';

@Entity()
export default class Poll {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ fulltext: true })
  @Column({ length: 63 })
  title: string;

  @Index({ fulltext: true })
  @Column({ length: 255 })
  description: string;

  @Column({ default: 0 })
  views: number;

  @CreateDateColumn()
  creationDate: Date;

  @Column()
  closingDate: Date;

  @OneToMany(type => Option, option => option.poll)
  @JoinColumn()
  options: Option[];
}
