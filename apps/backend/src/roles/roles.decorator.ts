import { SetMetadata } from '@nestjs/common';
import { key } from './key';

export const Roles = (...roles: string[]) => SetMetadata(key, roles);
