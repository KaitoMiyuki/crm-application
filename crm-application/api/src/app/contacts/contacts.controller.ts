import { Controller, Param, Get, Post, Body } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactEntity } from './contact.entity';
import { Contact } from '@crm-application/shared';

@Controller('contacts')
export class ContactsController {
    constructor(private readonly contactsService: ContactsService) {}

    @Get()
    findAll(): Promise<ContactEntity[]> {
        return this.contactsService.findAll();
    }
    
    @Get(':id')
    findOne(@Param('id') id: number): Promise<ContactEntity> {
        return this.contactsService.findOne(id);
    }

    @Post()
    async create(@Body() contact: Contact): Promise<ContactEntity> {
        return this.contactsService.create(contact);
    }

    @Post(':id')
    async update(@Param('id') id: number, @Body() contact: Contact): Promise<ContactEntity> {
        return this.contactsService.update(id, contact);
    }

    @Post(':id')
    async delete(@Param('id') id: number): Promise<void> {
        return this.contactsService.delete(id);
    }
}
