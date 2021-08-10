export type Response = {
  data: Record<string, any>;
  ref: {
    toJSON: () => Record<string, any>;
  };
};
