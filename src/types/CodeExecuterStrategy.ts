interface CodeExecuterStrategy {
  execute(code: string, testCase: string): Promise<ExecutionResponse>;
};

export default CodeExecuterStrategy;

export type ExecutionResponse = { output: string, status: string }
