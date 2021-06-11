import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { TournamentDto } from './dto/tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { Tournament } from './entities/tournament.entity';

@Injectable()
export class TournamentsService {
  constructor(
    @InjectModel(Tournament)
    private repository: typeof Tournament,
  ) {}

  async create(tournament: CreateTournamentDto): Promise<TournamentDto> {
    return await this.repository.create({ ...tournament });
  }

  async findAll(): Promise<TournamentDto[]> {
    return await this.repository.findAll();
  }

  async findOne(slug: string): Promise<TournamentDto> {
    return await this.repository.findOne({ where: { slug } });
  }

  async update(slug: string, tournament: UpdateTournamentDto): Promise<number> {
    return await this.repository
      .update({ ...tournament }, { where: { slug } })
      .then((result) => result[0]);
  }
}
