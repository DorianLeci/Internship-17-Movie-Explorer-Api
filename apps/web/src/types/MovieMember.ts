import type { CrewRole } from 'enums /CrewRole';

export interface MovieMember {
  id: number;
  firstName: string;
  lastName: string;
}

export interface CastMember {
  actor: MovieMember;
  character: string;
}

export interface CrewMember {
  crewMember: MovieMember;
  role: CrewRole;
}
