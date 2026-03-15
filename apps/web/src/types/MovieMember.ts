import type { CrewRole } from 'enums /CrewRole';

export interface MovieMember {
  id: number;
  name: string;
}

export interface CastMember extends MovieMember {
  character: string;
}

export interface CrewMember extends MovieMember {
  role: CrewRole;
}
