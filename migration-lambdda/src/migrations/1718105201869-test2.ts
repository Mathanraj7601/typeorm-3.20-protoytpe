import { MigrationInterface, QueryRunner } from "typeorm";

export class Test21718105201869 implements MigrationInterface {
    name = 'Test21718105201869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`naveen\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`naveen\``);
    }

}
