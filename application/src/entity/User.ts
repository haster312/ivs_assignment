import {
	BaseEntity,
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm";
import * as bcrypt from "bcryptjs";

@Entity({ name: "users" })
class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		length: 100,
	})
	name: string;

	@Column({
		unique: true,
		length: 100,
	})
	email: string;

	@Column({ select: false })
	password: string;

	@CreateDateColumn({
		type: "timestamp",
		default: () => "CURRENT_TIMESTAMP(6)",
	})
	public created_at: Date;
	@UpdateDateColumn({
		type: "timestamp",
		default: () => "CURRENT_TIMESTAMP(6)",
		onUpdate: "CURRENT_TIMESTAMP(6)",
	})
	public updated_at: Date;

	@BeforeInsert()
	@BeforeUpdate()
	private encryptPassword() {
		if (this.password) {
			this.password = bcrypt.hashSync(this.password, 10);
		}
	}

	public validatePassword(password?: string) {
		if (password && this.password) return bcrypt.compareSync(password, this.password);
	}
}

export default User;
