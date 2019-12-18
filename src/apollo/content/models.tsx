export type ContentType = 'about' | 'tech';

export interface ContentState {
  active: boolean;
  type: ContentType;
  __typename: string;
}
