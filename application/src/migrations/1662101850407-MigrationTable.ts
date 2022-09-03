import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationTable1662101850407 implements MigrationInterface {
	name = "MigrationTable1662101850407";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE \`event_signup\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(300) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_ff2f238501a201130911f4fdaf\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP INDEX \`IDX_ff2f238501a201130911f4fdaf\` ON \`event_signup\``);
		await queryRunner.query(`DROP TABLE \`event_signup\``);
	}
}
