import { BoardDto, CreateBoardDto } from '/@/dtos/board.dto';
import { HttpClient } from '/@/api/http.client';
import { plainToClass } from 'class-transformer';
import { ListDto, CreateListDto } from '/@/dtos/list.dto';
import { CardDto, CreateCardDto } from '/@/dtos/card.dto';

interface IBoardService {
  getBoard: (id: number) => Promise<BoardDto>;
  getBoards: () => Promise<BoardDto[]>;
  getListsByBoardId: (boardId: number) => Promise<ListDto[]>;
  createList: (payload: CreateListDto) => Promise<ListDto>;
  archiveList: (listId: number) => Promise<boolean>;
}

export class BoardService extends HttpClient implements IBoardService {
  private static classInstance?: BoardService;

  private constructor() {
    super(import.meta.env.VITE_API_URL as string);
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new BoardService();
    }

    return this.classInstance;
  }

  public getBoards = async () => {
    const res = (await this.instance.get<BoardDto[]>('/boards')) as any;
    return res.map((b: any) =>
      plainToClass(BoardDto, b, { excludeExtraneousValues: true }),
    );
  };

  public getBoard = async (id: number) => {
    const res = await this.instance.get<BoardDto>(`/boards/${id}`);
    return plainToClass(BoardDto, res, { excludeExtraneousValues: true });
  };

  public getListsByBoardId = async (id: number) => {
    const res = (await this.instance.get<any>(`/lists`, {
      params: { board: id, archived: false },
    })) as any;

    return (res ?? []).map((l: any) =>
      plainToClass(ListDto, l, { excludeExtraneousValues: true }),
    );
  };

  public createBoard = async (boardName: string, userId: number) => {
    const payload = plainToClass(CreateBoardDto, {
      name: boardName,
      user: userId,
    });

    const res = await this.instance.post<BoardDto>(
      `/boards`,
      payload.toObject(),
    );

    return plainToClass(BoardDto, res, { excludeExtraneousValues: true });
  };

  public createList = async (payload: CreateListDto) => {
    const res = await this.instance.post<ListDto>(`/lists`, payload);

    return plainToClass(ListDto, res, { excludeExtraneousValues: true });
  };

  public archiveList = async (id: number) => {
    const res = await this.instance.put<ListDto>(`/lists/${id}`, {
      archived: true,
    });
    return !!res;
  };

  public createCard = async (payload: CreateCardDto) => {
    const res = await this.instance.post<CardDto>(`/cards`, payload);

    return plainToClass(CardDto, res, { excludeExtraneousValues: true });
  };

}
