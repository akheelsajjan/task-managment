export interface User{
  userName:string;
  password:string
}

export interface ErrorResponse {
    message: string | string[];
    error: string;
    statusCode: number;
}

export interface token{
  accessToken:string
}
