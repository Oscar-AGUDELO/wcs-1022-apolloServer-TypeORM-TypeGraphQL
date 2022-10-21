import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Skill } from "./Skill";
import { Wilder } from "./Wilder";
import { ObjectType, Field, ID } from "type-graphql";


@Entity()
@ObjectType()
export class Upvote {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({ default: 0 })
  @Field()
  count: number;

  @ManyToOne(() => Skill, "upvotes")
  @Field(() => Skill, { nullable: true })
  skill: Skill;

  @ManyToOne(() => Wilder, "upvotes")
  @Field(() => Wilder, { nullable: true })
  wilder: Wilder;
}
