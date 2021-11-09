export interface IPayloadErrorFields {
  message: string[];
}

export interface IPayloadErrorSystems {
  message: string;
}

export interface IErrorPayload {
  nonce: number;
  status: number;
  message: string;
  error: {
    fields: {
      count: number;
      errors: IPayloadErrorFields[];
    };
    systems: {
      count: number;
      errors: IPayloadErrorSystems[];
    };
  };
}
