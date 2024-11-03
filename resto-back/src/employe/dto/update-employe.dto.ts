
import {  Salary } from './create-employe.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

export class UpdateEmployeDto  {
    updateUserDto?:Omit<UpdateUserDto,'roleId'>&{roleId:number}
    salary?: Salary;

}
