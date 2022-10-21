import datasource from "../services/utils";
import { Wilder } from "../entities/Wilder";
import { MessageToClient } from "../services/genericsInterfaces";
// import { Messages } from "../services/messagesStrings";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
  @Resolver()
  export class WildersResolver {
    @Mutation(() => Wilder)
    async createWilder(
      @Arg("name") name: string,
      @Arg("city") city: string,
      @Arg("photoURL") photoURL: string
    ): Promise<Wilder> {
      const exitingWilder = await datasource.getRepository(Wilder).findOne({
        where: {
          name,
        },
        relations: ["upvotes", "upvotes.skill"],
      });
      if (exitingWilder !== null) {
        // const error = { message: Messages.userExists };
        return exitingWilder;
      } else {
        const newWilder = await datasource.getRepository(Wilder).save({
          name,
          city,
          photoURL,
        });
        return newWilder;
      }
    }

    @Query(() => [Wilder])
    async findAllWilders(): Promise<Wilder[]> {
      return await datasource
        .getRepository(Wilder)
        .find({ relations: ["upvotes", "upvotes.skill"] });
    }

    @Query(() => Wilder, { nullable: true })
    async findWilder(@Arg("wilderId") wilderId: number): Promise<Wilder> {
      return await datasource.getRepository(Wilder).findOne({
        where: {
          id: wilderId,
        },
        relations: ["upvotes", "upvotes.skill"],
      });
    }

    @Mutation(() => Wilder)
    async updateWilder(
      @Arg("wilderId") wilderId: number,
      @Arg("name") name: string,
      @Arg("city") city: string,
      @Arg("photoURL") photoURL: string
    ): Promise<Wilder | MessageToClient> {
      const repository = datasource.getRepository(Wilder);

      // option A 32.0ms

      await repository.query(
        "UPDATE wilder SET name=?, city=?, photoURL=? WHERE id=?",
        [name, city, photoURL, wilderId]
      );
      const updatedWilder = await repository.findOne({
        where: {
          id: wilderId,
        },
      });
      return updatedWilder;

      // option B 46.0ms

      // const wilder = await repository.findOne({
      //   where: { id: wilderId },
      // });
      // if (wilder !== null) {
      //   wilder.name = name;
      //   wilder.city = city;
      //   wilder.photoURL = photoURL;
      //   const updatedWilder = await repository.save(wilder, { reload: true });
      //   return updatedWilder;
      // }
    }

    @Mutation(() => Wilder)
    async deleteWilder(@Arg("wilderId") wilderId: number): Promise<Wilder> {
      const repository = datasource.getRepository(Wilder);
      const wilderToDelete = await repository.findOne({
        where: {
          id: wilderId,
        },
      });
      if (wilderToDelete !== null) {
        await repository.delete({
          id: wilderId,
        });
        // const succes = { message: Messages.userDeletedSucces };
        return wilderToDelete;
      }
      // const error = { message: Messages.userNotFound };
      return wilderToDelete;
    }
  }
