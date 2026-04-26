import { buildExecutionScript, indentPythonBlock } from '../lib/pythonRunner';

describe('pythonRunner helpers', () => {
  it('indents a python block for safe wrapping', () => {
    const code = 'print("x")\nprint("y")';

    expect(indentPythonBlock(code)).toBe('    print("x")\n    print("y")');
  });

  it('builds an execution script with output and error variables', () => {
    const script = buildExecutionScript('print("hello")');

    expect(script).toContain('output_text = _buffer.getvalue()');
    expect(script).toContain('error_text =');
    expect(script).toContain('    print("hello")');
  });
});
