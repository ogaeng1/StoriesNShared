export interface User {
  id: string;
  nickname: string;
  bio: string;
  profileImg: string;
}

export interface ResultProps {
  searchResult: User[];
  keyword: string;
  loading: boolean;
}
