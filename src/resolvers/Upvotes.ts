import datasource from "../services/utils";
import { Upvote } from "../entities/Upvote";
import { MessageToClient } from "../services/genericsInterfaces";
// import { Messages } from "../services/messagesStrings";
import { Arg, Mutation, Resolver } from "type-graphql";
  @Resolver()
  export class UpvotesResolver {
    @Mutation(() => Upvote)
    async createUpvote(
      @Arg("skillId") skillId: number,
      @Arg("wilderId") wilderId: number,
      @Arg("count") count: number
    ): Promise<Upvote | MessageToClient> {
      const repository = datasource.getRepository(Upvote);
      const exitingUpvote = await repository.findOne({
        where: {
          skill: { id: skillId },
          wilder: { id: wilderId },
        },
      });
      if (exitingUpvote !== null) {
        exitingUpvote.count = count;
        return await repository.save(exitingUpvote);
        // const succes = { message: Messages.userUpvoteModifiedSucces };
        // return succes;
      } else {
        return await repository.save({
          wilder: { id: wilderId },
          skill: { id: skillId },
          count,
        });
        // const succes = { message: Messages.userUpvoteCreatedSucces };
        // return succes;
      }
    }
  }