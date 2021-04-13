import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class createAccount1618280341523 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'accounts',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'code',
            type: 'varchar',
          },
          {
            name: 'balance',
            type: 'varchar'
          },
          {
            name: 'user_fk',
            type: 'uuid'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          },
        ]
      }));

      await queryRunner.createForeignKey('accounts', new TableForeignKey({
        name: 'userFk',
        columnNames: ['user_fk'],
        referencedTableName: 'users',
        referencedColumnNames: ['id']
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('accounts', 'userFk');
      await queryRunner.dropTable('accounts');
    }

}
