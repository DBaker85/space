interface NetworkError {
  code?: number;
  http_error?: string;
  error_message?: string;
  request?: string;
}

interface ApiError {
  error?: {
    code: string;
    message: string;
  };
}

export interface ApiErrorResponse extends NetworkError, ApiError {
  message: string;
}
