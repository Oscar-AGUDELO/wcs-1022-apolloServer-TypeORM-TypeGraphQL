import datasource from "../services/utils";
import { Skill } from "../entities/Skill";
import { MessageToClient } from "../services/genericsInterfaces";
// import { Messages } from "../services/messagesStrings";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
  @Resolver()
  export class SkillsResolver {
    @Mutation(() => Skill)
    async createSkill(
      @Arg("name") name: string,
      @Arg("logo") logo: string
    ): Promise<Skill | MessageToClient> {
      const exitingSkill = await datasource.getRepository(Skill).findOne({
        where: {
          name,
        },
      });
      if (exitingSkill !== null) {
        // const error = { message: Messages.skillExists };
        return exitingSkill;
      } else {
        const newSkill = await datasource.getRepository(Skill).save({
          name,
          logo,
        });
        return newSkill;
      }
    }

    @Query(() => [Skill])
    async findAllSkills(): Promise<Skill[]> {
      return await datasource
        .getRepository(Skill)
        .find({ relations: ["upvotes", "upvotes.skill"] });
    }
  }