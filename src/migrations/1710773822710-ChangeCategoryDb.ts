import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeCategoryDb1710773822710 implements MigrationInterface {
    name = 'ChangeCategoryDb1710773822710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` ADD \`color_badge\` enum ('default', 'primary', 'secondary', 'error', 'info', 'success', 'warning') NOT NULL DEFAULT 'primary'`);
        await queryRunner.query(`ALTER TABLE \`purchase\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`purchase\` ADD \`status\` enum ('IN_CART', 'PENDING_PAYMENT', 'PENDING_APPROVED', 'APPROVED', 'ERROR') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`purchase\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`purchase\` ADD \`status\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`color_badge\``);
    }

}
