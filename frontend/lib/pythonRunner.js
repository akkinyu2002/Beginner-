const PYODIDE_VERSION = '0.26.2';

let pyodideInstance;

function ensureWindow() {
  if (typeof window === 'undefined') {
    throw new Error('Python runtime is only available in the browser.');
  }
}

function indentPythonBlock(code) {
  return code
    .split('\n')
    .map((line) => `    ${line}`)
    .join('\n');
}

function buildExecutionScript(userCode) {
  return `import io\nimport sys\nimport traceback\n_buffer = io.StringIO()\n_sys_stdout = sys.stdout\nsys.stdout = _buffer\nerror_text = ''\ntry:\n${indentPythonBlock(
    userCode
  )}\nexcept Exception:\n    error_text = traceback.format_exc()\nfinally:\n    sys.stdout = _sys_stdout\noutput_text = _buffer.getvalue()`;
}

async function loadPyodideRuntime() {
  ensureWindow();

  if (pyodideInstance) {
    return pyodideInstance;
  }

  if (!window.loadPyodide) {
    const scriptElement = document.createElement('script');
    scriptElement.src = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/pyodide.js`;
    scriptElement.async = true;

    await new Promise((resolve, reject) => {
      scriptElement.onload = resolve;
      scriptElement.onerror = () => reject(new Error('Failed to load Python runtime.'));
      document.body.appendChild(scriptElement);
    });
  }

  pyodideInstance = await window.loadPyodide();
  return pyodideInstance;
}

async function runPythonCode(userCode) {
  const pyodide = await loadPyodideRuntime();
  const script = buildExecutionScript(userCode);

  await pyodide.runPythonAsync(script);

  const output = pyodide.globals.get('output_text');
  const error = pyodide.globals.get('error_text');

  return {
    output: output || '',
    error: error || '',
  };
}

export { buildExecutionScript, indentPythonBlock, runPythonCode };
