import { Injectable } from '@nestjs/common';
import { Contact } from '@crm-application/shared';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactEntity } from './contact.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class ContactsService {
    constructor(
        @InjectRepository(ContactEntity)
        private readonly contactRepository: Repository<ContactEntity>
    ) {}

    private contacts: Contact[] = [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
        { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com' }
    ];

    findAll(): Promise<ContactEntity[]> {
        return this.contactRepository.find();
    }

    findOne(id: number): Promise<ContactEntity> {
        return this.contactRepository.findOneBy({ id });
    }

    async create(contact: Contact): Promise<ContactEntity> {
        const newContact = this.contactRepository.create(contact);
        return this.contactRepository.save(newContact);
    }

    async update(id: number, contact: Contact): Promise<ContactEntity> {
        await this.contactRepository.update(id, contact);
        return this.contactRepository.findOneBy({ id });
    }

    async delete(id: number): Promise<void> {
        await this.contactRepository.delete(id);
    }
}
