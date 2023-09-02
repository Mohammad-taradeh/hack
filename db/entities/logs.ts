import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Logs extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  typeOfRec: string;

  @Column()
  imagePath: string;

  @Column("json")
  result: Record<string, any>;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt: Date;
}
