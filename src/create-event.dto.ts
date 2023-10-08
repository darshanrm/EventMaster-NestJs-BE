import { IsDateString, Length } from 'class-validator';

export class CreateEventDto {
  @Length(5, 255, {
    message: 'Length should be between 5 characters to 255 characters',
  })
  name: string;

  @Length(5, 255)
  description: string;

  @IsDateString()
  when: string;

  @Length(5, 255)
  address: string;
}
