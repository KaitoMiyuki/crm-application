import { Contact } from "@crm-application/shared";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ContactEntity implements Contact {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;
}