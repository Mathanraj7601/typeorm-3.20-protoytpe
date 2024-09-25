import { DataSource } from "typeorm";
import { UserEntity } from "../MyProject/src/entity";

export class User {
    private db: DataSource;

    public constructor(connection: DataSource) {
        this.db = connection;
    }

    public async add(user: any) {
        try {
            {
                await this.db
                    .getRepository(UserEntity)
                    .createQueryBuilder()
                    .insert()
                    .into(UserEntity)
                    .values(user)
                    .execute();
                return {
                    status: "Success",
                    message: "User Added Successfully",
                };
            }
        } catch (err) {
            return {
                status: "Failure",
                message: err.message,
            };
        }
    }

    public async edit(user: any) {
        try {
            console.log("user", user);
            const updatedUser =   await this.db
                .getRepository(UserEntity)
                .createQueryBuilder()
                .update(UserEntity)
                .set(user)
                .where("id = :id", { id: 1 })
                .execute();
            
            // Fetch the updated user
            // const updatedUser = await this.db
            //     .getRepository(UserEntity)
            //     .findOne({ where: { id: 1 } }); // Assuming 'id' is the primary key
                return {
                    status: "Success",
                    message: "User Updated Successfully",
                    data:updatedUser
                };
            
        } catch (err) {
            console.log("err111111111111111", err)
            return {
                status: "Failure",
                message: err.message,
            };
        }
    }
}