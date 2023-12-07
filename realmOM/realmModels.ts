import Realm, {ObjectSchema} from 'realm';

// Define your object model
export class UserModel extends Realm.Object<UserModel> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  showDealer: boolean = true;
  showTotalLeader: boolean = true;
  showRoundLeader: boolean = true;
  games!: Realm.List<GameModel>;
  players!: Realm.List<PlayerModel>;

  static schema: ObjectSchema = {
    name: 'UserModel',
    properties: {
      _id: 'objectId',
      name: 'string',
      showDealer: 'bool',
      showTotalLeader: 'bool',
      showRoundLeader: 'bool',
      games: 'GameModel[]',
      players: 'PlayerModel[]',
    },
    primaryKey: '_id',
  };
}

export class GameModel extends Realm.Object<GameModel> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  players: PlayerModel[] = [];
  maxRounds?: number;
  gameData: RoundDataModel[] = [];
  gameStatus: 'inProgress' | 'finished' = 'inProgress';

  static schema: ObjectSchema = {
    name: 'GameModel',
    properties: {
      _id: 'objectId',
      name: 'string',
      players: 'PlayerModel[]',
      maxRounds: 'int',
      gameData: 'RoundDataModel[]',
      gameStatus: 'string',
    },
    primaryKey: '_id',
  };
}

export class PlayerModel extends Realm.Object<PlayerModel> {
  _id!: Realm.BSON.ObjectId;
  name!: string;

  static schema: ObjectSchema = {
    name: 'PlayerModel',
    properties: {
      _id: 'objectId',
      name: 'string',
      color: 'string',
    },
    primaryKey: '_id',
  };
}

export class RoundDataModel extends Realm.Object<RoundDataModel> {
  _id!: Realm.BSON.ObjectId;
  round!: number;
  dealer!: PlayerModel;
  players: PlayerModel[] = [];
  scores: number[] = [];

  static schema: ObjectSchema = {
    name: 'RoundDataModel',
    properties: {
      _id: 'objectId',
      roundNo: 'int',
      dealer: 'PlayerModel',
      players: 'PlayerModel[]',
      scores: 'int[]',
    },
    primaryKey: '_id',
  };
}
