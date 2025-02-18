import { SessionDto } from './session.dto';

export class OrderDto {
  email: string;
  phone: string;
  tickets: SessionDto[];
}
