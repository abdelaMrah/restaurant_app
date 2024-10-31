import { PartialType } from '@nestjs/mapped-types';
import { CreateAbsenceDto } from './create-absence.dto';

export class UpdateAbdcenceDto extends PartialType(CreateAbsenceDto) {}
