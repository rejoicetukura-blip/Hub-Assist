import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('webauthn_credentials')
export class WebAuthnCredential {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  userId!: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column()
  credentialId!: string;

  @Column('text')
  publicKey!: string;

  @Column({ type: 'bigint' })
  counter!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
