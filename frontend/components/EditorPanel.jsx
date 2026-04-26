'use client';

import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { runPythonCode } from '../lib/pythonRunner';

const starterCode = `name = "Learner"\nprint("Hello", name)`;

export default function EditorPanel() {
  const [code, setCode] = useState(starterCode);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [running, setRunning] = useState(false);

  const handleRunCode = async () => {
    setRunning(true);
    setOutput('');
    setError('');

    try {
      const result = await runPythonCode(code);
      setOutput(result.output || '(No output)');
      setError(result.error);
    } catch (runtimeError) {
      setError(runtimeError.message || 'Failed to run code.');
    } finally {
      setRunning(false);
    }
  };

  return (
    <section className="mx-auto mt-8 w-full max-w-5xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold text-slate-900">Interactive Python Editor</h2>
        <button
          type="button"
          onClick={handleRunCode}
          disabled={running}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {running ? 'Running...' : 'Run Code'}
        </button>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
        <Editor
          height="320px"
          defaultLanguage="python"
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="vs-light"
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <h3 className="text-sm font-semibold text-emerald-700">Output</h3>
          <pre className="mt-2 whitespace-pre-wrap text-sm text-emerald-900">{output || 'Run code to see output.'}</pre>
        </div>
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
          <h3 className="text-sm font-semibold text-rose-700">Errors</h3>
          <pre className="mt-2 whitespace-pre-wrap text-sm text-rose-900">{error || 'No errors.'}</pre>
        </div>
      </div>
    </section>
  );
}
