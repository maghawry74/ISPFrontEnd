export interface IGovernarate {
  code: number;
  name: string;
  status?: boolean;
}
export interface IGovernarateCentralsAndBranches {
  branches: IGovernarateBranch[];
  centrals: IGovernarateCentral[];
}

export interface IGovernarateBranch {
  name: string;
  id: Number;
}
export interface IGovernarateCentral {
  name: string;
  id: number;
}
