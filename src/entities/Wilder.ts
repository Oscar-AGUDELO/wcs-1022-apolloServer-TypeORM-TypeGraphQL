import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Upvote } from "./Upvote";
import { ObjectType, Field, ID } from "type-graphql";

@Entity()
@ObjectType()
export class Wilder {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field()
  city: string;

  @Column({ nullable: true })
  @Field()
  photoURL: string;

  @OneToMany(() => Upvote, "wilder")
  @Field(() => [Upvote], { nullable: true })
  upvotes: Upvote[];
}