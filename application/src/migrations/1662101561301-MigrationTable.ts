import { MigrationInterface, QueryRunner } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";

export class MigrationTable1662101561301 implements MigrationInterface {
	name = "MigrationTable1662101561301";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(300) NOT NULL, \`password\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		const user = await UserRepository.create({
			name: "Admin",
			email: "admin@ivs.com",
			password: "abcd1234",
		});
		await UserRepository.save(user);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
		await queryRunner.query(`DROP TABLE \`users\``);
	}
}
