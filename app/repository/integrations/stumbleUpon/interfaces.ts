export interface StumbleUponPostResult {
  _success: boolean;
  _error?: any;
  _reason: StumbleUponErrorReason[];
  discovery: any;
  nextPage: string;
}

export interface StumbleUponErrorReason {
  message: string;
  code: number;
  struct: string;
  type: string;
  meta: any[];
}
