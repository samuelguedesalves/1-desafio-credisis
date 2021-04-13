import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class createOperation1618282559407 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'operations',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isGenerated: true,
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'account_fk',
            type: 'uuid',
          },
          {
            name: 'destination_account_fk',
            type: 'uuid',
          },
          {
            name: 'debit',
            type: 'int',
          },
          {
            name: 'credit',
            type: 'int',
          },
          {
            name: 'launch_type',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'system',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
          },
        ]
      }));

      await queryRunner.createForeignKey('operations', new TableForeignKey({
        name: 'accountFk',
        columnNames: ['account_fk'],
        referencedTableName: 'accounts',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }));

      await queryRunner.createForeignKey('operations', new TableForeignKey({
        name: 'destinationAccountFk',
        columnNames: ['destination_account_fk'],
        referencedTableName: 'accounts',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }));


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('operations', 'destinationAccountFk');
      await queryRunner.dropForeignKey('operations', 'accountFk');

      await queryRunner.dropTable('operations');
    }

}
